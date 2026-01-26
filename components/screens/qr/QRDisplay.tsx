import { ThemedText } from '@/components/common/ThemedText';
import { ThemedView } from '@/components/common/ThemedView';
import { useTheme } from '@/hooks';
import { moderateScale } from '@/lib/responsive-dimensions';
import { SPACING } from '@/newConstants/spacing';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

type QRDisplayProps = {
  username?: string;
  userId?: number | string;
};

const QRDisplay = ({ username, userId }: QRDisplayProps) => {
  const { theme } = useTheme();
  const rotation = useSharedValue(0);

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming(360, {
        duration: 5000,
        easing: Easing.linear,
      }),
      -1
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: `${rotation.value}deg` }],
    };
  });

  return (
    <View style={styles.container}>
      <ThemedText style={styles.title} variant="titleLargeEmphasized">
        👋 Hi, {username}
      </ThemedText>
      <ThemedText variant="bodyEmphasized">
        <ThemedText variant="labelLargeEmphasized">
          show this QR code at the counter to pay,{' '}
        </ThemedText>
        redeem points, or use your subscription.
      </ThemedText>
      <View style={styles.shadowContainer}>
        <View style={styles.gradientContainer}>
          <Animated.View style={[styles.gradient, animatedStyle]}>
            <LinearGradient
              style={StyleSheet.absoluteFill}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              colors={[
                theme.primary500,
                theme.primary200,
                theme.primary600,
                theme.primary800,
                theme.primary200,
              ]}
            />
          </Animated.View>
          <ThemedView backgroundColor="white" style={styles.qrBackground}>
            <QRCode
              value={userId?.toString() || '0'}
              size={SPACING.contentWidth - 6 * SPACING.screenPadding}
              backgroundColor="#fff"
              logo={require('@/assets/images/splash-icon.png')}
              logoSize={moderateScale(50)}
              logoBackgroundColor={theme.primary800}
              logoBorderRadius={moderateScale(50)}
            />
          </ThemedView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: SPACING.screenPadding,
    paddingHorizontal: SPACING.screenPadding * 2,
  },
  title: {
    paddingBottom: moderateScale(8),
  },
  shadowContainer: {
    marginTop: SPACING.screenPadding,
    alignSelf: 'center',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 2 * SPACING.screenPadding,
  },
  gradientContainer: {
    padding: SPACING.screenPadding, // Spacing for the border thickness
    borderRadius: 2 * SPACING.screenPadding,
    overflow: 'hidden',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradient: {
    width: '200%', // Make it large enough to cover corners during rotation
    height: '200%',
    position: 'absolute',
    top: '-50%',
    left: '-50%',
  },
  qrBackground: {
    backgroundColor: '#fff',
    padding: SPACING.screenPadding,
    borderRadius: SPACING.screenPadding,
    zIndex: 1, // Ensure QR code sits on top
  },
});

export default QRDisplay;
