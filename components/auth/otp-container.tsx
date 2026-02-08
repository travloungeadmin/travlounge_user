import React, { useCallback, useRef, useState } from 'react';
import { Pressable, StyleSheet, TextInput, View } from 'react-native';

import { useTheme } from '@/hooks/useTheme';
import { moderateScale } from '@/lib/responsive-dimensions';
import { ThemedText } from '../common/ThemedText';

interface OtpContainerProps {
  value: string;
  setValue: (value: string) => void;
}

const OTP_LENGTH = 4;

const OtpContainer: React.FC<OtpContainerProps> = ({ value, setValue }) => {
  const { theme } = useTheme();
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
              borderColor: isFocused ? theme.primaryDeep : theme.grayBlue,
              borderWidth: isFocused ? moderateScale(2) : moderateScale(1),
            },
          ]}>
          <ThemedText variant="labelLarge" color="primary">
            {digit}
          </ThemedText>
        </Pressable>
      );
    },
    [value, isContainerFocused, handleOnPress, theme]
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
    <View style={styles.container}>
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
    </View>
  );
};

export default OtpContainer;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  digitContainer: {
    height: moderateScale(47),
    width: moderateScale(55),
    borderRadius: moderateScale(5),
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
