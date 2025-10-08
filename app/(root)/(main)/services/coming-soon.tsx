import Header from '@/components/header';
import { Device, Image, Text, useSafeAreaInsets } from '@/core';
import { router, useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

const ComingSoon = () => {
  const { service, name } = useLocalSearchParams();
  const { bottomHeight } = useSafeAreaInsets();

  const source = (name) => {
    switch (name) {
      case 'Car Wash':
        return require('@/assets/images/coming_soon_carwash.png');
      case 'Mechanic':
        return require('@/assets/images/coming_soon_mechanic.png');
      case 'Petrol Pump':
        return require('@/assets/images/coming_soon_petrolPump.png');
      case 'Resort':
        return require('@/assets/images/coming_soon_resort.png');
      case 'Buffet':
        return require('@/assets/images/coming_soon_buffet.png');

      default:
        return require('@/assets/images/coming_soon_make_a_trip.png');
    }
  };
  return (
    <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
      <Header location title={name as string} back />
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text preset="POP_28_B" color="#253D8F">
          Coming Soon!
        </Text>
        <Text preset="POP_16_SB" color="#253D8F">
          We are working for you
        </Text>
        <Image
          priority="high"
          source={source(name)}
          style={{
            width: Device.width,
            height: Device.width * 1.105,
          }}
          contentFit="contain"
        />
        <Pressable
          onPress={() => router.back()}
          style={{
            position: 'absolute',
            bottom: bottomHeight || 20,
            left: 20,
            alignSelf: 'flex-end',
            backgroundColor: '#253D8F',
            height: 48,
            width: Device.width - 40,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text preset="POP_16_SB" color="#FFF">
            Go To Home
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default ComingSoon;

const styles = StyleSheet.create({});
