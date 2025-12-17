import { router } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import ScreenWrapper from '@/components/common/ScreenWrapper';
import AssociationList from '@/components/dashboard/association-list';
import PackagesList from '@/components/dashboard/packages-list';
import ServiceView from '@/components/dashboard/service-view';
import TravloungeCard from '@/components/dashboard/travlounge-card';
import HomeBannerContainer from '@/components/screens/home/home-banner-container';
import { Box, Text } from '@/core';
import { getCurrentLocation } from '@/modules/location';
import useUserStore, { setLocationPermissionGranted } from '@/modules/user';
import Loading from '@/old/components/common/Loading';
import LocationPermissionView from '@/old/components/common/location-permission-view';
import { getHomeListQuery, getPackagesListQuery, useGetCategoryQuery } from '@/services/query/home';
import { colors } from '@/theme';
import * as Location from 'expo-location';

const Home = () => {
  const { data, isLoading } = getHomeListQuery();
  const { data: packages, isLoading: packagesListLoading } = getPackagesListQuery();
  useGetCategoryQuery();

  const {
    isLocationPermissionGranted,
    setUserDetails,
    user,
    isLoginFistTime,
    place,
    isProfileComplete,
    setProfileComplete,
  } = useUserStore();

  React.useEffect(() => {
    if (isLocationPermissionGranted && !place) {
      getCurrentLocation();
    }
  }, [isLocationPermissionGranted, place]);

  React.useEffect(() => {
    if (!user?.id || !user?.mobile_number || !user?.name) {
      setUserDetails({
        id: data?.user?.user_id,
        mobile_number: data?.user?.mobile_number,
        name: data?.user?.user_name,
      });
    }
  }, [data]);
  React.useEffect(() => {
    if (!isProfileComplete && data?.user?.is_registered) {
      setProfileComplete(true);
    }
  }, [data]);

  React.useEffect(() => {
    const handlePermissionRequest = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setLocationPermissionGranted(false);
        return;
      }
      setLocationPermissionGranted(true);
      getCurrentLocation();
    };
    handlePermissionRequest();
  }, []);

  React.useEffect(() => {
    if (isLoginFistTime && data?.user) {
      setTimeout(() => {
        if (!data?.user?.is_welcome_claimed) router.navigate('/(root)/(main)/welcome-bonus');
      }, 2000);
    }
  }, [data]);

  if (isLoading || packagesListLoading) {
    return <Loading />;
  }

  return (
    <ScreenWrapper>
      <ScrollView style={styles.container}>
        <HomeBannerContainer banners={data?.banners || []} />
        {data?.subscription_data && packages && (
          <PackagesList subscription_data={data?.subscription_data} packages={packages} />
        )}

        <TravloungeCard />
        <Box style={styles.servicesContainer}>
          <Text style={styles.sectionTitle} color={colors.textPrimary} preset="POP_16_M">
            Our Services
          </Text>
          <ServiceView />
          {!!data?.assocition_banner && (
            <Text style={styles.associationTitle} color={colors.textPrimary} preset="POP_16_M">
              View our offering
            </Text>
          )}
        </Box>
        {!!data?.assocition_banner && <AssociationList data={data?.assocition_banner} />}
      </ScrollView>
      {!isLocationPermissionGranted && <LocationPermissionView />}
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    // backgroundColor: colors.backgroundPrimary,
  },
  servicesContainer: {
    // paddingHorizontal: 16,
    paddingVertical: 0,
    width: '100%',
  },
  sectionTitle: {
    marginVertical: 20,
  },
  associationTitle: {
    marginVertical: 20,
  },
});
