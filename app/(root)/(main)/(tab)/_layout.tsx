import { Tabs } from 'expo-router';
import React from 'react';

import Header from '@/components/header';
import { useSafeAreaInsets } from '@/core';
import { getCurrentLocation } from '@/modules/location';
import useUserStore from '@/modules/user';
import TabBar from '@/old/components/layout/TabBar';

export default function TabLayout() {
  const { user, isLocationPermissionGranted, isAutoFetchLocation } = useUserStore();

  const { bottomHeight } = useSafeAreaInsets();

  React.useEffect(() => {
    if (!isAutoFetchLocation) return;

    const intervalId = setInterval(
      () => {
        getCurrentLocation();
      },
      10 * 60 * 1000
    );

    return () => clearInterval(intervalId);
  }, [isLocationPermissionGranted, isAutoFetchLocation]);

  return (
    <Tabs tabBar={(props) => <TabBar {...props} />}>
      <Tabs.Screen
        name="index"
        options={{
          header: () => <Header location logo booking profileIcon />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: true,
          header: () => <Header back location title="Profile" />,
        }}
      />
      <Tabs.Screen
        name="make-a-trip"
        options={{
          headerShown: false,
          // header: () => <Header profileIcon title="Make a trip" />,
        }}
      />
    </Tabs>
  );
}
