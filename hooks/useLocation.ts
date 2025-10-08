import { useState, useEffect, useCallback } from 'react';
import { LocationService } from '@/services/location.service';
import { LocationPermissionState, LocationState } from '@/types/location';

export const useLocation = () => {
  const [permissionState, setPermissionState] = useState<LocationPermissionState>({
    status: 'requesting',
  });
  const [locationState, setLocationState] = useState<LocationState>({
    latitude: null,
    longitude: null,
    loading: false,
  });

  const checkPermission = useCallback(async () => {
    const status = await LocationService.checkPermissionStatus();
    setPermissionState({ status });
  }, []);

  const requestPermission = useCallback(async () => {
    setPermissionState({ status: 'requesting' });
    try {
      const granted = await LocationService.requestPermission();
      setPermissionState({ status: granted ? 'granted' : 'denied' });
      return granted;
    } catch (error) {
      setPermissionState({
        status: 'denied',
        error: error instanceof Error ? error.message : 'Failed to request permission',
      });
      return false;
    }
  }, []);

  const getCurrentLocation = useCallback(async () => {
    setLocationState(prev => ({ ...prev, loading: true }));
    try {
      const location = await LocationService.getCurrentLocation();
      if (location) {
        setLocationState({
          latitude: location.latitude,
          longitude: location.longitude,
          loading: false,
        });
      } else {
        setLocationState(prev => ({
          ...prev,
          loading: false,
          error: 'Failed to get location',
        }));
      }
    } catch (error) {
      setLocationState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Failed to get location',
      }));
    }
  }, []);

  useEffect(() => {
    checkPermission();
  }, [checkPermission]);

  return {
    permissionState,
    locationState,
    requestPermission,
    getCurrentLocation,
    checkPermission,
  };
};
