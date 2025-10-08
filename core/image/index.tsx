import {
  Image as ExpoImage,
  ImageBackground,
  ImageSource,
  ImageStyle,
} from "expo-image";
import React, { PropsWithChildren } from "react";
import { StyleProp } from "react-native";
// import { getBlurhash } from './blurhash';

export type ImageProps = {
  /**
   * The radius of the blur in points, 0 means no blur effect. This effect is not applied to placeholders.
   * @default 0
   */
  blurRadius?: number;
  /**
   * The style object for image.
   */
  imageStyle?: StyleProp<ImageStyle>;
  /**
   *  Priorities for completing loads. If more than one load is queued at a time, the load with the higher priority will be started first. Priorities are considered best effort, there are no guarantees about the order in which loads will start or finish.
   * @default 'normal'
   *
   */
  priority?: "low" | "normal" | "high";
  /**
   * The image source, either a remote URL, a local file resource or a number that is the result of the require() function. When provided as an array of sources, the source that fits best into the container size and is closest to the screen scale will be chosen. In this case it is important to provide width, height and scale properties.
   */
  source: ImageSource;
  /**
   * The style of the image container.
   */
  style?: any;
  /**
   *A color used to tint template images (a bitmap image where only the opacity matters). The color is applied to every non-transparent pixel, causing the image’s shape to adopt that color. This effect is not applied to placeholders.
   * @default null
   */
  tintColor?: string;
  // Determines how the image should be resized to fit its container. This property tells the image to fill the container in a variety of ways; such as "preserve that aspect ratio" or "stretch up and take up as much space as possible". It mirrors the CSS object-fit property.

  // 'cover' - The image is sized to maintain its aspect ratio while filling the container box. If the image's aspect ratio does not match the aspect ratio of its box, then the object will be clipped to fit.

  // 'contain' - The image is scaled down or up to maintain its aspect ratio while fitting within the container box.

  // 'fill' - The image is sized to entirely fill the container box. If necessary, the image will be stretched or squished to fit.

  // 'none' - The image is not resized and is centered by default. When specified, the exact position can be controlled with contentPosition prop.

  // 'scale-down' - The image is sized as if none or contain were specified, whichever would result in a smaller concrete image size.
  /**
   * Determines how the image should be resized to fit its container. This property tells the image to fill the container in a variety of ways; such as "preserve that aspect ratio" or "stretch up and take up as much space as possible". It mirrors the CSS object-fit property.
   *
   * - `'cover'` - The image is sized to maintain its aspect ratio while filling the container box.
   * If the image's aspect ratio does not match the aspect ratio of its box, then the object will be clipped to fit.
   *
   * - `'contain'` - The image is scaled down or up to maintain its aspect ratio while fitting within the container box.
   *
   * - `'fill'` - The image is sized to entirely fill the container box. If necessary, the image will be stretched or squished to fit.
   *
   * - `'none'` - The image is not resized and is centered by default.
   * When specified, the exact position can be controlled with [`contentPosition`](#contentposition) prop.
   *
   * - `'scale-down'` - The image is sized as if `none` or `contain` were specified, whichever would result in a smaller concrete image size.
   *
   * @default 'cover'
   */

  contentFit?: "cover" | "contain" | "fill" | "none";
  /**
   * Allow downscaling of the image. This can be useful for performance reasons when the image is larger than the view.
   * @default false
   */
  allowDownScaling?: boolean;
};

/**
 * The component for displaying images.
 * @example
 * ```tsx
 * import { Image } from 'expo-app-modules/ui';
 *
 * <Image source={require('./image.png')} />
 * ```
 */
export const Image = (props: PropsWithChildren<ImageProps>) => {
  const {
    blurRadius,
    contentFit,
    children,
    imageStyle,
    priority,
    source,
    style,
    tintColor,
    allowDownScaling,
  } = props;



  return children ? (
    <ImageBackground
      allowDownscaling={allowDownScaling}
      style={style}
      blurRadius={blurRadius}
      priority={priority}
      contentFit={contentFit}
      source={source}
      imageStyle={imageStyle}
      tintColor={tintColor}
    >
      {children}
    </ImageBackground>
  ) : (
    <ExpoImage
      allowDownscaling={allowDownScaling}
      blurRadius={blurRadius}
      priority={priority}
      contentFit={contentFit}
      source={source}
      style={style}
      tintColor={tintColor}
    />
  );
};
