import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated';

import ImageCarousel from '@/components/auth/image-carousel';
import LoginContainer from '@/components/auth/login-container';
import VerifyContainer from '@/components/auth/verify-container';
import { Device, useSafeAreaInsets } from '@/core';
import { DismissKeyboardView, KeyboardAwareView } from '@/lib/keyboard';
import { moderateScale } from '@/lib/responsive-dimensions';
import { colors } from '@/theme';
import { AuthScreenProps } from '@/types/screens/auth/auth.types';
/**
 * Authentication screen component that handles user login and verification.
 * Implements a sliding animation between login and verification views.
 */
const Auth: React.FC<AuthScreenProps> = () => {
  const { bottomHeight, topHeight } = useSafeAreaInsets();
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
      <View style={styles.screen}>
        <StatusBar style="light" />
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
          }}>
          <ImageCarousel />
        </View>
        <KeyboardAwareView>
          <View style={[styles.container, { paddingBottom: bottomHeight || moderateScale(20) }]}>
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
    backgroundColor: colors.backgroundPrimary,
  },
  container: {
    flex: 1,
    // ...StyleSheet.absoluteFillObject,
  },
  spacer: {
    flex: 1,
  },
  formContainer: {
    flexDirection: 'row',
  },
});
