import { Dimensions, PixelRatio } from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;
const guidelineBaseWidth = 375;

/**
 *  Scale the size of the component based on the screen size
 * @param size
 *
 * @returns {number}
 */
export const scaleSize = (size: number): number => (WINDOW_WIDTH / guidelineBaseWidth) * size;

/**
 * Scale the font size based on the screen size
 * @param size
 *
 * @returns {number}
 */
export const scaleFont = (size: number): number => size * PixelRatio.getFontScale();
