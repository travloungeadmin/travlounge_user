import { useEffect, useState } from 'react';

import VersionCheckService from '@/services/version-check.service';

import { VersionCheckResult } from '@/types/models/app-version.types';

export const useVersionCheck = () => {
  const [isChecking, setIsChecking] = useState(true);
  const [needsUpdate, setNeedsUpdate] = useState(false);
  const [forceUpdate, setForceUpdate] = useState(false);
  const [storeUrl, setStoreUrl] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [updateMessage, setUpdateMessage] = useState<string | undefined>();

  const [retryCount, setRetryCount] = useState(0);
  const maxRetries = 3;
  const retryDelay = 5000; // 5 seconds

  const checkVersion = async (isRetry = false) => {
    try {
      if (!isRetry) {
        setIsChecking(true);
        setError(null);
      }

      const versionService = VersionCheckService.getInstance();
      const result = (await versionService.checkVersion()) as VersionCheckResult;

      // Reset retry count on success
      setRetryCount(0);

      setNeedsUpdate(result.needsUpdate);
      setForceUpdate(result.forceUpdate);
      setStoreUrl(result.storeUrl);
      setUpdateMessage(result.message);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') {
        return; // Request was aborted, do nothing
      }

      const shouldRetry = retryCount < maxRetries;
      setError(err instanceof Error ? err.message : 'Failed to check for updates');

      if (shouldRetry) {
        setRetryCount((prev) => prev + 1);
        // Retry with exponential backoff
        setTimeout(
          () => {
            checkVersion(true);
          },
          retryDelay * Math.pow(2, retryCount)
        );
      }
    } finally {
      if (!isRetry) {
        setIsChecking(false);
      }
    }
  };

  const openStore = async () => {
    try {
      const versionService = VersionCheckService.getInstance();
      await versionService.openStore();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to open store');
    }
  };

  useEffect(() => {
    let mounted = true;

    const check = async () => {
      if (!mounted) return;
      await checkVersion();
    };

    check();

    return () => {
      mounted = false;
      // Cleanup the version check service
      VersionCheckService.getInstance().cleanup();
    };
  }, []);

  return {
    isChecking,
    needsUpdate,
    forceUpdate,
    storeUrl,
    updateMessage,
    error,
    checkVersion,
    openStore,
  };
};
