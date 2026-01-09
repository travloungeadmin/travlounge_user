import HomeHeader from '@/components/screens/home/home-header';
import TabBar from '@/old/components/layout/TabBar';
import { Tabs } from 'expo-router';
import React from 'react';

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <TabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          headerShown: true,
          header: () => <HomeHeader />,
          title: 'Home',
        }}
      />
      <Tabs.Screen
        name="qr"
        options={{
          title: 'QR',
          headerShown: true,
          header: () => <HomeHeader />,
        }}
      />
      <Tabs.Screen
        name="make-a-trip"
        options={{
          title: 'Make a Trip',
        }}
      />
    </Tabs>
  );
}
