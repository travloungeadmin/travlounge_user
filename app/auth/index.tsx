import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import ImageCarousel from '@/components/auth/image-carousel';
import LoginContainer from '@/components/auth/login-container';
import VerifyContainer from '@/components/auth/verify-container';
import { Device } from '@/core';
import { DismissKeyboardView, KeyboardAwareView } from '@/lib/keyboard';
import { SPACING } from '@/newConstants/spacing';
import { AuthScreenProps } from '@/types/screens/auth/auth.types';

const Auth: React.FC<AuthScreenProps> = () => {
  const [phoneNumber, setPhoneNumber] = React.useState('');
  const [isLoginView, setIsLoginView] = React.useState(true);

  const slideAnimation = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: isLoginView ? withTiming(0) : withTiming(-Device.width),
      },
    ],
  }));

  return (
    <DismissKeyboardView>
      <View style={[styles.screen]}>
        <StatusBar style="light" />
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
          }}>
          <ImageCarousel />
        </View>
        <KeyboardAwareView>
          <View style={[styles.container, { paddingBottom: SPACING.screenBottom }]}>
            <View style={styles.spacer} />

            <Animated.View style={[styles.formContainer, slideAnimation]}>
              <LoginContainer
                onChangeText={setPhoneNumber}
                value={phoneNumber}
                setIsLogin={setIsLoginView}
              />
              <VerifyContainer
                isLogin={isLoginView}
                number={phoneNumber}
                setIsLogin={setIsLoginView}
                onPressEdit={() => setIsLoginView(true)}
              />
            </Animated.View>
          </View>
        </KeyboardAwareView>
      </View>
    </DismissKeyboardView>
  );
};

export default Auth;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  spacer: {
    flex: 1,
  },
  formContainer: {
    flexDirection: 'row',
  },
});
