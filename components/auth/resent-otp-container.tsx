import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { shadow } from '@/constants';
import { Box, Text } from '@/core';
import { useTheme } from '@/hooks/useTheme';
import { showError, showSuccess } from '@/lib/toast';
import { generateOTPMutation } from '@/services/query/auth';

interface ResentOtpContainerProps {
  number: string;
  isLogin: boolean;
}

const INITIAL_TIMER = 60;
const RESEND_DISABLED_OPACITY = 0.7;

const ResentOtpContainer: React.FC<ResentOtpContainerProps> = ({ number, isLogin }) => {
  const { theme } = useTheme();
  const { mutate, isPending } = generateOTPMutation();
  const [timer, setTimer] = useState(INITIAL_TIMER);
  const [error, setError] = useState('');

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isLogin && timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => Math.max(0, prev - 1));
      }, 1000);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [timer, isLogin]);

  useEffect(() => {
    if (isLogin) {
      setTimer(INITIAL_TIMER);
      setError('');
    }
  }, [isLogin]);

  const resentOtpHandler = useCallback(() => {
    if (timer > 0 || isPending) {
      return;
    }

    const formData = new FormData();
    formData.append('mobile_number', number);

    mutate(formData, {
      onSuccess: () => {
        setTimer(INITIAL_TIMER);
        setError('');
        showSuccess('Success', 'OTP delivered! Please enter it to proceed.');
      },
      onError: () => {
        setError('Failed to send OTP. Please try again.');
        showError('Error', 'Failed to send OTP');
      },
    });
  }, [timer, isPending, number, mutate]);

  const isDisabled = timer > 0 || isPending;

  return (
    <Box style={styles.container}>
      <TouchableOpacity
        style={[styles.button, shadow, isDisabled && styles.disabledButton]}
        onPress={resentOtpHandler}
        disabled={isDisabled}>
        {isPending ? (
          <Text color={theme.primary} preset="ROB_14_M" style={styles.buttonText}>
            Sending...
          </Text>
        ) : (
          <Text
            color={theme.primary}
            preset="ROB_14_M"
            style={[styles.buttonText, isDisabled && styles.disabledText]}>
            Resend OTP
          </Text>
        )}
      </TouchableOpacity>

      {timer > 0 && (
        <Text color={theme.primary} preset="ROB_14_M">
          00:{timer.toString().padStart(2, '0')}
        </Text>
      )}

      {error ? (
        <Text color={theme.error} preset="POP_12_R" style={styles.errorText}>
          {error}
        </Text>
      ) : null}
    </Box>
  );
};

export default ResentOtpContainer;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 5,
    borderColor: '#F3F7FA',
    height: 47,
    width: 112,
    justifyContent: 'center',
    alignItems: 'center',
  },
  disabledButton: {
    opacity: RESEND_DISABLED_OPACITY,
  },
  buttonText: {
    textAlign: 'center',
  },
  disabledText: {
    opacity: RESEND_DISABLED_OPACITY,
  },
  errorText: {
    position: 'absolute',
    bottom: -20,
    left: 0,
    right: 0,
    textAlign: 'center',
  },
});
