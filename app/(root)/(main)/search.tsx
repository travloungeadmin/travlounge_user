import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import { ThemedText } from '@/components/common/ThemedText';
import Icon from '@/components/ui/icon';
import { useTheme } from '@/hooks/useTheme';
import { showError } from '@/lib/toast';
import { getCurrentLocation } from '@/modules/location';
import useSearchStore from '@/modules/search';
import useSleepingPodCart from '@/modules/sleeping-pod';
import useUserStore from '@/modules/user';
import * as Location from 'expo-location';
import { router, useLocalSearchParams } from 'expo-router';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const Search = () => {
  const { isFrom, isSleepingPod, isHeader } = useLocalSearchParams();
  const { setAutoFetchLocation, updateLocation } = useUserStore();
  const { theme } = useTheme();

  const { updateFromPlace, updateToPlace, fromPlace, toPlace } = useSearchStore();
  const { updatePlace } = useSleepingPodCart();

  const handleYourLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      showError('Error', 'Permission to access location was denied');
      return;
    }
    if (isHeader === 'true') {
      setAutoFetchLocation(true);
      getCurrentLocation();
      router.back();
      return;
    }

    const location = await Location.getCurrentPositionAsync({});

    const { latitude, longitude } = location.coords;
    const reverseGeocode = await Location.reverseGeocodeAsync({
      latitude,
      longitude,
    });
    const name = reverseGeocode[0].city;
    if (isSleepingPod === 'true') {
      updatePlace({
        name: name as string,
        coordinates: {
          latitude: latitude,
          longitude: longitude,
        },
      });
      router.back();
      return;
    }

    if (isFrom === 'true') {
      updateFromPlace({
        name: name as string,
        coordinates: {
          latitude: latitude,
          longitude: longitude,
        },
      });
    } else {
      updateToPlace({
        name: name as string,
        coordinates: {
          latitude: latitude,
          longitude: longitude,
        },
      });
    }
    router.back();
  };

  return (
    <View
      style={{
        padding: 20,
        flex: 1,
        backgroundColor: theme.backgroundPrimary,
      }}>
      <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder="Search"
        styles={{
          textInput: {
            borderWidth: 1,
            height: 43,
            width: '100%',
            borderColor: '#8A95BB',
            backgroundColor: '#F1F5F8',
            borderRadius: 7,
            padding: 15,
            marginBottom: 65,
          },
        }}
        onPress={(data, details = null) => {
          if (isHeader === 'true') {
            updateLocation({
              currentCountry: '',
              currentState: '',
              currentZipCode: '',
              latitude: details?.geometry.location.lat || 0,
              longitude: details?.geometry.location.lng || 0,
              place: data.structured_formatting.main_text,
              subPlace: data.structured_formatting.secondary_text,
            });
            setAutoFetchLocation(false);
            router.back();
            return;
          }
          if (isSleepingPod === 'true') {
            updatePlace({
              name: data.description,
              coordinates: {
                latitude: details?.geometry.location.lat || 0,
                longitude: details?.geometry.location.lng || 0,
              },
            });
            router.back();
            return;
          }
          if (isFrom === 'true') {
            updateFromPlace({
              name: data.description,
              coordinates: {
                latitude: details?.geometry.location.lat || 0,
                longitude: details?.geometry.location.lng || 0,
              },
            });
          } else {
            updateToPlace({
              name: data.description,
              coordinates: {
                latitude: details?.geometry.location.lat || 0,
                longitude: details?.geometry.location.lng || 0,
              },
            });
          }
          router.back();
        }}
        query={{
          key: process.env.EXPO_PUBLIC_MAP_KEY_ID,
          language: 'in',
        }}
      />
      {
        <Pressable
          onPress={handleYourLocation}
          style={{
            height: 50,
            alignItems: 'center',
            flexDirection: 'row',
            backgroundColor: '#fff',
            paddingHorizontal: 20,
            borderRadius: 10,
            marginTop: 20,
            gap: 10,
            position: 'absolute',
            top: 50,
            zIndex: 1,
            marginHorizontal: 20,
            width: '100%',
          }}>
          <Icon name="Send" size={20} fill={theme.gray900} />
          <ThemedText color="gray900">Your location</ThemedText>
        </Pressable>
      }
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
