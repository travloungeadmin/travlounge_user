import { shadow } from '@/constants';
import { Box } from '@/core';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { ThemedText } from './common/ThemedText';
import Icon from './ui/icon';

type PorpsType = {
  index: number;
  price: number;
  services: any;
  name: string;
  onPress: () => void;
};

const PackageCard = (props: PorpsType) => {
  const { index, price, services, name, onPress } = props;
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          marginVertical: 20,
          marginBottom: 30,
          alignItems: 'center',
          backgroundColor: theme.backgroundCard,
          width: 205,
          paddingVertical: 20,
          paddingHorizontal: 10,
          borderRadius: 10,
          gap: 16,
        },
        shadow,
      ]}>
      <Icon size={40} name={index === 0 ? 'Crown' : 'Surprice'} />
      <ThemedText variant="bodySmallEmphasized" color="gray800">
        {index === 0 ? 'Exclusive Access Awaits, Subscribe Now!' : `${name} plan`}
      </ThemedText>
      <Box gap={5}>
        {services?.map((item) => (
          <ThemedText variant="bodySmallEmphasized" color="gray800" style={{ textAlign: 'center' }}>
            {item?.number}{' '}
            <ThemedText variant="bodySmall" color="gray800">
              {item?.name}
            </ThemedText>
          </ThemedText>
        ))}
      </Box>
      <Box style={{ flex: 1 }} />
      {price === 0 && (
        <ThemedText variant="label" color="gray600" style={{ paddingVertical: 12 }}>
          *{name} redeemed only in Travlounge stores
        </ThemedText>
      )}
      <Box
        style={{
          height: 30,
          borderRadius: 30,
          backgroundColor: '#253D8F',
          justifyContent: 'center',
          paddingHorizontal: 20,
        }}>
        <ThemedText variant="bodySmallEmphasized" color="white">
          ₹ {price}
        </ThemedText>
      </Box>
    </Pressable>
  );
};

export default PackageCard;

const styles = StyleSheet.create({});
