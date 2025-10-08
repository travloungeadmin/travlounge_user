import React, { useCallback, useRef, useState } from 'react';
import { Pressable, StyleSheet, TextInput } from 'react-native';

import { Box, Text } from '@/core';
import { colors } from '@/theme';

interface OtpContainerProps {
  value: string;
  setValue: (value: string) => void;
}

const OTP_LENGTH = 4;
const BORDER_COLOR = '#8A95BB'; // Using direct color value since it's not in theme
const FOCUS_COLOR = '#00205B'; // Using direct color value since it's not in theme

const OtpContainer: React.FC<OtpContainerProps> = ({ value, setValue }) => {
  const otpRef = useRef<TextInput>(null);
  const [isContainerFocused, setIsContainerFocused] = useState(false);
  const codeDigitArray = new Array(OTP_LENGTH).fill(0);

  const handleOnPress = useCallback(() => {
    otpRef.current?.focus();
    setIsContainerFocused(true);
  }, []);

  const toCodeDigitInput = useCallback(
    (_value: number, index: number) => {
      const digit = value[index] || '';
      const isCurrentDigit = index === value.length;
      const isLastDigit = index === value.length - 1;
      const isCodeFill = value.length === OTP_LENGTH;
      const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFill);
      const isFocused = isContainerFocused && isDigitFocused;

      return (
        <Pressable
          onPress={handleOnPress}
          key={`otp-${index}`}
          style={[
            styles.digitContainer,
            {
              borderColor: isFocused ? FOCUS_COLOR : BORDER_COLOR,
              borderWidth: isFocused ? 2 : 1,
            },
          ]}>
          <Text preset="ROB_14_M" color={colors.textSecondary}>
            {digit}
          </Text>
        </Pressable>
      );
    },
    [value, isContainerFocused, handleOnPress]
  );

  const handleChangeText = useCallback(
    (text: string) => {
      // Allow only numbers
      const sanitizedText = text.replace(/[^0-9]/g, '');
      if (sanitizedText.length <= OTP_LENGTH) {
        setValue(sanitizedText);
      }
    },
    [setValue]
  );

  return (
    <Box style={styles.container}>
      {codeDigitArray.map(toCodeDigitInput)}
      <TextInput
        ref={otpRef}
        style={styles.hiddenInput}
        value={value}
        onChangeText={handleChangeText}
        onBlur={() => setIsContainerFocused(false)}
        onFocus={() => setIsContainerFocused(true)}
        keyboardType="number-pad"
        maxLength={OTP_LENGTH}
        returnKeyType="done"
        textContentType="oneTimeCode"
        autoComplete="sms-otp"
      />
    </Box>
  );
};

export default OtpContainer;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  digitContainer: {
    height: 47,
    width: 55,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  hiddenInput: {
    width: '100%',
    height: '100%',
    opacity: 0,
    position: 'absolute',
  },
});
