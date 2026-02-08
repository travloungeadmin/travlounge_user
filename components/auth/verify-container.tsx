import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { ThemedText } from '../common/ThemedText';
import OtpContainer from './otp-container';
import ResentOtpContainer from './resent-otp-container';

import { shadow } from '@/constants';
import { usePushNotifications } from '@/core/notification';
import { useTheme } from '@/hooks/useTheme';
import { showError } from '@/lib/toast';
import { setLoggedIn, setRefresh, setSession } from '@/modules/user';
import { SPACING } from '@/newConstants/spacing';
import { verifyOTPQuery } from '@/services/query/auth';

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
  const { theme } = useTheme();
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
        if (res?.access_token) {
          setSession(res.access_token);
          setRefresh(res.refresh_token);
          setLoggedIn(true);
          router.replace('/(main)/(tab)');
        } else {
          showError('Error', 'Invalid response from server');
        }
      },
      onError: () => {
        setError('Invalid OTP');
        showError('Error', 'Please enter a valid OTP');
      },
    });
  };

  return (
    <View style={styles.container}>
      <View style={[styles.innerContainer, { backgroundColor: theme.backgroundCard }, shadow]}>
        <ThemedText color="gray900" variant="labelLarge" style={styles.text1}>
          Verification
        </ThemedText>

        <ThemedText variant="body" color="gray600" style={[styles.text2, { flexDirection: 'row' }]}>
          Please enter the verification code we've sent you on {number}
          <TouchableWithoutFeedback onPress={onPressEdit}>
            <ThemedText
              color="primary"
              style={{
                fontFamily: 'Poppins',
                fontSize: 14,
                fontWeight: '700',
              }}>
              {' '}
              Edit
            </ThemedText>
          </TouchableWithoutFeedback>
        </ThemedText>

        <OtpContainer value={value} setValue={setValue} />

        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: theme.primary },
            isPending && styles.disabledButton,
          ]}
          onPress={continueHandler}
          disabled={isPending}
          activeOpacity={0.7}>
          {isPending ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <ThemedText variant="bodyLargeEmphasized" color="white">
              Continue
            </ThemedText>
          )}
        </TouchableOpacity>
      </View>
      <ResentOtpContainer isLogin={isLogin} number={number} />
    </View>
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
    width: SPACING.screenWidth - 40,
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
    width: '100%',
  },
  disabledButton: {
    opacity: 0.7,
  },
});
