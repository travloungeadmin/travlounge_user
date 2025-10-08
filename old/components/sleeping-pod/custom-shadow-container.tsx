import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Shadow } from 'react-native-shadow-2';
import { LinearGradient } from 'expo-linear-gradient';

const CustomShadowContainer = ({ children, style }) => {
  return (
    <Shadow distance={8}>
      <LinearGradient
        colors={['#F3F7FA', '#DDE0E5']}
        angle={139}
        style={[
          style,
          {
            borderRadius: 6,
          },
        ]}
      >
        {children}
      </LinearGradient>
    </Shadow>
  );
};

export default CustomShadowContainer;

const styles = StyleSheet.create({});
