import { router, useFocusEffect } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import ScreenWrapper from '@/components/common/ScreenWrapper';
import AssociationList from '@/components/dashboard/association-list';
import ServiceView from '@/components/dashboard/service-view';
import { getCurrentLocation } from '@/modules/location';
import useUserStore, { setLocationPermissionGranted } from '@/modules/user';
import {
  getHomeListQuery,
  getPackagesListQuery,
  useActiveSubscriptionsQuery,
  useGetCategoryQuery,
} from '@/services/query/home';

import HomeBannerContainer from '@/components/screens/home/home-banner-container';
import HomeStatusCards from '@/components/screens/home/home-status-cards';
import HomeScreenSkeleton from '@/components/screens/home/HomeScreenSkeleton';
import * as Location from 'expo-location';

const Home = () => {
  const { data, isLoading, refetch: refetchHomeList } = getHomeListQuery();
  const { data: packages, isLoading: packagesListLoading } = getPackagesListQuery();
  const { data: activeSubscriptions, refetch } = useActiveSubscriptionsQuery();
  const { isLoading: categoryLoading } = useGetCategoryQuery();

  useFocusEffect(
    React.useCallback(() => {
      refetchHomeList();
      refetch();
    }, [refetchHomeList, refetch])
  );

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
        if (!data?.user?.is_welcome_claimed) router.navigate('/(main)/welcome-bonus');
      }, 2000);
    }
  }, [data]);

  if (isLoading || packagesListLoading || categoryLoading) {
    return <HomeScreenSkeleton />;
  }

  return (
    <ScreenWrapper>
      <ScrollView>
        <View>
          <HomeBannerContainer banners={data?.banners} />
          <HomeStatusCards
            walletBalance={data?.user?.coin_balance}
            activeSubscription={activeSubscriptions?.active_subscriptions}
          />
          <ServiceView />
          <AssociationList data={data?.assocition_banner} />
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
};

export default Home;

const styles = StyleSheet.create({
  servicesContainer: {
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
