import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { colors, constants } from "@/old/constants";

const OtpContainer = ({ value, setValue }) => {
  const otpRef = React.useRef<TextInput>(null);

  const [isContainerFocused, setIsContainerFocused] = useState(false);

  const codeDigitArray = new Array(4).fill(0);

  const handleOnPress = () => {
    otpRef.current.focus();
    setIsContainerFocused(true);
  };

  const toCodeDigitInput = (_value, index) => {
    const emptyInputChar = "";
    const digit = value[index] || emptyInputChar;

    const isCurrentDigit = index === value.length;
    const isLastDigit = index === value.length - 1;
    const isCodeFill = value.length === 4;

    const isDigitFocused = isCurrentDigit || (isLastDigit && isCodeFill);
    const isFocused = isContainerFocused && isDigitFocused;
    return (
      <Pressable
        onPress={handleOnPress}
        key={index}
        style={{
          height: 47,
          width: 55,
          borderRadius: 5,
          borderWidth: isFocused ? 2 : 1,
          justifyContent: "center",
          alignItems: "center",
          borderColor: isFocused ? "#00205B" : "#8A95BB",
        }}
      >
        <Text
          style={{
            color: colors.font_color2,
            fontFamily: constants.fontRobM,
            fontSize: 14,
          }}
        >
          {digit}
        </Text>
      </Pressable>
    );
  };
  return (
    <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>
      {codeDigitArray.map(toCodeDigitInput)}
      <TextInput
        ref={otpRef}
        style={{
          width: "100%",
          height: "100%",
          opacity: 0,
          position: "absolute",
        }}
        onBlur={() => setIsContainerFocused(false)}
        onFocus={() => setIsContainerFocused(true)}
        keyboardType="number-pad"
        maxLength={4}
        onChangeText={(text) => setValue(text)}
        value={value}
      />
    </View>
  );
};

export default OtpContainer;

const styles = StyleSheet.create({});
