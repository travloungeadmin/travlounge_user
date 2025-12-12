import { Tabs } from 'expo-router';
import React from 'react';

import Header from '@/components/header';
import { useSafeAreaInsets } from '@/core';
import { getCurrentLocation } from '@/modules/location';
import useUserStore from '@/modules/user';
import { useTheme } from '@/newTheme';
import TabBar from '@/old/components/layout/TabBar';

export default function TabLayout() {
  const { theme } = useTheme();
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
    <Tabs
      screenOptions={{
        sceneStyle: {
          backgroundColor: theme.backgroundTop,
        },
      }}
      tabBar={(props) => <TabBar {...props} />}>
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
          headerTitleAlign: 'left',
          header: () => <Header back location title="Profile" />,
        }}
      />
      <Tabs.Screen
        name="make-a-trip"
        options={{
          // headerRight: () => (
          //   <Pressable
          //     style={{
          //       height: '100%',
          //       alignItems: 'center',
          //       justifyContent: 'center',
          //     }}
          //     onPress={() => {}}>
          //     <Entypo
          //       name="new-message"
          //       size={24}
          //       color={theme.primary}
          //       style={{ marginRight: 16 }}
          //     />
          //   </Pressable>
          // ),
          // headerLeft: () => (
          //   <Pressable
          //     style={{
          //       height: '100%',
          //       alignItems: 'center',
          //       justifyContent: 'center',
          //     }}
          //     onPress={() => {}}>
          //     <Ionicons name="menu" size={24} color={theme.primary} style={{ marginLeft: 16 }} />
          //   </Pressable>
          // ),
          // headerTitleAlign: 'left',
          // headerTitleStyle: {
          //   color: theme.primary,
          // },

          // title: 'Make a trip',
          headerShown: false,
          // header: () => <Header profileIcon title="Make a trip" />,
        }}
      />
    </Tabs>
  );
}
