import { TextStyle, ViewStyle } from 'react-native';

export interface LoginContainerProps {
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  value: string;
  onChangeText: React.Dispatch<React.SetStateAction<string>>;
}

export interface StyleProps {
  container: ViewStyle;
  shadow: ViewStyle;
  gradientContainer: ViewStyle;
  headerText: TextStyle;
  subHeaderText: TextStyle;
  inputContainer: ViewStyle;
  countryCodeContainer: ViewStyle;
  phoneNumberInput: TextStyle;
  buttonShadow: ViewStyle;
  button: ViewStyle;
  buttonDisabled: ViewStyle;
  footer: ViewStyle;
  footerText: TextStyle;
  normalText: TextStyle;
  linkText: TextStyle;
  errorText: TextStyle;
}

export interface ApiError extends Error {
  response?: {
    data?: {
      message?: string;
    };
  };
}
