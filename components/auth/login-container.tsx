import { Entypo } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import React, { useRef, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  TextInput,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';

import { shadow } from '@/constants';
import { usePushNotifications } from '@/core/notification';
import { useTheme } from '@/hooks/useTheme';
import { moderateScale } from '@/lib/responsive-dimensions';
import { showError } from '@/lib/toast';
import { TYPOGRAPHY } from '@/newConstants/fonts';
import { SPACING } from '@/newConstants/spacing';
import { generateOTPMutation } from '@/services/query/auth';
import { ApiError, LoginContainerProps } from '@/types/components/auth/login-container.types';
import { getPhoneValidationError } from '@/utils/validation';
import { ThemedText } from '../common/ThemedText';

const PHONE_NUMBER_LENGTH = 10;
const COUNTRY_CODE = '+91-IND';
const LoginContainer: React.FC<LoginContainerProps> = ({ setIsLogin, onChangeText, value }) => {
  usePushNotifications();
  const textInputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  const { theme } = useTheme();
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
    if (validationError) {
      setValidationError(null);
    }

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
    <View style={styles.footer}>
      <ThemedText variant="bodySmall" color="gray600" style={styles.footerText}>
        By continuing, you agree to Travlounge's{' '}
      </ThemedText>
      <ThemedText
        variant="bodySmallEmphasized"
        onPress={() => openLink('https://www.travlounge.com/terms.html')}
        style={styles.footerText}>
        Terms of use
      </ThemedText>
      <ThemedText variant="bodySmall" color="gray600" style={styles.footerText}>
        {' '}
        and{' '}
      </ThemedText>
      <ThemedText
        variant="bodySmallEmphasized"
        onPress={() => openLink('https://www.travlounge.com/terms.html')}
        style={styles.footerText}>
        Privacy Policy
      </ThemedText>
    </View>
  );

  return (
    <View style={{ alignSelf: 'flex-end' }}>
      <View style={styles.container}>
        <View style={[styles.gradientContainer, { backgroundColor: theme.backgroundCard }, shadow]}>
          <ThemedText color={'gray900'} variant="headlineEmphasized" style={styles.headerText}>
            Login
          </ThemedText>
          <ThemedText color={'gray600'} variant="labelLarge" style={styles.subHeaderText}>
            for the best experience
          </ThemedText>

          <View style={styles.inputContainer}>
            <View
              style={[
                styles.countryCodeContainer,
                { backgroundColor: theme.backgroundPrimary },
                shadow,
              ]}>
              <ThemedText color="primary" variant="labelLarge">
                {COUNTRY_CODE}
              </ThemedText>
              <Entypo name="chevron-down" size={18} color={theme.gray500} />
            </View>

            <TextInput
              ref={textInputRef}
              placeholder="Phone number"
              placeholderTextColor={theme.gray600}
              value={value}
              onChangeText={handlePhoneChange}
              maxLength={PHONE_NUMBER_LENGTH}
              style={[
                styles.phoneNumberInput,
                {
                  color: theme.primary,
                  borderColor: validationError
                    ? theme.errorSystem
                    : isFocused
                      ? theme.primaryDeep
                      : theme.grayBlue,
                  borderWidth: isFocused ? 2 : 1,
                },
              ]}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              keyboardType="number-pad"
            />
          </View>

          <TouchableOpacity
            style={[
              styles.button,
              { backgroundColor: theme.primary },
              isPending && styles.buttonDisabled,
            ]}
            onPress={validateAndHandleLogin}
            activeOpacity={0.7}
            disabled={isPending}>
            {isPending ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <ThemedText variant="bodyLargeEmphasized" color="white">
                Continue
              </ThemedText>
            )}
          </TouchableOpacity>
        </View>
        {renderPrivacyText()}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    gap: moderateScale(20),
    paddingHorizontal: moderateScale(20),
    width: SPACING.screenWidth,
  },
  shadow: {
    width: '100%',
  },
  gradientContainer: {
    borderRadius: moderateScale(21),
    paddingTop: moderateScale(30),
    paddingHorizontal: moderateScale(30),
    paddingBottom: moderateScale(30),
  },
  headerText: {},
  subHeaderText: {
    paddingBottom: moderateScale(24),
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: moderateScale(20),
  },
  countryCodeContainer: {
    width: moderateScale(95),
    borderRadius: moderateScale(5),
    borderColor: '#F3F7FA',
    borderWidth: 1,
    paddingHorizontal: moderateScale(8),
    height: moderateScale(47),
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  phoneNumberInput: {
    borderRadius: moderateScale(5),
    flex: 1,
    marginLeft: moderateScale(10),
    paddingHorizontal: moderateScale(8),
    fontFamily: 'Roboto',
    ...(TYPOGRAPHY.labelLarge as TextStyle),
    height: moderateScale(47),
    paddingLeft: moderateScale(15),
  },
  buttonShadow: {
    width: '100%',
    marginBottom: moderateScale(30),
    borderRadius: moderateScale(10),
    overflow: 'hidden',
  },
  button: {
    borderRadius: moderateScale(10),
    height: moderateScale(48),
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
    marginTop: Platform.OS === 'android' ? moderateScale(3) : 0,
    alignSelf: 'flex-start',
    flexWrap: 'wrap',
  },
  errorText: {
    marginTop: -moderateScale(16),
    marginBottom: moderateScale(16),
    paddingHorizontal: moderateScale(4),
  },
});

export default LoginContainer;
