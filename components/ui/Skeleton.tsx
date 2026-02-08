import { useTheme } from '@/hooks/useTheme';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { Dimensions, DimensionValue, StyleSheet, ViewStyle } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';

type SkeletonProps = {
  width: DimensionValue;
  height: DimensionValue;
  borderRadius?: number;
  style?: ViewStyle;
};

const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);
const SCREEN_WIDTH = Dimensions.get('window').width;

const Skeleton: React.FC<SkeletonProps> = ({ width, height, borderRadius = 4, style }) => {
  const { theme } = useTheme();
  const translateX = useSharedValue(-SCREEN_WIDTH);

  useEffect(() => {
    translateX.value = withRepeat(
      withTiming(SCREEN_WIDTH, {
        duration: 1000,
        easing: Easing.linear,
      }),
      -1, // Infinite repeat
      false // No reverse
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          width,
          height,
          borderRadius,
          backgroundColor: theme.gray200, // Base color
          overflow: 'hidden',
        },
        style,
      ]}>
      <AnimatedLinearGradient
        colors={['transparent', 'rgba(255, 255, 255, 0.5)', 'transparent']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={[StyleSheet.absoluteFill, animatedStyle]}
      />
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    // Base styles if needed
  },
});

export default Skeleton;
