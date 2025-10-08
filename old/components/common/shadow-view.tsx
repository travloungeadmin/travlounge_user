import { ColorValue, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import React from 'react';

export interface ShadowViewProps {
  style?: StyleProp<ViewStyle>;
  children?: any;
  shadowColor?: ColorValue;
}

const ShadowView = (props: ShadowViewProps) => {
  const { style, children, shadowColor } = props;
  return (
    <View
      style={[
        styles.shadow,
        {
          shadowColor,
        },
        style,
      ]}>
      {children}
    </View>
  );
};

export default ShadowView;

const styles = StyleSheet.create({
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 12,
  },
});
