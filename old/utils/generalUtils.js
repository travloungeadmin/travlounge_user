import Toast from 'react-native-toast-message';
export const toast = (type, text1) => {
  Toast.show({
    type,
    text1,
    position: 'bottom',
    visibilityTime: 1500,
  });
};

// current date format 2024-03-08
const currentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  const day = String(currentDate.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};
const currentTime = () => {
  const time = new Date().toTimeString().slice(0, 8);
  return time;
};

export { currentDate, currentTime };
