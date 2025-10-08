import React from 'react';
import { ActivityIndicator, Pressable, StyleSheet, View } from 'react-native';
import { Text } from '@/core';
import Icon from '@/components/ui/icon';
import { shadow } from '@/constants';
import { useLocation } from '@/hooks/useLocation';

interface LocationPermissionViewProps {
  onPermissionGranted?: () => void;
}

export const LocationPermissionView: React.FC<LocationPermissionViewProps> = ({ 
  onPermissionGranted 
}) => {
  const { permissionState, requestPermission, getCurrentLocation } = useLocation();

  const handlePermissionRequest = async () => {
    const granted = await requestPermission();
    if (granted) {
      await getCurrentLocation();
      onPermissionGranted?.();
    }
  };

  if (permissionState.status === 'granted') {
    return null;
  }

  return (
    <Pressable 
      onPress={handlePermissionRequest} 
      style={[styles.container, shadow]}
      accessibilityRole="button"
      accessibilityLabel="Request location permission"
      accessibilityHint="Enables location services for better accuracy"
    >
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
        {permissionState.status === 'requesting' ? (
          <ActivityIndicator size="small" color="#FFF" />
        ) : (
          <Text color="#FFF" preset="POP_14_M">
            Grant
          </Text>
        )}
      </View>
    </Pressable>
  );
};

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
    minWidth: 70,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
