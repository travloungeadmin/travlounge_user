import * as Location from 'expo-location';
import { Linking, Platform } from 'react-native';

const getLocation = async () => {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    return;
  } else {
    const location = await Location.getCurrentPositionAsync();
    const coordinates = {
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    return coordinates;
  }
};

export { getLocation };

export const openGoogleMaps = async (lat, lng, label = 'Destination') => {
  const latLng = `${lat},${lng}`;

  let url = '';
  if (Platform.OS === 'ios') {
    // iOS Google Maps app
    url = `comgooglemaps://?q=${latLng}&center=${latLng}&zoom=14`;
  } else {
    // Android Google Maps app
    url = `geo:${latLng}?q=${latLng}(${label})`;
  }

  const canOpen = await Linking.canOpenURL(url);

  if (canOpen) {
    return Linking.openURL(url);
  } else {
    // fallback → open in browser
    return Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${latLng}`);
  }
};
