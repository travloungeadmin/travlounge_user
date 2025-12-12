import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Location from 'expo-location';
import { Coords, Place } from '../context/types';

const STORAGE_KEYS = {
  COORDS: 'user_coords',
  PLACE: 'user_place',
};

export const LocationStorage = {
  async getSavedCoords(): Promise<Coords | null> {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEYS.COORDS);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.warn('Error reading saved coords:', e);
      return null;
    }
  },

  async saveCoords(coords: Coords | null): Promise<void> {
    try {
      if (coords) {
        await AsyncStorage.setItem(STORAGE_KEYS.COORDS, JSON.stringify(coords));
      } else {
        await AsyncStorage.removeItem(STORAGE_KEYS.COORDS);
      }
    } catch (e) {
      console.warn('Error saving coords:', e);
    }
  },

  async getSavedPlace(): Promise<Place | null> {
    try {
      const raw = await AsyncStorage.getItem(STORAGE_KEYS.PLACE);
      return raw ? JSON.parse(raw) : null;
    } catch (e) {
      console.warn('Error reading saved place:', e);
      return null;
    }
  },

  async savePlace(place: Place | null): Promise<void> {
    try {
      if (place) {
        await AsyncStorage.setItem(STORAGE_KEYS.PLACE, JSON.stringify(place));
      } else {
        await AsyncStorage.removeItem(STORAGE_KEYS.PLACE);
      }
    } catch (e) {
      console.warn('Error saving place:', e);
    }
  },
};

export const LocationUtils = {
  async reverseGeocode(coords: Coords): Promise<Place | null> {
    try {
      const result = await Location.reverseGeocodeAsync({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });

      if (result && result.length > 0) {
        const addr = result[0];
        // map expo address to our Place type
        return {
          ...addr,
        };
      }
      return null;
    } catch (e) {
      console.warn('Reverse geocode error:', e);
      return null;
    }
  },

  isSameCoords(c1: Coords | null, c2: Coords | null): boolean {
    if (!c1 || !c2) return false;
    // Simple equality check, can be improved with distance threshold
    return (
      Math.abs(c1.latitude - c2.latitude) < 0.0001 && Math.abs(c1.longitude - c2.longitude) < 0.0001
    );
  },
};
