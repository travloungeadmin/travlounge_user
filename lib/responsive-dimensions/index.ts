import { Dimensions, useWindowDimensions } from 'react-native';

const { width, height } = Dimensions.get('window');

const guidelineBaseWidth = 393;
const guidelineBaseHeight = 852;

const horizontalScale = (size: number) => (width / guidelineBaseWidth) * size;
const verticalScale = (size: number) => (height / guidelineBaseHeight) * size;
const moderateScale = (size: number, factor = 0.5) =>
  Math.round(size + (horizontalScale(size) - size) * factor);

export { horizontalScale, moderateScale, verticalScale };

export const useResponsiveDimensions = () => {
  const guidelineBaseWidth = 393;
  const { width } = useWindowDimensions();

  const scaleSize = (size: number) => (width / guidelineBaseWidth) * size;

  return { scaleSize };
};
