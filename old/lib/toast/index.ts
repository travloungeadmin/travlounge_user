import Toast from 'react-native-toast-message';

type ToastType = 'success' | 'error' | 'info';
type ToastPositionType = 'top' | 'bottom';

const showToast = (
  type: ToastType,
  title: string,
  subtitle: string,
  position: ToastPositionType,
  visibilityTime: number = 1000
) => {
  Toast.show({
    position,
    text1: title,
    text2: subtitle,
    type,
    visibilityTime,
  });
};

const showError = (title: string, subtitle: string) => {
  Toast.show({
    position: 'bottom',
    text1: title,
    text2: subtitle,
    type: 'error',
    visibilityTime: 1000,
  });
};

const showInfo = (title: string, subtitle: string) => {
  Toast.show({
    position: 'bottom',
    text1: title,
    text2: subtitle,
    type: 'info',
    visibilityTime: 1000,
  });
};

const showSuccess = (title: string, subtitle?: string, visibilityTime: number = 1000) => {
  Toast.show({
    position: 'bottom',
    text1: title,
    text2: subtitle,
    type: 'success',
    visibilityTime,
  });
};

export { showError, showInfo, showSuccess, showToast };
