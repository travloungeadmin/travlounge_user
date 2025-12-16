import * as Notifications from 'expo-notifications';
import { router, Stack, useGlobalSearchParams } from 'expo-router';
import React from 'react';

import Header from '@/components/header';
import { useNotificationObserver } from '@/core/notification';
import { useTheme } from '@/newTheme';
import useServiceStore from '@/store/service';

export default function MainLayout() {
  const { theme } = useTheme();
  const { id } = useGlobalSearchParams();
  const { services } = useServiceStore();
  const serviceName = services.find((service) => service.id === Number(id))?.title;

  const notificationListener = React.useRef<Notifications.Subscription | null>(null);
  const { header } = useGlobalSearchParams();
  const handlePaymentResult = (data: any) => {
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

  // if (!session) {
  //   return <Redirect href="/auth" />;
  // }

  useNotificationObserver((notification: Notifications.Notification) => {
    const data = notification.request.content.data;
    handlePaymentResult(data);
  });

  return (
    <Stack screenOptions={{ headerShown: false, animation: 'none' }}>
      <Stack.Screen
        name="search"
        options={{
          headerShown: true,
          header: () => <Header back title="Search" />,
        }}
      />
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
          headerTitle: serviceName,
        }}
      />
    </Stack>
  );
}
