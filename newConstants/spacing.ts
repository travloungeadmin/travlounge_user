import { moderateScale } from '@/lib/responsive-dimensions';
import { Dimensions, Platform } from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';

export const DEVICE_WIDTH = Dimensions.get('window').width;
export const DEVICE_HEIGHT = Dimensions.get('window').height;

const bottom = initialWindowMetrics?.insets.bottom ?? 0;
const top = initialWindowMetrics?.insets.top ?? 0;
export const SCREEN_BOTTOM = Platform.select({
  ios: bottom || moderateScale(20),
  android: bottom ? bottom + moderateScale(16) : moderateScale(20),
});

export const SPACING = {
  '4xs': moderateScale(1),
  '3xs': moderateScale(2),
  '2xs': moderateScale(4),
  xs: moderateScale(6),
  small: moderateScale(8),
  medium: moderateScale(12),
  large: moderateScale(16),
  extraLarge: moderateScale(20),
  '2xLarge': moderateScale(24),
  '3xLarge': moderateScale(32),
  '4xLarge': moderateScale(36),
  '5xLarge': moderateScale(72),
  deviceWidth: DEVICE_WIDTH,
  deviceHeight: DEVICE_HEIGHT,
  contentWidth: DEVICE_WIDTH - moderateScale(32),
  screenBottom: SCREEN_BOTTOM,
  screenPadding: moderateScale(16),
  screenTop: top || moderateScale(20),
  screenHeight: DEVICE_HEIGHT,
  screenWidth: DEVICE_WIDTH,
  contentHeight: DEVICE_HEIGHT - top - bottom,
  bottom: bottom,
  top: top,
  headerHeight: (top || moderateScale(20)) + moderateScale(56),
} as const;
