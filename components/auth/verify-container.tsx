import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  Text as RNText,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';

import OtpContainer from './otp-container';
import ResentOtpContainer from './resent-otp-container';

import { shadow } from '@/constants';
import { Box, Device, Text } from '@/core';
import { usePushNotifications } from '@/core/notification';
import { showError } from '@/lib/toast';
import { setRefresh, setSession } from '@/modules/user';
import { verifyOTPQuery } from '@/services/query/auth';
import { colors } from '@/theme';

interface VerifyContainerProps {
  number: string;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  isLogin: boolean;
  onPressEdit: () => void;
}

const VerifyContainer: React.FC<VerifyContainerProps> = ({
  setIsLogin,
  number,
  isLogin,
  onPressEdit,
}) => {
  const { mutate, isPending } = verifyOTPQuery();
  const { expoPushToken } = usePushNotifications();
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  React.useEffect(() => {
    setValue('');
    setError('');
  }, [isLogin]);

  const validateOTP = (otp: string): boolean => {
    if (!otp) {
      setError('Please enter OTP');
      return false;
    }
    if (otp.length !== 4) {
      setError('Please enter a valid 4-digit OTP');
      return false;
    }
    if (!/^\d+$/.test(otp)) {
      setError('OTP must contain only numbers');
      return false;
    }
    setError('');
    return true;
  };

  const continueHandler = () => {
    if (!validateOTP(value)) {
      showError('Error', 'Please enter a valid OTP');
      return;
    }

    const formData = new FormData();
    formData.append('mobile_number', number);
    formData.append('otp', value);
    if (expoPushToken) {
      formData.append('device_token', expoPushToken);
    }

    mutate(formData, {
      onSuccess: (res) => {
        setSession(res.access_token);
        setRefresh(res.refresh_token);
        router.replace('/(root)/(main)/(tab)');
      },
      onError: () => {
        setError('Invalid OTP');
        showError('Error', 'Please enter a valid OTP');
      },
    });
  };

  return (
    <Box style={styles.container}>
      <Box style={[styles.innerContainer, shadow]}>
        <Text color={colors.textPrimary} preset="POP_14_M" style={styles.text1}>
          Verification
        </Text>

        <RNText
          style={[
            styles.text2,
            {
              flexDirection: 'row',
              fontFamily: 'Poppins',
              fontSize: 14,
              fontWeight: '400',
              color: colors.textPrimaryDescription,
            },
          ]}>
          Please enter the verification code we've sent you on {number}
          <TouchableWithoutFeedback onPress={onPressEdit}>
            <RNText
              style={{
                fontFamily: 'Poppins',
                fontSize: 14,
                fontWeight: '700',
                color: colors.buttonBackgroundPrimary,
              }}>
              {' '}
              Edit
            </RNText>
          </TouchableWithoutFeedback>
        </RNText>

        <OtpContainer value={value} setValue={setValue} />

        <TouchableOpacity
          style={[styles.button, isPending && styles.disabledButton]}
          onPress={continueHandler}
          disabled={isPending}
          activeOpacity={0.7}>
          {isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text preset="POP_16_M" color={colors.textTertiary}>
              Continue
            </Text>
          )}
        </TouchableOpacity>
      </Box>
      <ResentOtpContainer isLogin={isLogin} number={number} />
    </Box>
  );
};

export default VerifyContainer;

const styles = StyleSheet.create({
  container: {
    gap: 20,
    paddingHorizontal: 20,
  },
  innerContainer: {
    paddingBottom: 30,
    backgroundColor: colors.cardBackgroundPrimary,
    width: Device.width - 40,
    borderRadius: 21,
    paddingTop: 30,
    paddingHorizontal: 20,
    gap: 20,
  },
  text1: {
    marginTop: Platform.OS === 'android' ? 3 : 0,
    width: '100%',
    alignSelf: 'flex-start',
    paddingLeft: 9,
    lineHeight: 18,
  },
  text2: {
    // marginTop: Platform.OS === 'android' ? 3 : 0,
    alignSelf: 'flex-start',
    paddingLeft: 9,
    alignItems: 'center',
    // lineHeight: 20,
  },
  button: {
    borderRadius: 10,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.buttonBackgroundPrimary,
    width: '100%',
  },
  disabledButton: {
    opacity: 0.7,
  },
});
