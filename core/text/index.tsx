import { presets as preset_list } from '@/theme';
import React from 'react';
import { Text as NativeText, TextProps as RNTextProps, StyleProp, TextStyle } from 'react-native';
import { scaleFont } from './mixins';
import { typography } from './typography';
type Sizes = keyof typeof sizeStyles;
type Weights = keyof typeof typography.fonts;
type Presets = keyof typeof presets;

export interface TextProps extends RNTextProps {
  /**
   * The text content.
   */
  text?: string;
  /**
   * Additional style overrides.
   */
  style?: StyleProp<TextStyle>;
  /**
   * Text preset type.
   */
  preset?: Presets;
  /**
   * Font weight.
   */
  weight?: Weights;
  /**
   * Font size.
   */
  size?: Sizes;
  /**
   * Children nodes.
   */
  children?: React.ReactNode;
  /**
   * Text color.
   */
  color?: string;
}

/**
 * Text component for displaying styled text.
 * @example
 * ```tsx
 * import { Text } from 'expo-app-modules/ui';
 *
 * <Text preset="heading" text="Hello, world!" />
 * ```
 */
export function Text({
  weight,
  size,
  text,
  color = '#000000',
  children,
  style: styleOverride,
  preset = 'default',
  ...rest
}: TextProps) {
  const content = text || children;

  const combinedStyles: StyleProp<TextStyle> = [
    presets[preset],
    weight && fontWeightStyles[weight],
    size && sizeStyles[size],
    { color },
    styleOverride,
  ];

  return (
    <NativeText {...rest} style={combinedStyles}>
      {content}
    </NativeText>
  );
}

const sizeStyles = {
  /**
   * Extra extra large size.
   *
   * Font size: 36
   * Line height: 44
   */
  xxl: {
    fontSize: scaleFont(36),
    lineHeight: scaleFont(44),
  } satisfies TextStyle,
  /**
   * Extra large size.
   *
   * Font size: 24
   * Line height: 34
   */
  xl: {
    fontSize: scaleFont(24),
    lineHeight: scaleFont(34),
  } satisfies TextStyle,
  /**
   * Large size.
   *
   * Font size: 20
   * Line height: 32
   */
  lg: {
    fontSize: scaleFont(20),
    lineHeight: scaleFont(32),
  } satisfies TextStyle,
  /**
   * Medium size.
   *
   * Font size: 18
   * Line height: 26
   */

  md: {
    fontSize: scaleFont(18),
    lineHeight: scaleFont(26),
  } satisfies TextStyle,
  /**
   * Small size.
   *
   * Font size: 16
   * Line height: 24
   */
  sm: {
    fontSize: scaleFont(16),
    lineHeight: scaleFont(24),
  } satisfies TextStyle,
  /**
   * Extra small size.
   *
   * Font size: 14
   * Line height: 21
   */
  xs: {
    fontSize: scaleFont(14),
    lineHeight: scaleFont(21),
  } satisfies TextStyle,
  /**
   * Extra extra small size.
   *
   * Font size: 12
   * Line height: 18
   */
  xxs: {
    fontSize: scaleFont(12),
    lineHeight: scaleFont(18),
  } satisfies TextStyle,
};

const fontWeightStyles = Object.entries(typography.fonts).reduce((acc, [weight, fontFamily]) => {
  return { ...acc, [weight]: { fontFamily } };
}, {}) as Record<Weights, TextStyle>;

const baseStyle: StyleProp<TextStyle> = [
  sizeStyles.sm,
  fontWeightStyles.black,
  { color: '#000000' },
];

const presets = {
  /**
   * Default text style.
   * Font size: 16
   * Line height: 24
   * Font weight: Black
   */
  default: baseStyle,

  /**
   * Bold text style.
   * Font weight: Bold
   * Font size: 16
   * Line height: 24
   */
  bold: [baseStyle, fontWeightStyles.bold] as StyleProp<TextStyle>,
  /**
   * Heading text style.
   * Font size: 36
   * Line height: 44
   * Font weight: Black
   */
  heading: [baseStyle, sizeStyles.xxl, fontWeightStyles.bold] as StyleProp<TextStyle>,
  /**
   * Subheading text style.
   * Font size: 20
   * Line height: 32
   * Font weight: Medium
   */
  subheading: [baseStyle, sizeStyles.lg, fontWeightStyles.medium] as StyleProp<TextStyle>,
  /**
   * Body text style.
   * Font size: 16
   * Line height: 24
   * Font weight: Regular
   */
  formLabel: [baseStyle, fontWeightStyles.medium] as StyleProp<TextStyle>,
  /**
   * Body text style.
   * Font size: 16
   * Line height: 24
   * Font weight: Regular
   */
  formHelper: [baseStyle, sizeStyles.sm, fontWeightStyles.black] as StyleProp<TextStyle>,
  ...preset_list,
};
