import { VersionCheckResult } from '@/types/models/app-version.types';
import Constants from 'expo-constants';
import { Linking, Platform } from 'react-native';
import { getGeneralApi } from './api/general';

// Helper function to compare versions
// Returns true if currentVersion is less than minVersion
function isVersionLessThan(currentVersion: string, minVersion: string): boolean {
  const normalize = (v: string) =>
    v
      .trim()
      .split('.')
      .map((part) => parseInt(part, 10) || 0);

  const current = normalize(currentVersion);
  const minimum = normalize(minVersion);

  const length = Math.max(current.length, minimum.length);

  for (let i = 0; i < length; i++) {
    const c = current[i] ?? 0;
    const m = minimum[i] ?? 0;

    if (c < m) return true;
    if (c > m) return false;
  }

  return false; // versions are equal
}

class VersionCheckService {
  private static instance: VersionCheckService;
  private readonly IOS_APP_ID = '6741580924';
  private readonly ANDROID_PACKAGE = 'com.travcustomer';

  private constructor() {}

  public static getInstance(): VersionCheckService {
    if (!VersionCheckService.instance) {
      VersionCheckService.instance = new VersionCheckService();
    }
    return VersionCheckService.instance;
  }

  private getCurrentVersion(): string {
    // Get version from app.json via expo-constants
    return Constants.expoConfig?.version || '0.0.0';
  }

  private getStoreUrl(): string {
    if (Platform.OS === 'ios') {
      return `https://apps.apple.com/app/id${this.IOS_APP_ID}`;
    } else {
      return `https://play.google.com/store/apps/details?id=${this.ANDROID_PACKAGE}`;
    }
  }

  public async checkVersion(): Promise<VersionCheckResult> {
    try {
      // Get current version from app.json
      const currentVersion = Constants.expoConfig?.version || '0.0.0';

      // Fetch version info from API using the existing API structure
      const data = await getGeneralApi();

      // Check if current version is below min_version
      console.log(
        'lolo',
        data.force_update,
        currentVersion,
        data.min_version,
        isVersionLessThan(currentVersion, data.min_version)
      );

      const needsForceUpdate =
        data.force_update && isVersionLessThan(currentVersion, data.min_version);

      console.log('needsForceUpdate', needsForceUpdate);

      const storeUrl = this.getStoreUrl();

      return {
        needsUpdate: needsForceUpdate,
        forceUpdate: needsForceUpdate,
        storeUrl,
        message: needsForceUpdate
          ? `Please update to version ${data.min_version} or higher to continue using the app. Your current version is ${currentVersion}.`
          : undefined,
      };
    } catch (error) {
      throw error;
    }
  }

  public async openStore(): Promise<void> {
    try {
      const storeUrl = this.getStoreUrl();

      if (!storeUrl) {
        throw new Error('Store URL is not available');
      }

      const supported = await Linking.canOpenURL(storeUrl);

      if (!supported) {
        throw new Error(`Cannot open store URL: ${storeUrl}`);
      }

      await Linking.openURL(storeUrl);
    } catch (error) {
      console.error('Failed to open store:', error);
      throw error;
    }
  }

  public cleanup(): void {
    // Cleanup if needed in the future
  }
}

export default VersionCheckService;
