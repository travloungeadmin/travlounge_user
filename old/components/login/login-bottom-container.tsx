import { colors, constants } from '@/old/constants';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Shadow } from 'react-native-shadow-2';
// import languages from '@/constants/languages';
import { showError, showSuccess } from '@/lib/toast';
import Card from '@/old/components/ui/card';
import { generateOTPMutation } from '@/services/query/auth';
import { Entypo } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';

type PropsType = {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  value: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
};

const LoginBottomContainer = (props: PropsType) => {
  const textInputRef = React.useRef<TextInput>(null);
  const { setIsLogin, onChangeText, value } = props;
  const [isFocused, setIsFocused] = React.useState(false);
  const { isPending, mutate } = generateOTPMutation();
  const handleLogin = () => {
    textInputRef.current?.blur();
    if (value.length !== 10) {
      showError('Error', 'Please enter a valid phone number');
      return;
    }
    const formData = new FormData();
    formData.append('mobile_number', value);
    mutate(formData, {
      onSuccess: (data) => {
        showSuccess('Success', `OTP delivered! Please enter it to proceed.`, 3000);
        setIsLogin(false);
      },
    });
  };

  const openLink = async (url: string) => {
    if (!url) {
      showError('Error', 'Invalid URL');
    }
    await WebBrowser.openBrowserAsync(url);
  };

  return (
    <View style={{ gap: 20, paddingHorizontal: 20 }}>
      <Card style={styles.gradientContainer}>
        <Text style={styles.headerText}>Login</Text>
        <Text style={styles.subHeaderText}>for the best experience</Text>
        <View style={styles.inputContainer}>
          <Card offset={[3, 3]} style={styles.countryCodeContainer}>
            <Text style={styles.countryCodeText}>+91-IND</Text>
            <Entypo name="chevron-down" size={18} color={colors.font_color2} />
          </Card>
          <TextInput
            ref={textInputRef}
            placeholder="Phone number"
            placeholderTextColor={colors.font_color2}
            value={value}
            onChangeText={onChangeText}
            maxLength={10}
            style={[
              styles.phoneNumberInput,
              {
                borderColor: isFocused ? '#00205B' : '#8A95BB',
                borderWidth: isFocused ? 2 : 1,
              },
            ]}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            keyboardType="number-pad"
          />
        </View>
        <Shadow distance={4} offset={[3, 3]} style={styles.buttonShadow}>
          <TouchableOpacity onPress={handleLogin} activeOpacity={0.7}>
            <LinearGradient style={styles.button} colors={['#6D8AFC', '#B5C4FF']}>
              {isPending ? (
                <ActivityIndicator color={'#fff'} />
              ) : (
                <Text style={styles.buttonText}>Continue</Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </Shadow>
      </Card>
      <View style={styles.footer}>
        <Text style={styles.footerText}>By continuing, you agree to Travlounge's </Text>
        <Text
          onPress={() => openLink('https://www.travlounge.com/terms.html')}
          style={[styles.footerText, styles.linkText]}>
          Terms of use
        </Text>
        <Text style={styles.footerText}> and </Text>
        <Text
          onPress={() => openLink('https://www.travlounge.com/terms.html')}
          style={[styles.footerText, styles.linkText]}>
          Privacy Policy
        </Text>
      </View>
    </View>
  );
};

export default LoginBottomContainer;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    left: 0,
    paddingHorizontal: 20,
    gap: 20,
  },
  shadow: {
    width: '100%',
  },
  gradientContainer: {
    borderRadius: 21,
    paddingTop: 55,
    paddingHorizontal: 30,
  },
  headerText: {
    color: colors.font_color,
    fontSize: 28,
    fontFamily: constants.fontPopB,
    width: '100%',
    alignSelf: 'flex-start',
    lineHeight: 38,
  },
  subHeaderText: {
    color: colors.font_color,
    fontSize: 14,
    fontFamily: constants.fontPopM,
    alignSelf: 'flex-start',
    paddingBottom: 34,
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  countryCodeContainer: {
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
  countryCodeText: {
    color: colors.font_color2,
    fontFamily: constants.fontRobM,
    fontSize: 14,
  },
  phoneNumberInput: {
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
    paddingHorizontal: 8,
    color: colors.font_color2,
    fontFamily: constants.fontRobM,
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
    borderRadius: 10,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  buttonText: {
    color: colors.white,
    fontFamily: constants.fontPopM,
    fontSize: 16,
  },
  footer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  footerText: {
    color: colors.font_color2,
    fontSize: 12,
    fontFamily: constants.fontPopR,
    marginTop: Platform.OS === 'android' ? 3 : 0,
    alignSelf: 'flex-start',
    flexWrap: 'wrap',
  },
  linkText: {
    color: '#002DBC',
    fontFamily: constants.fontPopM,
  },
});
