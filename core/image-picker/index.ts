import * as ImagePicker from 'expo-image-picker';

import { requestCameraPermissions } from '../permissions';

export interface CameraProps {
  /**
   * The quality of the image, between 0 and 1. 0 means the image is compressed as much as possible.
   * @default 0.1
   *
   */
  quality?: number;
  /**
   * Whether to return the image as base64 string.
   * @default true
   */
  base64?: boolean;
}

export interface PickerProps {
  /**
   * The maximum number of images that can be selected.
   * @default 5
   *
   * */

  selectionLimit?: number;

  /**
   * The quality of the image, between 0 and 1. 0 means the image is compressed as much as possible.
   * @default 0.1
   */

  base64?: boolean;
  /**
   * The quality of the image, between 0 and 1. 0 means the image is compressed as much as possible.
   * @default 0.1
   *
   * */
  quality?: number;

  /**
   * The presentation style of the image picker.
   * @default ImagePicker.UIImagePickerPresentationStyle.FULL_SCREEN
   *
   * */

  presentationStyle?: ImagePicker.UIImagePickerPresentationStyle;
  /**
   * The media types that can be selected.
   * @default ImagePicker.MediaTypeOptions.Images
   *
   * */

  mediaTypes?: ImagePicker.MediaTypeOptions;
  /**
   * Whether to allow multiple selection.
   * @default true
   *
   * */
  allowsMultipleSelection?: boolean;
  /**
   * Whether to allow editing the image.
   * @default false
   *
   * */
  allowsEditing?: boolean;
}

/**
 * A function to open the camera and take a picture.
 * @param props
 * @returns  The image taken by the camera.
 *
 * @example
 * import { camera } from 'expo-app-modules/image-picker';
 *
 * const takePicture = async () => {
 *  const image = await camera({ quality: 0.5, base64: true });
 * console.log(image);
 * };
 *
 * takePicture();
 *
 *
 */
export const camera = async (props: CameraProps) => {
  const { quality = 0.1, base64 = true } = props;
  console.log('camera');
  
  const permission = await requestCameraPermissions();
  console.log(permission);
  
  if (!permission.granted) {
    await requestCameraPermissions();
    return null;
  }
  const result = await ImagePicker.launchCameraAsync({
    quality,
    base64,
  });
  if (!result.canceled) {
    return result.assets;
  }
  return null;
};

/**
 * A function to open the image picker and select images.
 * @param props
 * @returns  The images selected by the user.
 *
 * @example
 * import { picker } from 'expo-app-modules/image-picker';
 *
 * const selectImage = async () => {
 *  const images = await picker({ selectionLimit: 5, base64: true, quality: 0.5 });
 * console.log(images);
 * };
 *
 * selectImage();
 *
 *
 */
const picker = async (props: PickerProps) => {
  const {
    selectionLimit = 5,
    base64 = false,
    quality = 0.1,
    presentationStyle = ImagePicker.UIImagePickerPresentationStyle.FULL_SCREEN,
    mediaTypes = ImagePicker.MediaTypeOptions.Images,
    allowsMultipleSelection = true,
    allowsEditing = false,
  } = props;
  const result = await ImagePicker.launchImageLibraryAsync({
    allowsEditing,
    allowsMultipleSelection,
    mediaTypes,
    presentationStyle,
    quality,
    base64,
    selectionLimit,
  });
  if (!result.canceled) {
    return result.assets;
  }
  return null;
};

export default picker;
