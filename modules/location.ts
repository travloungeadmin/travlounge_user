import { LocationService } from '@/services/location.service';
import * as Location from 'expo-location';
import { updateLocation } from './user';

interface ReverseGeocodeResult {
  country: string | null;
  region: string | null;
  postalCode: string | null;
  city: string | null;
  name: string | null;
  latitude: number;
  longitude: number;
}

export const getCurrentLocation = async (): Promise<ReverseGeocodeResult | undefined> => {
  try {
    const location = await LocationService.getCurrentLocation();
    if (!location) {
      await handleLocationDenied();
      return;
    }

    const { latitude, longitude } = location;
    const reverseGeocode = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });

    const result = {
      latitude,
      longitude,
      ...reverseGeocode[0],
    };

    await updateLocation({
      currentCountry: result.country as string,
      currentState: result.region as string,
      currentZipCode: result.postalCode as string,
      place: result.city as string,
      subPlace: result.name as string,
      latitude,
      longitude,
    });

    return result;
  } catch (error) {
    // showError('Error', error instanceof Error ? error.message : 'Failed to get location');
    console.error('Error getting location:', error);
    await handleLocationDenied();
    return undefined;
  }
};

const handleLocationDenied = async () => {
  await updateLocation({
    currentCountry: null,
    currentState: null,
    currentZipCode: null,
    place: null,
    subPlace: null,
    latitude: null,
    longitude: null,
  });
};

export const distanceAway = (meter: number): string => {
  if (meter < 1000) {
    return `${Math.round(meter)} meters away`;
  }
  return `${(meter / 1000).toFixed(1)} km away`;
};

export const checkLocationPermission = async () => {
  return LocationService.checkPermissionStatus();
};

export const requestLocationPermission = async () => {
  return LocationService.requestPermission();
};
