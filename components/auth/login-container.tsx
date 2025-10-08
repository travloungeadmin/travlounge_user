import { Entypo } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  Text as RNText,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import { shadow } from '@/constants';
import { Box, Device, Text } from '@/core';
import { usePushNotifications } from '@/core/notification';
import { showError } from '@/lib/toast';
import { generateOTPMutation } from '@/services/query/auth';
import { colors } from '@/theme';
import {
  ApiError,
  LoginContainerProps,
  StyleProps,
} from '@/types/components/auth/login-container.types';
import { getPhoneValidationError } from '@/utils/validation';

const PHONE_NUMBER_LENGTH = 10;
const COUNTRY_CODE = '+91-IND';
const ERROR_COLOR = '#FF3B30'; // Using hardcoded value since colors.error might not be available yet
const FOCUSED_BORDER_COLOR = '#00205B';
const UNFOCUSED_BORDER_COLOR = '#8A95BB';

const LoginContainer: React.FC<LoginContainerProps> = ({ setIsLogin, onChangeText, value }) => {
  usePushNotifications();
  const textInputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const { isPending, mutate } = generateOTPMutation();

  const validateAndHandleLogin = () => {
    textInputRef.current?.blur();

    const error = getPhoneValidationError(value);
    if (error) {
      setValidationError(error);
      showError('Whoops!', error);
      return;
    }

    setValidationError(null);
    const formData = new FormData();
    formData.append('mobile_number', value);

    mutate(formData, {
      onSuccess: () => setIsLogin(false),
      onError: (error) => {
        const apiError = error as ApiError;
        showError('Error', apiError?.response?.data?.message || 'Something went wrong');
      },
    });
  };

  const handlePhoneChange = (text: string) => {
    // Clear validation error when user starts typing
    if (validationError) {
      setValidationError(null);
    }
    // Only allow digits
    const digitsOnly = text.replace(/[^0-9]/g, '');
    onChangeText(digitsOnly);
  };

  const openLink = async (url: string) => {
    if (!url) {
      showError('Error', 'Invalid URL');
      return;
    }
    await WebBrowser.openBrowserAsync(url);
  };

  const renderPrivacyText = () => (
    <Box style={styles.footer}>
      <RNText style={[styles.footerText, styles.normalText]}>
        By continuing, you agree to Travlounge's{' '}
      </RNText>
      <RNText
        onPress={() => openLink('https://www.travlounge.com/terms.html')}
        style={[styles.footerText, styles.linkText]}>
        Terms of use
      </RNText>
      <RNText style={[styles.footerText, styles.normalText]}> and </RNText>
      <RNText
        onPress={() => openLink('https://www.travlounge.com/terms.html')}
        style={[styles.footerText, styles.linkText]}>
        Privacy Policy
      </RNText>
    </Box>
  );

  return (
    <Box style={{ alignSelf: 'flex-end' }}>
      <Box style={styles.container}>
        <Box style={[styles.gradientContainer, shadow]}>
          <Text color={colors.textPrimary} preset="POP_28_B" style={styles.headerText}>
            Login
          </Text>
          <Text
            preset="POP_14_M"
            color={colors.textPrimaryDescription}
            style={styles.subHeaderText}>
            for the best experience
          </Text>

          <Box style={styles.inputContainer}>
            <Box style={[styles.countryCodeContainer, shadow]}>
              <Text color={colors.textSecondary} preset="ROB_14_M">
                {COUNTRY_CODE}
              </Text>
              <Entypo name="chevron-down" size={18} color={colors.iconSecondary} />
            </Box>

            <TextInput
              ref={textInputRef}
              placeholder="Phone number"
              placeholderTextColor={colors.textPrimaryDescription}
              value={value}
              onChangeText={handlePhoneChange}
              maxLength={PHONE_NUMBER_LENGTH}
              style={[
                styles.phoneNumberInput,
                {
                  borderColor: validationError
                    ? ERROR_COLOR
                    : isFocused
                      ? FOCUSED_BORDER_COLOR
                      : UNFOCUSED_BORDER_COLOR,
                  borderWidth: isFocused ? 2 : 1,
                },
              ]}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              keyboardType="number-pad"
            />
          </Box>

          <TouchableOpacity
            style={[styles.button, isPending && styles.buttonDisabled]}
            onPress={validateAndHandleLogin}
            activeOpacity={0.7}
            disabled={isPending}>
            {isPending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text preset="POP_16_M" color={colors.textTertiary}>
                Continue
              </Text>
            )}
          </TouchableOpacity>
        </Box>
        {renderPrivacyText()}
      </Box>
    </Box>
  );
};

const styles = StyleSheet.create<StyleProps>({
  container: {
    gap: 20,
    paddingHorizontal: 20,
    width: Device.width,
  },
  shadow: {
    width: '100%',
  },
  gradientContainer: {
    backgroundColor: colors.cardBackgroundPrimary,
    borderRadius: 21,
    paddingTop: 30,
    paddingHorizontal: 30,
    paddingBottom: 30,
  },
  headerText: {
    width: '100%',
    alignSelf: 'flex-start',
    lineHeight: 38,
  },
  subHeaderText: {
    alignSelf: 'flex-start',
    paddingBottom: 34,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  countryCodeContainer: {
    backgroundColor: colors.backgroundPrimary,
    width: 95,
    borderRadius: 5,
    borderColor: '#F3F7FA',
    borderWidth: 1,
    paddingHorizontal: 8,
    height: 47,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneNumberInput: {
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
    paddingHorizontal: 8,
    color: colors.textSecondary,
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: 14,
    height: 47,
    paddingLeft: 15,
  },
  buttonShadow: {
    width: '100%',
    marginBottom: 30,
    borderRadius: 10,
    overflow: 'hidden',
  },
  button: {
    backgroundColor: colors.buttonBackgroundPrimary,
    borderRadius: 10,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  footerText: {
    zIndex: 1,
    marginTop: Platform.OS === 'android' ? 3 : 0,
    alignSelf: 'flex-start',
    flexWrap: 'wrap',
  },
  normalText: {
    color: colors.textPrimaryDescription,
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '400',
  },
  linkText: {
    color: colors.textSecondary,
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '500',
  },
  errorText: {
    marginTop: -16,
    marginBottom: 16,
    paddingHorizontal: 4,
  },
});

export default LoginContainer;
