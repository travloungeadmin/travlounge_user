import { useTheme } from '@/hooks/useTheme';
import LottieView from 'lottie-react-native';
import React from 'react';
import { StyleSheet, View } from 'react-native';

const Loading = () => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.backgroundPrimary,
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
