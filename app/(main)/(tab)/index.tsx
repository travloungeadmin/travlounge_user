import { router, useFocusEffect } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import ScreenWrapper from '@/components/common/ScreenWrapper';
import AssociationList from '@/components/dashboard/association-list';
import ServiceView from '@/components/dashboard/service-view';
import { getCurrentLocation } from '@/modules/location';
import useUserStore, { setLocationPermissionGranted } from '@/modules/user';
import { getHomeListQuery, useGetCategoryQuery } from '@/services/query/home';

import HomeBannerContainer from '@/components/screens/home/home-banner-container';
import HomeStatusCards from '@/components/screens/home/home-status-cards';
import HomeScreenSkeleton from '@/components/screens/home/HomeScreenSkeleton';
import SuggestedPlans from '@/components/screens/home/suggested-plans';
import * as Location from 'expo-location';

const Home = () => {
  const { data, isLoading, refetch: refetchHomeList } = getHomeListQuery();

  const { isLoading: categoryLoading } = useGetCategoryQuery();

  useFocusEffect(
    React.useCallback(() => {
      refetchHomeList();
    }, [refetchHomeList])
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
    if ((!user?.id || !user?.mobile_number || !user?.name) && data?.user_details) {
      setUserDetails({
        id: data.user_details.user_id,
        mobile_number: data.user_details.mobile_number,
        name: data.user_details.user_name,
      });
    }
  }, [data]);
  React.useEffect(() => {
    if (!isProfileComplete && data?.user_details?.is_registered) {
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
    if (isLoginFistTime && data?.user_details) {
      setTimeout(() => {
        if (!data?.user_details?.is_welcome_offer_claimed) router.navigate('/(main)/welcome-bonus');
      }, 2000);
    }
  }, [data]);

  if (isLoading || categoryLoading) {
    return <HomeScreenSkeleton />;
  }

  return (
    <ScreenWrapper>
      <ScrollView>
        <View>
          <HomeBannerContainer banners={data?.banners || []} />
          <SuggestedPlans packages={data?.suggested_offers || []} />
          <HomeStatusCards
            walletBalance={data?.user_details?.elite_coin_balance}
            activeSubscription={data?.active_subscriptions}
          />
          <ServiceView />
          <AssociationList data={data?.association_banners || []} />
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
