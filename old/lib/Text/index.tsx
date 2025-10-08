import { ColorValue, Text as RNText, StyleProp, TextProps as RNTextProps } from 'react-native';
import React from 'react';

export interface TextProps {
  children: any;
  varient: keyof typeof varients;
  color?: ColorValue;
  style?: RNTextProps['style'];
}

const varients = {
  POP_16_M: {
    fontFamily: 'Poppins-Medium',
    fontSize: 16,
  },
  POP_12_SB: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 12,
  },
  POP_12_R: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
  },
  POP_14_SB: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
  },
  ROB_16_B: {
    fontFamily: 'Roboto-Bold',
    fontSize: 16,
  },
  POP_14_R: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
  },
};

const Text = (props: TextProps) => {
  const { children, varient, color, style } = props;

  const combinedStyle = [varients[varient], { color }, style];

  return <RNText style={combinedStyle}>{children}</RNText>;
};

export default Text;
