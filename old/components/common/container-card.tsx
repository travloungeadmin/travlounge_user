import { StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { scale } from "@/old/lib/responsive-dimensions";
import { StyleProp } from "react-native";
import { Shadow } from "react-native-shadow-2";

interface Props {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  enableGradient?: boolean;
  gradientColors?: string[];
  gradientStart?: [number, number];
  gradientEnd?: [number, number];
}

const ContainerCard = (props: Props) => {
  const {
    gradientEnd = [1, 1],
    gradientStart = [0, 1],
    children,
    style,
    enableGradient = false,
    gradientColors = ["#F3F7FA", "#DDE0E5"],
  } = props;
  return (
    <Shadow style={{ width: "100%" }}>
      <View style={[styles.container, style]}>
        {enableGradient && (
          <LinearGradient
            end={gradientEnd}
            start={gradientStart}
            colors={gradientColors}
            style={StyleSheet.absoluteFill}
          ></LinearGradient>
        )}
        {children}
      </View>
    </Shadow>
  );
};

export default ContainerCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: scale(6),
    overflow: "hidden",
    borderWidth: scale(1),
    borderColor: "#7070701C",
  },
});
