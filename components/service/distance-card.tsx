import { shadow } from '@/constants';
import { Box, Row, Text } from '@/core';
import React from 'react';
import { Linking, Platform, Pressable, StyleSheet } from 'react-native';

import Icon from '@/components/ui/icon';
import { colors } from '@/theme';

type propsType = {
  distance: string;
  time: string;
  latitude: number;
  longitude: number;
};

// const openMap = (latitude, longitude) => {
//   const url =
//     Platform.OS === 'ios'
//       ? `http://maps.apple.com/?ll=${latitude},${longitude}`
//       : `geo:${latitude},${longitude}?q=${latitude},${longitude}`;

//   Linking.canOpenURL(url)
//     .then((supported) => {
//       if (supported) {
//         Linking.openURL(url);
//       } else {
//         Alert.alert('Error', 'Unable to open the map.');
//       }
//     })
//     .catch((err) => console.error('Error:', err));
// };

export const openMap = async (lat, lng, label = 'Destination') => {
  try {
    const latLng = `${lat},${lng}`;

    // Google Maps URLs for both platforms
    const googleMapsIOSURL = `comgooglemaps://?q=${latLng}&center=${latLng}&zoom=14`;
    const googleMapsAndroidURL = `geo:${latLng}?q=${latLng}(${label})`;

    // Alternative Google Maps URL scheme for Android
    const googleMapsAndroidIntent = `intent://maps.google.com/maps?q=${latLng}&z=14#Intent;package=com.google.android.apps.maps;end`;

    // Default map app URLs
    const appleMapsURL = `http://maps.apple.com/?q=${latLng}`;
    const androidDefaultMapsURL = `geo:${latLng}?q=${latLng}(${label})`;

    // Browser fallback
    const browserURL = `https://www.google.com/maps/search/?api=1&query=${latLng}`;

    if (Platform.OS === 'ios') {
      // Step 1: Try Google Maps on iOS
      if (await Linking.canOpenURL(googleMapsIOSURL)) {
        console.log('📍 Opening Google Maps on iOS');
        return Linking.openURL(googleMapsIOSURL);
      }

      // Step 2: Fallback to Apple Maps on iOS
      if (await Linking.canOpenURL(appleMapsURL)) {
        console.log('📍 Opening Apple Maps on iOS');
        return Linking.openURL(appleMapsURL);
      }
    } else {
      // Android platform
      // Step 1: Try Google Maps with intent (more reliable on Android)
      try {
        const canOpenIntent = await Linking.canOpenURL(googleMapsAndroidIntent);
        if (canOpenIntent) {
          console.log('📍 Opening Google Maps with intent on Android');
          return Linking.openURL(googleMapsAndroidIntent);
        }
      } catch (intentError) {
        console.log('⚠️ Google Maps intent failed, trying geo scheme');
      }

      // Step 2: Try standard geo scheme (works with Google Maps if installed)
      if (await Linking.canOpenURL(googleMapsAndroidURL)) {
        console.log('📍 Opening maps with geo scheme on Android');
        return Linking.openURL(googleMapsAndroidURL);
      }
    }

    // Step 3: Final fallback → browser for both platforms
    console.log('📍 Opening Google Maps in browser as fallback');
    return Linking.openURL(browserURL);
  } catch (error) {
    console.error('❌ Failed to open map:', error);
    // Last resort fallback to browser
    try {
      const browserURL = `https://www.google.com/maps/search/?api=1&query=${lat},${lng}`;
      return Linking.openURL(browserURL);
    } catch (browserError) {
      console.error('❌ Even browser fallback failed:', browserError);
    }
  }
};

const DistanceCard = (props: propsType) => {
  const { distance, time, latitude, longitude } = props;
  return (
    <Pressable
      onPress={() => openMap(latitude, longitude)}
      style={{ paddingHorizontal: 16, marginBottom: 20 }}>
      <Row
        style={[
          shadow,
          {
            backgroundColor: colors.cardBackgroundPrimary,
            padding: 16,
            borderRadius: 8,
            justifyContent: 'space-between',
          },
        ]}>
        <Box>
          <Text preset="POP_16_SB" color={colors.textPrimary}>
            {time}
          </Text>
          <Text preset="POP_12_R" color={colors.textPrimaryDescription}>
            {distance} away
          </Text>
        </Box>
        <Row style={{ alignItems: 'center' }}>
          <Icon name="Pin" size={12} fill={colors.iconPrimary} />
          <Text preset="POP_16_SB" color={colors.textSecondary}>
            View Map
          </Text>
        </Row>
      </Row>
    </Pressable>
  );
};

export default DistanceCard;

const styles = StyleSheet.create({});
