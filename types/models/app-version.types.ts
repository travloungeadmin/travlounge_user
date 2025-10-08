export interface AppVersion {
  currentVersion: string;
  minimumVersion: string;
  latestVersion: string;
  forceUpdate: boolean;
  updateMessage?: string;
}

export interface VersionCheckResult {
  needsUpdate: boolean;
  forceUpdate: boolean;
  storeUrl: string;
  message?: string;
}

export interface VersionCheckResponse {
  ios: AppVersion;
  android: AppVersion;
}

export interface StoreUrls {
  ios: string;
  android: string;
}
