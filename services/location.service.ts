import * as Location from 'expo-location';
import { LocationError } from '@/types/location';

class LocationServiceImpl {
  private static instance: LocationServiceImpl;

  private constructor() {}

  public static getInstance(): LocationServiceImpl {
    if (!LocationServiceImpl.instance) {
      LocationServiceImpl.instance = new LocationServiceImpl();
    }
    return LocationServiceImpl.instance;
  }

  async checkPermissionStatus(): Promise<'unavailable' | 'denied' | 'granted'> {
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      switch (status) {
        case Location.PermissionStatus.GRANTED:
          return 'granted';
        case Location.PermissionStatus.DENIED:
          return 'denied';
        default:
          return 'unavailable';
      }
    } catch (error) {
      console.error('Error checking location permission:', error);
      return 'unavailable';
    }
  }

  async requestPermission(): Promise<boolean> {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      return status === Location.PermissionStatus.GRANTED;
    } catch (error) {
      console.error('Error requesting location permission:', error);
      return false;
    }
  }

  async getCurrentLocation(): Promise<{ latitude: number; longitude: number } | null> {
    try {
      const permissionStatus = await this.checkPermissionStatus();
      if (permissionStatus !== 'granted') {
        throw new Error('Location permission not granted');
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
        timeInterval: 5000,
      });

      return {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
    } catch (error) {
      console.error('Error getting current location:', error);
      return null;
    }
  }
}

export const LocationService = LocationServiceImpl.getInstance();
