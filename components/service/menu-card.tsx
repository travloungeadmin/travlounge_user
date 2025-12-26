import { shadow } from '@/constants';
import { Device } from '@/core';
import { useTheme } from '@/hooks/useTheme';
import React from 'react';
import { ImageBackground, Pressable, StyleSheet } from 'react-native';
import { ThemedText } from '../common/ThemedText';

const MenuCard = () => {
  const { theme } = useTheme();

  return (
    <Pressable
      style={[
        {
          marginHorizontal: 16,
          marginBottom: 30,
          borderRadius: 8,
          backgroundColor: theme.backgroundCard,
        },
        shadow,
      ]}>
      <ImageBackground
        source={require('@/assets/images/menu-background.png')}
        style={{
          width: Device.width - 32,
          height: (Device.width - 32) * 0.36,

          alignItems: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingRight: 20,
        }}>
        <ThemedText
          style={{ marginLeft: (Device.width - 32) * 0.253 }}
          color="gray900"
          variant="bodySmallEmphasized">
          Explore The {'\n'}Greatest Taste
        </ThemedText>
        <ThemedText style={{}} color="gray600" variant="bodySmallEmphasized">
          View Menu
        </ThemedText>
      </ImageBackground>
    </Pressable>
  );
};

export default MenuCard;

const styles = StyleSheet.create({});
