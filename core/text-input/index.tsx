import React, { useState } from "react";
import {
  ColorValue,
  TextInput as RNTextInput,
  TextInputProps as RNTextInputProps,
  StyleProp,
  TextInputIOSProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";

/**
 * Props for the TextInput component.
 */
export type TextInputProps = {
  /** Type of the text input. */
  type?: "outline" | "filled" | "round" | "underlined" | "normal";

  /** Node to be displayed on the right side of the text input. */
  rightAddon?: React.ReactNode;

  /** Node to be displayed on the left side of the text input. */
  leftAddon?: React.ReactNode;

  /** Background color of the text input. */
  backgroundColor?: string;

  /** Placeholder text for the text input. */
  placeholder?: string;

  /** Color of the placeholder text. */
  placeholderTextColor?: string;

  /** Value of the text input. */
  value?: string;

  /** Callback function to handle text change. */
  onChangeText?: (text: string) => void;

  /** Content type of the text input. */
  textContentType?: TextInputIOSProps["textContentType"];

  /** Custom styles for the text input. */
  style?: StyleProp<TextStyle>;

  /** Keyboard type of the text input. */
  keyboardType?: RNTextInputProps["keyboardType"];

  /** Keyboard appearance of the text input. */
  keyboardAppearance?: TextInputIOSProps["keyboardAppearance"];

  /** Border color of the text input. */
  borderColor?: ColorValue;

  /** Whether the text input is editable. */
  editable?: boolean;

  /** Callback function to handle press events. */
  onPress?: () => void;
};

/**
 * A customizable text input component with various styles and addons.
 *
 * @param {TextInputProps} props - The props for the TextInput component.
 * @returns {JSX.Element} The rendered TextInput component.
 *
 * @example
 * ```tsx
 * import { TextInput } from 'expo-app-modules/ui';
 *
 * const Example = () => {
 *   const [text, setText] = useState('');
 *
 *   return (
 *     <TextInput
 *       type="outline"
 *       placeholder="Enter text"
 *       value={text}
 *       onChangeText={setText}
 *       leftAddon={<Icon name="search" />}
 *       rightAddon={<Icon name="clear" />}
 *     />
 *   );
 * };
 * ```
 */
export const TextInput: React.FC<TextInputProps> = ({
  type = "normal",
  placeholder,
  placeholderTextColor = "#A3A3A3",
  value,
  onChangeText,
  textContentType,
  style,
  rightAddon,
  leftAddon,
  backgroundColor,
  keyboardType,
  keyboardAppearance,
  borderColor = "#D4D4D4",
  editable = true,
  onPress,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const input: ViewStyle = {
    height: isFocused ? (type === "underlined" ? 39 : 38) : 40,
    flex: 1,
  };

  const container: ViewStyle = {
    overflow: "hidden",
    borderRadius: type === "round" ? 1000 : type === "underlined" ? 0 : 8,
    borderWidth:
      type === "underlined" || type === "normal"
        ? undefined
        : isFocused
        ? 2
        : 1,
    borderBottomWidth: type === "underlined" ? (isFocused ? 2 : 1) : undefined,
    borderColor: borderColor,
    gap: 10,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    backgroundColor:
      backgroundColor || (type === "filled" ? "#F5F5F5" : "transparent"),
  };

  return (
    <View style={[container, style]}>
      {leftAddon}
      <RNTextInput
        editable={editable}
        textContentType={textContentType}
        style={[input, style]}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        keyboardAppearance={keyboardAppearance}
        onPress={onPress}
      />
      {rightAddon}
    </View>
  );
};
