import { Platform, StyleSheet, Text, View } from "react-native";
import React, { Children } from "react";
import { Shadow } from "react-native-shadow-2";

const BottomShadow = (props:PropsType) => {
  const {children}=props
  return (
    <Shadow
      containerStyle={
        {backgroundColor:"red", shadowColor:"red", elevation: 20 }
      }
      distance={Platform.OS == "android" ? 7 : 0}
      // {...(Platform.OS == "android" && {
      //   offset: [0, 4],
      //   startColor: `#${000000}55`,
      // })}
    >
      {children}
    </Shadow>
  );
};

export default BottomShadow;

const styles = StyleSheet.create({});
