import { colors } from '@/theme';
import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Loading = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.backgroundPrimary,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <LottieView
        source={require('@/old/assets/animation/loading.json')}
        style={{ width: '40%', height: '40%' }}
        autoPlay
        loop
      />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
