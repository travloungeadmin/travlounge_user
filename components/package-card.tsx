import { shadow } from '@/constants';
import { Box, Text } from '@/core';
import { colors } from '@/theme';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
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
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          marginVertical: 20,
          marginBottom: 30,
          alignItems: 'center',
          backgroundColor: colors.cardBackgroundPrimary,
          width: 205,
          paddingVertical: 20,
          paddingHorizontal: 10,
          borderRadius: 10,
          gap: 16,
        },
        shadow,
      ]}>
      <Icon size={40} name={index === 0 ? 'Crown' : 'Surprice'} />
      <Text preset="POP_14_SB" color="#333333">
        {index === 0 ? 'Exclusive Access Awaits, Subscribe Now!' : `${name} plan`}
      </Text>
      <Box gap={5}>
        {services?.map((item) => (
          <Text style={{ textAlign: 'center' }} preset="POP_14_SB" color="#333333">
            {item?.number}{' '}
            <Text preset="POP_14_R" color="#333333">
              {item?.name}
            </Text>
          </Text>
        ))}
      </Box>
      <Box style={{ flex: 1 }} />
      {price === 0 && (
        <Text color="#666666" style={{ paddingVertical: 12 }} preset="POP_12_R">
          *{name} redeemed only in Travlounge stores
        </Text>
      )}
      <Box
        style={{
          height: 30,
          borderRadius: 30,
          backgroundColor: '#253D8F',
          justifyContent: 'center',
          paddingHorizontal: 20,
        }}>
        <Text preset="POP_14_SB" color="#FFF">
          ₹ {price}
        </Text>
      </Box>
    </Pressable>
  );
};

export default PackageCard;

const styles = StyleSheet.create({});
