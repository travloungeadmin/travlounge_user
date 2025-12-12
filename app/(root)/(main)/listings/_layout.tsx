import { Stack } from 'expo-router';
import React from 'react';

import Header from '@/components/header';

export default function ListingsLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, animation: 'none' }}>
      <Stack.Screen
        name="[id]"
        options={{
          headerShown: true,
          header: () => <Header back profileIcon wallet title="Cars" />,
        }}
      />
      <Stack.Screen
        name="listing-details"
        options={{
          headerShown: false,
        }}
      />
    </Stack>
  );
}
