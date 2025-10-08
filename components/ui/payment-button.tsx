import { Text } from '@/core';
import React from 'react';
import { Pressable, StyleSheet, ViewStyle } from 'react-native';

interface PaymentButtonProps {
  onPress: () => void;
  title: string;
  variant?: 'success' | 'failure' | 'subscription';
  style?: ViewStyle;
}

export const PaymentButton: React.FC<PaymentButtonProps> = ({
  onPress,
  title,
  variant = 'success',
  style,
}) => {
  const getButtonStyle = () => {
    switch (variant) {
      case 'success':
        return styles.successButton;
      case 'failure':
        return styles.failureButton;
      case 'subscription':
        return styles.subscriptionButton;
      default:
        return styles.successButton;
    }
  };

  const getTextColor = () => {
    switch (variant) {
      case 'success':
        return '#3C3C3C';
      case 'failure':
        return '#fff';
      case 'subscription':
        return '#253D8F';
      default:
        return '#3C3C3C';
    }
  };

  return (
    <Pressable
      style={[styles.button, getButtonStyle(), style]}
      onPress={onPress}>
      <Text color={getTextColor()} preset="POP_16_SB">
        {title}
      </Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 44,
    borderRadius: 22,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  successButton: {
    backgroundColor: '#FFF',
  },
  failureButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  subscriptionButton: {
    backgroundColor: '#FFF',
  },
});