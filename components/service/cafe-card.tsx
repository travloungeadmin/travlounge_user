import { shadow } from '@/constants';
import { Image } from '@/core';
import { useTheme } from '@/hooks/useTheme';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { ThemedText } from '../common/ThemedText';
import Icon from '../ui/icon';

type props = {
  service: string;
};

const CafeCard = (props: props) => {
  const { service } = props;
  console.log('service', service);
  const serviceName = service === 'Cafe' ? 'coffees' : 'buffets';
  const { theme } = useTheme();

  return (
    <Pressable
      onPress={() => router.navigate('/(main)/qr')} // Assuming this path is correct, or update if needed
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
          source={
            serviceName === 'buffets'
              ? require('@/assets/images/buffetImage.png')
              : require('@/assets/images/cafeCofee.png')
          }
          style={{ width: 54, height: 54, marginRight: 16 }}
        />
        <ThemedText
          style={{ flex: 1 }}
          numberOfLines={2}
          color="white"
          variant="bodySmallEmphasized">
          You can redeem {serviceName} from here
        </ThemedText>
        <Icon stroke={theme.white} size={24} name="ArrowRight" />
      </LinearGradient>
    </Pressable>
  );
};

export default CafeCard;

const styles = StyleSheet.create({});
