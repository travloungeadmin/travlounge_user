declare module 'react-native-version-check' {
  interface VersionCheck {
    getStoreUrl(options: { appID: string }): Promise<string>;
    getCurrentVersion(): Promise<string>;
    getLatestVersion(options: { provider: string }): Promise<string>;
    needUpdate(options: { currentVersion: string; latestVersion: string }): Promise<boolean>;
  }
  const versionCheck: VersionCheck;
  export default versionCheck;
}
