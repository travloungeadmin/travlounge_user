import { Pressable as RNPressable, PressableProps } from "react-native";
import React from "react";

export const Pressable = (props: PressableProps) => {
  return <RNPressable {...props} />;
};
