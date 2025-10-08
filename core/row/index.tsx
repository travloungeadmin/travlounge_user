import { ViewStyle } from 'react-native';
import { Box, BoxProps } from '../box';

/**
 * A Row component that renders a Box with flexDirection set to 'row'.
 *
 * @param {BoxProps} props - The props for the Row component.
 * @returns {JSX.Element} The rendered Row component.
 *
 * @example
 * ```tsx
 * import React from 'react';
 * import { Text } from 'react-native';
 * import { Row } from 'expo-app-modules/ui';
 *
 * const Example = () => (
 *   <Row backgroundColor="lightgray" style={{ padding: 10 }}>
 *     <Text>Item 1</Text>
 *     <Text>Item 2</Text>
 *     <Text>Item 3</Text>
 *   </Row>
 * );
 * ```
 */
export const Row = (props: BoxProps): JSX.Element => {
  const { backgroundColor,gap, style, ...otherProps } = props;

  return <Box style={[{ backgroundColor,gap }, style, row]} {...otherProps} />;
};

const row: ViewStyle = {
  flexDirection: 'row',
};
