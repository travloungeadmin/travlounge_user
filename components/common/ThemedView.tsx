import { ThemeColors } from '@/newConstants/colors';
import { useTheme } from '@/newTheme';
import React from 'react';

import type { ViewProps } from 'react-native';
import { View } from 'react-native';

interface ThemedViewProps extends ViewProps {
  backgroundColor?: keyof ThemeColors;
  children?: React.ReactNode;
}

export const ThemedView: React.FC<ThemedViewProps> = ({
  backgroundColor,
  style,
  children,
  ...props
}) => {
  const { theme } = useTheme();

  return (
    <View
      style={[backgroundColor && { backgroundColor: theme[backgroundColor] }, style]}
      {...props}>
      {children}
    </View>
  );
};
