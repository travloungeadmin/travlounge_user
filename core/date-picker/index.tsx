import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import { Platform, StyleSheet } from 'react-native';

import { BottomSheetModal } from '@gorhom/bottom-sheet';
import BottomSheet from '../bottom-sheet';
import DatePickerIos from './date-picker-BS';

type propsType = {
  maximumDate?: Date;
  minimumDate?: Date;
  onPress: (date: Date) => void;
  value: Date;
  showDatePicker: boolean;
  type: 'date' | 'time';
  onCancel: () => void;
  blockPastTime?: boolean;
};

const DatePicker = (props: propsType) => {
  const { maximumDate, minimumDate, onPress, showDatePicker, value, type, onCancel, blockPastTime } = props;
  const datePickerRef = React.useRef<BottomSheetModal>(null);

  // Compute minimum date for time picker to block past times
  const computedMinDate = React.useMemo(() => {
    if (type === 'time' && blockPastTime) {
      return new Date(); // Current date and time
    }
    return minimumDate;
  }, [type, blockPastTime, minimumDate]);

  React.useEffect(() => {
    if (datePickerRef.current) {
      if (showDatePicker) {
        datePickerRef.current.present();
      } else {
        datePickerRef.current.dismiss();
      }
    }
  }, [showDatePicker]);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === 'android') {
      // If user cancels the picker, event.type will be 'dismissed'
      if (event.type === 'dismissed') {
        onCancel();
        return;
      }
      // Only call onPress if there's a selected date and the event type is 'set'
      if (event.type === 'set' && selectedDate) {
        onPress(selectedDate);
        onCancel(); // Close the picker after selection on Android
      }
    } else if (selectedDate) {
      onPress(selectedDate);
    }
  };

  const DatePickerModal = () => (
    <BottomSheet onDismiss={onCancel} enableDynamicSizing ref={datePickerRef}>
      <DatePickerIos
        type={type}
        initialDate={value}
        maximumDate={maximumDate}
        minimumDate={computedMinDate}
        onPress={onPress}
        onCancel={onCancel}
      />
    </BottomSheet>
  );

  return Platform.OS === 'android' ? (
    showDatePicker && (
      <DateTimePicker
        display="default"
        maximumDate={maximumDate}
        minimumDate={computedMinDate}
        mode={type}
        onChange={handleDateChange}
        testID="dateTimePicker"
        themeVariant="dark"
        value={value}
      />
    )
  ) : (
    <DatePickerModal />
  );
};
export default DatePicker;

const styles = StyleSheet.create({});
