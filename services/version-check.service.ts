import { VersionCheckResult } from '@/types/models/app-version.types';
import { Linking, Platform } from 'react-native';
import VersionCheck from 'react-native-version-check';

// Helper function to check version
function isNewVersionAvailable(currentVersion: string, latestVersion: string): boolean {
  const parse = (v: string) => v.split('.').map(Number);
  const [cMajor, cMinor, cPatch] = parse(currentVersion);
  const [lMajor, lMinor, lPatch] = parse(latestVersion);

  if (lMajor > cMajor) return true;
  if (lMajor === cMajor && lMinor > cMinor) return true;
  if (lMajor === cMajor && lMinor === cMinor && lPatch > cPatch) return true;

  return false;
}

class VersionCheckService {
  private static instance: VersionCheckService;
  private abortController: AbortController | null = null;
  private cachedStoreUrl: string | null = null;

  private constructor() {}

  public static getInstance(): VersionCheckService {
    if (!VersionCheckService.instance) {
      VersionCheckService.instance = new VersionCheckService();
    }
    return VersionCheckService.instance;
  }

  private async getStoreUrl(): Promise<string> {
    if (this.cachedStoreUrl) {
      return this.cachedStoreUrl;
    }

    this.cachedStoreUrl = await VersionCheck.getStoreUrl({
      appID:
        Platform.select({
          ios: '6741580924',
          android: 'com.travcustomer',
        }) || 'com.travcustomer',
    });

    return this.cachedStoreUrl;
  }

  public async checkVersion(): Promise<VersionCheckResult> {
    try {
      this.abortController = new AbortController();

      const currentVersion = await VersionCheck.getCurrentVersion();
      const latestVersion = await VersionCheck.getLatestVersion({
        provider:
          Platform.select({
            ios: 'appStore',
            android: 'playStore',
          }) || 'playStore',
      });

      const needsUpdate = await VersionCheck.needUpdate({
        currentVersion,
        latestVersion,
      });

      const storeUrl = await this.getStoreUrl();

      return {
        needsUpdate: isNewVersionAvailable(currentVersion, latestVersion) || false,
        forceUpdate: isNewVersionAvailable(currentVersion, latestVersion),
        storeUrl,
        message: `A new version (${latestVersion}) is available. Your current version is ${currentVersion}.`,
      };
    } catch (error) {
      if (this.abortController?.signal.aborted) {
        throw new Error('Version check was aborted');
      }
      throw error;
    }
  }

  public async openStore(): Promise<void> {
    try {
      const storeUrl = await this.getStoreUrl();

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
    if (this.abortController) {
      this.abortController.abort();
      this.abortController = null;
    }
    this.cachedStoreUrl = null;
  }
}

export default VersionCheckService;
