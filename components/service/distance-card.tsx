import { shadow } from '@/constants';
import { Box, Row } from '@/core';
import React from 'react';
import { Linking, Platform, Pressable, StyleSheet } from 'react-native';

import Icon from '@/components/ui/icon';
import { useTheme } from '@/hooks/useTheme';
import { ThemedText } from '../common/ThemedText';

type propsType = {
  distance: string;
  time: string;
  latitude: number;
  longitude: number;
};

// ... (existing openMap function code needs to be preserved, or simplified in replacement if I can't match it exactly. Wait, I should not delete openMap. I will just target the component part if possible or the whole file carefully)
// better to use targeted replacement for component and imports.

export const openMap = async (lat: any, lng: any, label = 'Destination') => {
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
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={() => openMap(latitude, longitude)}
      style={{ paddingHorizontal: 16, marginBottom: 20 }}>
      <Row
        style={[
          shadow,
          {
            backgroundColor: theme.backgroundCard,
            padding: 16,
            borderRadius: 8,
            justifyContent: 'space-between',
          },
        ]}>
        <Box>
          <ThemedText variant="bodySmallEmphasized" color="gray900">
            {time}
          </ThemedText>
          <ThemedText variant="label" color="gray500">
            {distance} away
          </ThemedText>
        </Box>
        <Row style={{ alignItems: 'center' }}>
          <Icon name="Pin" size={12} fill={theme.primary} />
          <ThemedText variant="bodySmallEmphasized" color="gray600">
            View Map
          </ThemedText>
        </Row>
      </Row>
    </Pressable>
  );
};

export default DistanceCard;

const styles = StyleSheet.create({});
