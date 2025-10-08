import { ViewStyle } from 'react-native';

import { Box, BoxProps } from '../box';

/**
 * A Column component that renders a Box with flexDirection set to 'column'.
 *
 * @param {BoxProps} props - The props for the Column component.
 * @returns {JSX.Element} The rendered Column component.
 *
 * @example
 * ```tsx
 * import React from 'react';
 * import { Text } from 'react-native';
 * import { Column } from './path-to-column-component';
 *
 * const Example = () => (
 *   <Column backgroundColor="lightgray" style={{ padding: 10 }}>
 *     <Text>Item 1</Text>
 *     <Text>Item 2</Text>
 *     <Text>Item 3</Text>
 *   </Column>
 * );
 * ```
 */

export const Column = (props: BoxProps): JSX.Element => {
  const { backgroundColor, style, gap, ...otherProps } = props;

  return <Box  style={[column, { backgroundColor,gap}, style]} {...otherProps} />;
};
const column: ViewStyle = {
  flexDirection: 'column',
};
