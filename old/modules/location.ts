import { showError } from '@/lib/toast';
import * as Location from 'expo-location';
import { setCoordinates, setPlaces } from './user';

export const getCurrentLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    showError('Error', 'Permission to access location was denied');
    return;
  }

  const location = await Location.getCurrentPositionAsync({});
  const { latitude, longitude } = location.coords;

  const reverseGeocode = await Location.reverseGeocodeAsync({
    latitude,
    longitude,
  });
  const result = {
    latitude,
    longitude,
    ...reverseGeocode[0],
  };
  console.log(result);

  setPlaces({
    subPlace: result.name,
    place: result.city,
  });
  setCoordinates({
    latitude,
    longitude,
  });

  return result;
};

export const distanceAway = (meter: number) => {
  if (meter < 1000) {
    return `${meter} meters away`;
  }
  return `${meter / 1000} km away`;
};
