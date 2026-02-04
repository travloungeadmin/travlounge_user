import { router, useFocusEffect } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, View } from 'react-native';

import ScreenWrapper from '@/components/common/ScreenWrapper';
import AssociationList from '@/components/dashboard/association-list';
import ServiceView from '@/components/dashboard/service-view';
import { getCurrentLocation } from '@/modules/location';
import useUserStore, { setLocationPermissionGranted } from '@/modules/user';
import {
  getHomeListQuery,
  useGetCategoryQuery,
  useGetLatestNotificationQuery,
} from '@/services/query/home';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { differenceInMinutes } from 'date-fns';

import HomeBannerContainer from '@/components/screens/home/home-banner-container';
import HomeScreenSkeleton from '@/components/screens/home/HomeScreenSkeleton';
import SuggestedPlans from '@/components/screens/home/suggested-plans';
import { registerForPushNotificationsAsync } from '@/core/notification';

import { ThemedText } from '@/components/common/ThemedText';
import { ThemedView } from '@/components/common/ThemedView';
import { useTheme } from '@/hooks';
import { moderateScale } from '@/lib/responsive-dimensions';
import { SPACING } from '@/newConstants/spacing';
import { updateDeviceTokenMutation } from '@/services/query/auth';
import { Image, ImageBackground } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import * as Location from 'expo-location';

const Home = () => {
  const { theme } = useTheme();
  const { data, isLoading, refetch: refetchHomeList } = getHomeListQuery();
  const { data: notificationData, refetch: refetchNotification } = useGetLatestNotificationQuery();

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

  const { mutate: updateDeviceToken } = updateDeviceTokenMutation();

  React.useEffect(() => {
    if (isLoginFistTime && data?.user_details) {
      setTimeout(() => {
        if (!data?.user_details?.is_welcome_offer_claimed) router.navigate('/(main)/welcome-bonus');
      }, 2000);
    }
  }, [data]);

  const STORAGE_KEY = 'PAYMENT_REQUEST_DEDUPE';
  const WINDOW_MINUTES = 5;

  const FIVE_MINUTES = 5 * 60 * 1000;

  type StoredOrder = {
    backend_order_id: string;
    requested_at: number;
  };

  const checkIsDuplicated = async (
    backend_order_id: string,
    requested_at: string
  ): Promise<boolean> => {
    const now = Date.now();
    const requestedTime = new Date(requested_at).getTime();

    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    let parsed: StoredOrder[] = raw ? JSON.parse(raw) : [];

    // 1️⃣ Remove expired entries
    parsed = parsed.filter((item) => now - item.requested_at <= FIVE_MINUTES);

    // 2️⃣ Check duplicate
    const isDuplicate = parsed.some((item) => item.backend_order_id === backend_order_id);
    if (!isDuplicate) {
      parsed.push({
        backend_order_id,
        requested_at: requestedTime,
      });
    }

    // 3️⃣ Always persist cleaned state
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(parsed));

    return isDuplicate;
  };

  const checkIsValid = (requestedAt: string) => {
    const now = new Date();
    const requestedTime = new Date(requestedAt).getTime();

    return differenceInMinutes(now, requestedTime) <= WINDOW_MINUTES;
  };
  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const handleNotification = async () => {
        const payload = notificationData?.latest_notification?.payload;
        if (!payload) return;

        const requestedAt = payload?.schedule?.requested_at;
        const backendOrderId = payload?.backend_order_id;
        if (!requestedAt || !backendOrderId) return;

        const isDuplicate = await checkIsDuplicated(backendOrderId, requestedAt);

        if (!isActive || isDuplicate) return;

        const isValid = checkIsValid(requestedAt);
        if (isValid) {
          router.navigate({
            pathname: '/(main)/notification/payment-request',
            params: {
              data: JSON.stringify(payload),
            },
          });
        }
      };

      handleNotification();

      return () => {
        isActive = false;
      };
    }, [notificationData])
  );

  React.useEffect(() => {
    if (data?.user_details && !data?.user_details?.is_device_token) {
      refetchNotification();

      const handleDeviceToken = async () => {
        const token = await registerForPushNotificationsAsync();
        if (token) {
          updateDeviceToken({ device_token: token });
        }
      };
      handleDeviceToken();
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
          {/* <HomeStatusCards
            walletBalance={data?.user_details?.elite_coin_balance}
            activeSubscription={data?.active_subscriptions}
          /> */}
          <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              marginBottom: moderateScale(16),
              gap: SPACING.screenPadding,
              padding: SPACING.screenPadding,
              borderRadius: moderateScale(8),
              marginHorizontal: SPACING.screenPadding,
            }}
            colors={[theme.primary100, theme.primary200]}>
            <ThemedText variant="titleEmphasized" color="gray900">
              Get coins back on every purchase
            </ThemedText>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View
                style={{
                  flexDirection: 'row',
                  gap: moderateScale(12),
                }}>
                {data?.coin_restaurants.map((item, index) => {
                  return (
                    <Pressable
                      onPress={() => {
                        router.navigate({
                          pathname: '/(main)/listings/listing-details',
                          params: {
                            isPartner: String(item.is_partner),
                            category: item.category_name,
                            id: item.id,
                            name: item.display_name,
                            category_id: item.category_id,
                            category_name: item.category_name,
                          },
                        });
                      }}>
                      <ImageBackground
                        style={{
                          backgroundColor: theme.gray100,
                          width: moderateScale(150),
                          height: moderateScale(160),
                          borderRadius: moderateScale(10),
                          overflow: 'hidden',
                        }}
                        source={{ uri: item.image }}>
                        {item?.user_percentage > 0 && (
                          <ThemedView
                            backgroundColor="secondary"
                            style={{
                              position: 'absolute',
                              top: moderateScale(8),
                              right: moderateScale(8),
                              paddingHorizontal: moderateScale(6),
                              paddingVertical: moderateScale(2),
                              borderRadius: moderateScale(4),
                            }}>
                            <ThemedText variant="bodySmallEmphasized" color="white">
                              {item.user_percentage}%
                            </ThemedText>
                          </ThemedView>
                        )}
                        <ThemedView
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            left: 0,
                            right: 0,
                            height: moderateScale(44),
                            justifyContent: 'space-between',
                            gap: moderateScale(4),
                            flexDirection: 'row',
                            alignItems: 'center',
                            backgroundColor: 'rgba(0, 0, 0, 0.4)',
                            paddingHorizontal: moderateScale(8),
                          }}>
                          <ThemedText
                            style={{ flex: 1 }}
                            numberOfLines={1}
                            variant="titleEmphasized"
                            color="white">
                            {item.display_name}
                          </ThemedText>
                          <Image
                            style={{
                              width: moderateScale(24),
                              height: moderateScale(24),
                            }}
                            source={require('@/assets/images/elite-card/elite-coin.png')}
                          />
                        </ThemedView>
                      </ImageBackground>
                    </Pressable>
                  );
                })}
              </View>
            </ScrollView>
          </LinearGradient>
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
