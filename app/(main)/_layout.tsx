import * as Notifications from 'expo-notifications';
import { router, Stack, useGlobalSearchParams } from 'expo-router';
import React from 'react';

import { ThemedText } from '@/components/common/ThemedText';
import Header from '@/components/header';
import { useNotificationObserver } from '@/core/notification';
import { useLocation } from '@/hooks';
import { moderateScale } from '@/lib/responsive-dimensions';
import { useTheme } from '@/newTheme';
import { MaterialIcons } from '@expo/vector-icons';
import { Platform, StyleSheet, TouchableOpacity } from 'react-native';

export default function MainLayout() {
  const { theme } = useTheme();
  const { name } = useGlobalSearchParams();

  const { fetchLocation, place } = useLocation();
  React.useEffect(() => {
    fetchLocation();
  }, []);
  const notificationListener = React.useRef<Notifications.Subscription | null>(null);
  const { header } = useGlobalSearchParams();
  const handlePaymentResult = (data: any) => {
    // Check for Coin Redeem Notification
    if (data?.event_payload?.type === 'coin_redeem') {
      router.navigate({
        pathname: '/(main)/notification/coin-redeem',
        params: {
          data: JSON.stringify(data.event_payload.coin_redeem_data),
        },
      });
      return;
    }

    if (data?.is_popup) {
      router.navigate({
        pathname: '/payment-result',
        params: {
          data,
          cafeData: data?.data,
          is_popup: 'true',
          id: data?.id || '1',
          image: data?.image,
          name: data?.name,
          location: data?.location,
          date: data?.date,
          time: data?.time,
          duration: data?.duration,
          status: data?.status,
          wallet_balance: data?.wallet_balance,
          required_amount: data?.required_amount,
          message: data?.message,
          pay_now: data?.pay_now,
          service_name: data?.service_name,
          service_type_name: data?.service_type_name,
          amount: data?.amount || 0,
          event_payload: JSON.stringify(data?.event_payload),
          list: JSON.stringify(data?.items || []),
        },
      });
    }
  };

  React.useEffect(() => {
    notificationListener.current = Notifications.addNotificationReceivedListener((notification) => {
      console.log('Notification received:', notification);
      console.log('Notification data:', notification.request.content.data);
      console.log('Notification data11:', notification.request.content.data.data);

      handlePaymentResult(notification.request.content.data);
    });
    return () => {
      if (notificationListener.current) {
        notificationListener.current.remove();
      }
    };
  }, []);

  useNotificationObserver((notification: Notifications.Notification) => {
    const data = notification.request.content.data;
    handlePaymentResult(data);
  });

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        animation: 'none',
      }}>
      <Stack.Screen
        name="services/add-review"
        options={{
          headerShown: true,
          header: () => <Header back title="Add Review" />,
        }}
      />
      <Stack.Screen
        name="services/reel"
        options={{
          headerShown: true,
          header: () => <Header back title={Array.isArray(header) ? header[0] : header} />,
        }}
      />
      <Stack.Screen
        name="services/car-wash"
        options={{
          headerShown: true,
          header: () => <Header back location title={Array.isArray(header) ? header[0] : header} />,
        }}
      />
      <Stack.Screen
        name="services/carwash/payment"
        options={{
          headerShown: true,
          header: () => <Header back location title={Array.isArray(header) ? header[0] : header} />,
        }}
      />

      {/* <Stack.Screen
        name="carwash-history-details"
        options={{
          headerShown: true,
          header: () => <Header back profileIcon title="Bookings" />,
        }}
      /> */}
      <Stack.Screen
        name="booking-history"
        options={{
          headerShown: true,
          header: () => <Header back profileIcon title="Bookings" />,
        }}
      />
      <Stack.Screen
        name="qr"
        options={{
          headerShown: true,
          header: () => <Header back profileIcon wallet title="Your QR Code" />,
        }}
      />
      <Stack.Screen
        name="service-listings"
        options={{
          headerShown: true,
          header: () => <Header back profileIcon wallet title="Your QR Code" />,
        }}
      />
      <Stack.Screen
        name="user-cars-listings"
        options={{
          headerShown: true,
          header: () => <Header back profileIcon wallet title="Cars" />,
        }}
      />
      <Stack.Screen
        name="listings/[id]"
        options={{
          headerBackButtonDisplayMode: 'minimal',
          headerTintColor: theme.gray900,
          headerShown: true,
          headerTitle: (name as string) || '',
          // headerTitleAlign: 'left',
          headerRight: () => (
            <TouchableOpacity
              onPress={() => router.push('/search-location')}
              style={styles.locationButton}>
              <MaterialIcons
                name={place?.name ? 'location-pin' : 'wrong-location'}
                size={moderateScale(20)}
                color={theme.primary}
              />
              <ThemedText color="gray900" variant="titleSmallEmphasized">
                {(Platform.OS === 'ios' ? place?.name : place?.city) || 'Unknown Location'}
              </ThemedText>
            </TouchableOpacity>
          ),
        }}
      />
      <Stack.Screen
        name="listings/listing-details"
        options={{
          headerBackButtonDisplayMode: 'minimal',
          headerTintColor: theme.gray900,
          headerShown: true,
          headerTitle: name as string,
          // headerTitleAlign: 'left',
        }}
      />
      <Stack.Screen
        name="services/service-details"
        options={{
          headerBackButtonDisplayMode: 'minimal',
          headerTintColor: theme.gray900,
          headerShown: true,
          headerTitle: name as string,
          // headerTitleAlign: 'left',
        }}
      />
      <Stack.Screen
        name="elite-card/wallet"
        options={{
          headerBackButtonDisplayMode: 'minimal',
          headerTintColor: theme.gray900,
          headerShown: true,
          headerTitle: 'Wallet',
          // headerTitleAlign: 'left',
        }}
      />
      <Stack.Screen
        name="elite-card/add-points"
        options={{
          headerBackButtonDisplayMode: 'minimal',
          headerTintColor: theme.gray900,
          headerShown: true,
          headerTitle: 'Add Points',
          // headerTitleAlign: 'left',
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          headerBackButtonDisplayMode: 'minimal',
          headerTintColor: theme.gray900,
          headerShown: true,
          headerTitle: 'Profile',
        }}
      />
      <Stack.Screen
        name="search-location"
        options={{
          headerBackButtonDisplayMode: 'minimal',
          headerTintColor: theme.gray900,
          headerShown: true,
          headerTitle: 'Select Location',
        }}
      />
      <Stack.Screen
        name="subscription/[id]"
        options={{
          headerBackButtonDisplayMode: 'minimal',
          headerTintColor: theme.gray900,
          headerShown: true,
          headerTitle: 'Best Plans',
        }}
      />
      <Stack.Screen
        name="subscription/history"
        options={{
          headerBackButtonDisplayMode: 'minimal',
          headerTintColor: theme.gray900,
          headerShown: true,
          headerTitle: 'History',
        }}
      />
    </Stack>
  );
}

const styles = StyleSheet.create({
  locationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(4),
    paddingHorizontal: moderateScale(6),
    height: '100%',
    justifyContent: 'center',
  },
});
