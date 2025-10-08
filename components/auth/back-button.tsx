import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';

import { colors } from '@/theme';
import { BackButtonProps } from '@/types/screens/auth/auth.types';

export const BackButton: React.FC<BackButtonProps> = ({ onPress, topInset }) => (
  <Pressable onPress={onPress} style={[styles.button, { top: topInset }]}>
    <FontAwesome name="chevron-left" size={30} color={colors.iconPrimary} />
  </Pressable>
);

const styles = StyleSheet.create({
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    position: 'absolute',
    left: 16,
    height: 50,
    width: 50,
    zIndex: 1,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
