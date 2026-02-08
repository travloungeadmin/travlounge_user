import { preset_list } from '@/old/theme/typography';
import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleProp, TextStyle } from 'react-native';

export interface TextProps extends RNTextProps {
  preset?: keyof typeof preset_list | string;
  color?: string;
  style?: StyleProp<TextStyle>;
  children?: React.ReactNode;
}

export const Text: React.FC<TextProps> = ({ preset, color, style, children, ...props }) => {
  const presetStyle = preset ? (preset_list as any)[preset] : undefined;

  return (
    <RNText style={[presetStyle, color ? { color } : undefined, style]} {...props}>
      {children}
    </RNText>
  );
};
