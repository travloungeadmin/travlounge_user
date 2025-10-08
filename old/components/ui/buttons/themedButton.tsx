import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Shadow } from "react-native-shadow-2";
import { LinearGradient } from "expo-linear-gradient";

const ThemedButton = (props) => {
  const { children, colors = ["#6D8AFC", "#B5C4FF"], style } = props;
  return (
    <Shadow distance={4} offset={[3, 3]} style={[styles.shadow,style]}>
      <LinearGradient  colors={colors}>
        <Pressable style={style}>{children}</Pressable>

      </LinearGradient>
    </Shadow>
  );
};

export default ThemedButton;

const styles = StyleSheet.create({
  shadow: { width: "100%" },
});
