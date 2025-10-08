import React from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';

import { shadow } from '@/constants';
import { Device, Text } from '@/core';
import useSleepingPodCart from '@/modules/sleeping-pod';
import { colors } from '@/theme';
import { getHomeServices } from '@/utils/home';
import { router } from 'expo-router';
import Icon from '../ui/icon';

type propsType = {
  category: any;
};

const ServiceView = (props: propsType) => {
  const { category } = props;
  const width = (Device.width - 72.1) / 3;
  const { resetState } = useSleepingPodCart();

  const updatedServices = getHomeServices(category);

  const handlePress = (service: { title: any; icon?: string; mapIcon?: string; id: any }) => () => {
    if (service.title === 'Sleeping Pod') {
      resetState();
      router.navigate('/services/sleeping-pod');
      return;
    }
    router.navigate({
      pathname: '/services/service',
      params: {
        service: service.id,
        name: service.title,
      },
    });
  };
  return (
    <View style={styles.container}>
      {updatedServices?.map((service) => (
        <Pressable
          style={[
            styles.shadowView,
            shadow,
            {
              width: width,
              height: 1.1 * width,
              backgroundColor: colors.cardBackgroundPrimary,
            },
          ]}
          key={service.id}
          onPress={handlePress(service)}>
          <Icon
            size={
              Platform.OS === 'ios'
                ? service.icon === 'Toloo'
                  ? 50
                  : 40
                : service.icon === 'Toloo'
                  ? 55
                  : 45
            }
            name={service.icon}
          />
          <Text style={{ textAlign: 'center' }} preset="POP_12_SB" color={colors.textPrimary}>
            {service.title}
          </Text>
        </Pressable>
      ))}
    </View>
  );
};

export default ServiceView;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    display: 'flex',
    flexWrap: 'wrap',
    gap: 20,
  },
  shadowView: {
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
});
