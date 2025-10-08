import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import React, { useState } from 'react';
import { Button, Modal, Platform, Pressable, StyleSheet, Text, View } from 'react-native';

export default function DatePickerField({
  value,
  onChange,
  mode = 'date',
  label = 'Select Date',
  minimumDate,
  maximumDate,
}) {
  const [show, setShow] = useState(false);
  const [tempDate, setTempDate] = useState(value);

  const handleConfirm = () => {
    onChange(tempDate);
    setShow(false);
  };

  const handleCancel = () => {
    setTempDate(value);
    setShow(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>

      <Pressable
        style={styles.input}
        onPress={() => setShow(true)}
        accessibilityLabel={`Date picker for ${label}`}>
        <Text>{format(value, 'PPP')}</Text>
      </Pressable>

      {Platform.OS === 'ios' ? (
        <Modal visible={show} transparent animationType="slide">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <DateTimePicker
                value={tempDate}
                mode={mode}
                display="spinner"
                onChange={(event, selectedDate) => {
                  if (selectedDate) setTempDate(selectedDate);
                }}
                minimumDate={minimumDate}
                maximumDate={maximumDate}
              />
              <View style={styles.modalButtons}>
                <Button title="Cancel" onPress={handleCancel} />
                <Button title="Confirm" onPress={handleConfirm} />
              </View>
            </View>
          </View>
        </Modal>
      ) : (
        show && (
          <DateTimePicker
            value={value}
            mode={mode}
            display="calendar"
            onChange={(event, selectedDate) => {
              setShow(false);
              if (selectedDate) onChange(selectedDate);
            }}
            minimumDate={minimumDate}
            maximumDate={maximumDate}
          />
        )
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginVertical: 10 },
  label: { fontSize: 14, color: '#555', marginBottom: 6 },
  input: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
