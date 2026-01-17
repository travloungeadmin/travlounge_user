import { ThemeColors } from '@/newConstants/colors';
import { TYPOGRAPHY, TypographyVariant } from '@/newConstants/fonts';
import { useTheme } from '@/newTheme';
import type { FC, ReactNode } from 'react';
import { useMemo } from 'react';

import type { TextProps as RNTextProps, StyleProp, TextStyle } from 'react-native';
import { Text as RNText } from 'react-native';

export interface ThemedTextProps extends RNTextProps {
  variant?: TypographyVariant;
  color?: keyof ThemeColors;
  children: ReactNode;
}

export const ThemedText: FC<ThemedTextProps> = ({
  variant = 'body',
  color = 'gray900',
  style,
  children,
  ...rest
}) => {
  const { theme } = useTheme();

  const computedStyle = useMemo<StyleProp<TextStyle>>(
    () => [TYPOGRAPHY[variant] as TextStyle, { color: theme[color as keyof ThemeColors] }, style],
    [variant, color, style, theme]
  );

  return (
    <RNText style={computedStyle} {...rest}>
      {children}
    </RNText>
  );
};
