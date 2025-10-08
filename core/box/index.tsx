import React from 'react';
import { ViewProps } from 'react-native';

const NativeView = require('react-native/Libraries/Components/View/ViewNativeComponent').default;

/**
 * Props for the Box component.
 */
export type BoxProps = ViewProps & {
  /** Background color of the box. */
  backgroundColor?: string;

  /** Gap between children of the box. */
  gap?: number;
};

/**
 * A Box component that renders a View with an optional background color.
 *
 * @example
 * ```tsx
 * import React from 'react';
 * import { Box } from 'expo-app-modules/ui';
 *
 * const Example = () => (
 *  <Box backgroundColor="lightgray" style={{ padding: 10 }}>
 *   <Text>Item 1</Text>
 *  <Text>Item 2</Text>
 * <Text>Item 3</Text>
 * </Box>
 * );
 * ```

 *
 * @param {BoxProps} props - The props for the Box component.
 * @returns {JSX.Element} The rendered Box component.
 */
export const Box = (props: BoxProps): JSX.Element => {
  const { backgroundColor,gap, style, ...otherProps } = props;

  return <NativeView style={[{ backgroundColor,gap }, style]} {...otherProps} />;
};
