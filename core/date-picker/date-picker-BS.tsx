import { BottomSheetView, useBottomSheetModal } from '@gorhom/bottom-sheet';
import DateTimePicker from '@react-native-community/datetimepicker';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Box } from '../box';
import { moderateScale } from '../responsive-dimensions';
import { useSafeAreaInsets } from '../safe-area';

type propsType = {
  initialDate: Date;
  onPress: (date: Date) => void;
  maximumDate?: Date;
  minimumDate?: Date;
  type: 'date' | 'time';
  onCancel: () => void;
};
const DatePickerIos = (props: propsType) => {
  const { initialDate, maximumDate, minimumDate, onPress, type, onCancel } = props;
  const { bottomHeight } = useSafeAreaInsets();
  const [date, setDate] = React.useState(initialDate);

  const { dismiss } = useBottomSheetModal();

  const onChangeDate = (event: any, date: Date) => {
    setDate(date);
  };

  return (
    <BottomSheetView style={{ paddingBottom: bottomHeight || moderateScale(20) }}>
      <View style={styles.view}>
        <Pressable
          onPress={() => {
            onCancel();
            dismiss();
          }}>
          <Text style={styles.buttonText}>Cancel</Text>
        </Pressable>
        <Pressable onPress={() => onPress(date)}>
          <Text style={styles.buttonText}>Save</Text>
        </Pressable>
      </View>
      <Box style={{ paddingHorizontal: moderateScale(16) }}>
        <DateTimePicker
          display="spinner"
          is24Hour
          maximumDate={maximumDate}
          minimumDate={minimumDate}
          mode={type}
          onChange={onChangeDate}
          testID="dateTimePicker"
          themeVariant="light"
          value={date}
        />
      </Box>
    </BottomSheetView>
  );
};

export default DatePickerIos;

const styles = StyleSheet.create({
  buttonText: {
    color: '',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  view: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#1C1C1E',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: moderateScale(16),
    paddingVertical: moderateScale(15),
  },
});
