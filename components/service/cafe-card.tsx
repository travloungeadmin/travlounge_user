import { shadow } from '@/constants';
import { Image, Text } from '@/core';
import { colors } from '@/theme';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import Icon from '../ui/icon';

const CafeCard = (props: props) => {
  const { service } = props;
  console.log('service', service);
  const serviceName = service === 'Cafe' ? 'coffees' : 'buffets';

  return (
    <Pressable
      onPress={() => router.navigate('/(root)/(main)/qr')}
      style={{ marginHorizontal: 16, marginBottom: 20 }}>
      <LinearGradient
        colors={['rgba(102, 161, 244, 1)', 'rgba(45, 96, 227, 1)']}
        style={[
          {
            height: 70,
            borderRadius: 8,
            padding: 10,
            flexDirection: 'row',
            alignItems: 'center',
          },
          shadow,
        ]}>
        <Image
          source={require('@/assets/images/cafeCofee.png')}
          style={{ width: 54, height: 54, marginRight: 16 }}
        />
        <Text
          style={{ flex: 1 }}
          numberOfLines={2}
          color="rgba(255, 255, 255, 1)"
          preset="POP_16_SB">
          You can redeem {serviceName} from here
        </Text>
        <Icon stroke={colors.iconQuinary} size={24} name="ArrowRight" />
      </LinearGradient>
    </Pressable>
  );
};

export default CafeCard;

const styles = StyleSheet.create({});
