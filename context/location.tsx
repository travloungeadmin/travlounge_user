import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import { LocationService } from '../services/location.service';
import { LocationStorage, LocationUtils } from '../store/location';
import { Coords, PermissionStatus, Place } from './types';

type LocationContextValue = {
  coords: Coords | null;
  place: Place | null;
  isLoading: boolean;
  permissionStatus: PermissionStatus | null;
  fetchLocation: (opts?: { force?: boolean }) => Promise<void>;
  clearLocation: () => Promise<void>;
  updateLocation: (place: Place, coords?: Coords) => Promise<void>;
};

export const LocationContext = createContext<LocationContextValue | undefined>(undefined);

export const LocationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [coords, setCoords] = useState<Coords | null>(null);
  const [place, setPlace] = useState<Place | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus | null>(null);

  // Load saved state on startup
  useEffect(() => {
    (async () => {
      const savedCoords = await LocationStorage.getSavedCoords();
      const savedPlace = await LocationStorage.getSavedPlace();

      if (savedCoords) setCoords(savedCoords);
      if (savedPlace) setPlace(savedPlace);
    })();
  }, []);

  const fetchLocation = useCallback(
    async (opts?: { force?: boolean }) => {
      const force = opts?.force ?? false;
      setIsLoading(true);
      try {
        const hasPermission = await LocationService.requestPermission();
        const status = await LocationService.checkPermissionStatus();
        setPermissionStatus(status);

        if (!hasPermission) {
          return;
        }

        const locSimple = await LocationService.getCurrentLocation();
        if (!locSimple) return;

        const newCoords: Coords = {
          latitude: locSimple.latitude,
          longitude: locSimple.longitude,
        };

        const same = LocationUtils.isSameCoords(coords, newCoords);
        if (!same || force) {
          // Save coords
          setCoords(newCoords);
          await LocationStorage.saveCoords(newCoords);

          // Reverse geocode, save place
          const newPlace = await LocationUtils.reverseGeocode(newCoords);
          if (newPlace) {
            setPlace(newPlace);
            await LocationStorage.savePlace(newPlace);
          }
        }
      } catch (e) {
        console.warn('fetchLocation error:', e);
      } finally {
        setIsLoading(false);
      }
    },
    [coords]
  );

  const updateLocation = useCallback(async (place: Place, coords?: Coords) => {
    setPlace(place);
    await LocationStorage.savePlace(place);

    if (coords) {
      setCoords(coords);
      await LocationStorage.saveCoords(coords);
    }
  }, []);

  const clearLocation = useCallback(async () => {
    setCoords(null);
    setPlace(null);
    await LocationStorage.saveCoords(null);
    await LocationStorage.savePlace(null);
  }, []);

  const value = useMemo(
    () => ({
      coords,
      place,
      isLoading,
      permissionStatus,
      fetchLocation,
      clearLocation,
      updateLocation,
    }),
    [coords, place, isLoading, permissionStatus, fetchLocation, clearLocation, updateLocation]
  );

  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
};
