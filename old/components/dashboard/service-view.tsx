import { Text } from '@/core';
import { services } from '@/data';
import { shadow } from '@/old/constants';
import { Device } from '@/old/lib/device';
import { useTheme } from '@/old/lib/theme';
import { router } from 'expo-router';
import React from 'react';
import { Platform, Pressable, StyleSheet, View } from 'react-native';
import Icon from '../ui/icon';

const ServiceView = () => {
  const { theme } = useTheme();
  const width = (Device.width - 72) / 3;
  return (
    <View style={styles.container}>
      {services.map((service) => (
        <Pressable
          style={[
            styles.shadowView,
            shadow,
            {
              width: width,
              height: 1.1 * width,
              backgroundColor: theme.backgroundSecondary,
            },
          ]}
          key={service.id}
          onPress={() =>
            router.navigate({
              pathname: `/services/${service.id}`,
              params: {
                id: service.id,
              },
            })
          }>
          <Icon size={Platform.OS === 'ios' ? 40 : 45} name={service.icon} />
          <Text preset="POP_12_SB" color={theme.textSecondary}>
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
