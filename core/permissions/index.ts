import {
  getCameraPermissionsAsync,
  getMediaLibraryPermissionsAsync,
  requestCameraPermissionsAsync,
  requestMediaLibraryPermissionsAsync,
} from 'expo-image-picker';

/**
 *
 * Checks user's permissions for accessing photos.
 */
export async function getMediaLibraryPermissions() {
  return getMediaLibraryPermissionsAsync();
}

/**
 *
 * Asks the user to grant permissions for accessing user's photo. This method does nothing on web.
 */
export async function requestMediaLibraryPermissions() {
  return requestMediaLibraryPermissionsAsync();
}

/**
 * Checks user's permissions for accessing camera.
 */
export async function getCameraPermissions() {
  return getCameraPermissionsAsync();
}

/**
 * Asks the user to grant permissions for accessing camera. This does nothing on web because the browser camera is not used.
 */
export async function requestCameraPermissions() {
  return requestCameraPermissionsAsync();
}
