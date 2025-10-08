import Icon from '@/components/ui/icon';
import { shadow } from '@/constants';
import { Text } from '@/core';
import { getCurrentLocation } from '@/modules/location';
import { setLocationPermissionGranted } from '@/modules/user';
import * as Location from 'expo-location';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

const LocationPermissionView = () => {
  const handlePermissionRequest = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      setLocationPermissionGranted(false);
      return;
    }
    setLocationPermissionGranted(true);
    getCurrentLocation();
  };

  return (
    <Pressable onPress={handlePermissionRequest} style={[styles.container, shadow]}>
      <Icon name="LocationPermission" size={34} />
      <View>
        <Text color="#000" preset="POP_14_SB">
          Location Permission is Off
        </Text>
        <Text color="rgba(12, 12, 12, 0.8)" preset="POP_12_R">
          Enable location for accuracy.
        </Text>
      </View>
      <View style={styles.grantButton}>
        <Text color="#FFF" preset="POP_14_M">
          Grant
        </Text>
      </View>
    </Pressable>
  );
};

export default LocationPermissionView;

const styles = StyleSheet.create({
  container: {
    zIndex: 100,
    backgroundColor: '#EFB603',
    height: 64,
    borderRadius: 32,
    position: 'absolute',
    bottom: 20,
    right: 20,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  grantButton: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#253D8F',
  },
});
