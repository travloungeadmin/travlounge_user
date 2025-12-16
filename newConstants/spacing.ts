import { moderateScale } from '@/lib/responsive-dimensions';
import { Dimensions } from 'react-native';
import { initialWindowMetrics } from 'react-native-safe-area-context';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const bottomHeight = initialWindowMetrics?.insets.bottom ?? 0;
const topHeight = initialWindowMetrics?.insets.top ?? 0;

export const SPACING = {
  screenPadding: moderateScale(16),
  screenHeight: windowHeight,
  screenWidth: windowWidth,
  contentHeight: windowHeight - bottomHeight - topHeight,
  contentWidth: windowWidth - moderateScale(32),
  bottomHeight: bottomHeight,
  topHeight: topHeight,
} as const;
