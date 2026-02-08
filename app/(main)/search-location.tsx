import ScreenWrapper from '@/components/common/ScreenWrapper';
import { ThemedText } from '@/components/common/ThemedText';
import Icon from '@/components/ui/icon';
import { useLocation, useTheme } from '@/hooks';
import { moderateScale } from '@/lib/responsive-dimensions';
import { showError } from '@/lib/toast';
import { SPACING } from '@/newConstants/spacing';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const SearchLocation = () => {
  const { theme } = useTheme();
  const { updateLocation, fetchLocation } = useLocation();

  const handleYourLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        showError('Permission Denied', 'Permission to access location was denied');
        return;
      }
      await fetchLocation({ force: true });
      router.back();
    } catch (error) {
      console.error(error);
      showError('Error', 'Failed to fetch current location');
    }
  };

  return (
    <ScreenWrapper>
      <View style={[styles.container, { backgroundColor: theme.backgroundPrimary }]}>
        <GooglePlacesAutocomplete
          fetchDetails={true}
          placeholder="Search for a city or area"
          enablePoweredByContainer={false}
          predefinedPlaces={[
            {
              description: 'Use Current Location',
              geometry: { location: { lat: 0, lng: 0, latitude: 0, longitude: 0 } },
            },
          ]}
          predefinedPlacesAlwaysVisible={true}
          styles={{
            textInputContainer: {
              backgroundColor: 'transparent',
              paddingBottom: moderateScale(16),
            },
            textInput: {
              height: moderateScale(48),
              borderRadius: moderateScale(24), // More rounded like reference
              paddingVertical: moderateScale(8),
              paddingHorizontal: moderateScale(16),
              fontSize: moderateScale(16),
              backgroundColor: '#F1F5F8',
              color: theme.gray900,
            },
            listView: {
              // backgroundColor: theme.backgroundCard,
            },
            row: {
              backgroundColor: 'transparent',
              padding: moderateScale(16),
              alignItems: 'center',
            },
            separator: {
              height: 0.5,
              // backgroundColor: theme.gray200,
            },
            description: {
              color: theme.gray900,
              fontSize: moderateScale(15),
              fontWeight: '500',
            },
          }}
          renderRow={(data) => {
            if (data.description === 'Use Current Location') {
              return (
                <View style={styles.row}>
                  <View style={styles.iconContainer}>
                    <Icon name="Send" size={moderateScale(20)} fill={theme.primary} />
                  </View>
                  <ThemedText variant="bodyEmphasized" color="primary" style={{ flex: 1 }}>
                    Use Current Location
                  </ThemedText>
                </View>
              );
            }
            return (
              <View style={styles.row}>
                <View style={[styles.iconContainer]}>
                  <Icon name="MapPin" size={moderateScale(20)} fill="#EAB308" />
                </View>
                <ThemedText
                  variant="body"
                  color="gray900"
                  style={{ flex: 1 }}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {data.description}
                </ThemedText>
              </View>
            );
          }}
          onPress={(data, details = null) => {
            if (data.description === 'Use Current Location') {
              handleYourLocation();
            } else if (details) {
              const { lat, lng } = details.geometry.location;
              updateLocation(
                {
                  name: data.structured_formatting.main_text,
                  street: data.structured_formatting.main_text,
                  city:
                    details.address_components.find((c) => c.types.includes('locality'))
                      ?.long_name || '',
                  region:
                    details.address_components.find((c) =>
                      c.types.includes('administrative_area_level_1')
                    )?.long_name || '',
                  country:
                    details.address_components.find((c) => c.types.includes('country'))
                      ?.long_name || '',
                },
                {
                  latitude: lat,
                  longitude: lng,
                }
              );
              router.back();
            }
          }}
          query={{
            key: process.env.EXPO_PUBLIC_MAP_KEY_ID,
            language: 'en',
          }}
          renderLeftButton={() => <></>}
        />
      </View>
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: SPACING.screenPadding,
  },
  row: {
    width: SPACING.contentWidth - moderateScale(32),
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(8),
  },
  iconContainer: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(18),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default SearchLocation;
