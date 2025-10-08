import { StyleProp, StyleSheet, Text, View, ViewStyle } from "react-native";
import React from "react";
import { Shadow } from "react-native-shadow-2";
import { LinearGradient } from "expo-linear-gradient";

type PropsType = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  colors?: string[];
  offset?: [number , number ];
  gradientDisabled?: boolean;
};

const Card = (props: PropsType) => {
  const {offset=[0,0], children, style, colors = ["#F3F7FA", "#DDE0E5"] ,gradientDisabled} = props;
  return (
    <Shadow offset={offset} style={styles.shadow}>
     {gradientDisabled?<View style={style}>{children}</View>: <LinearGradient style={style} colors={colors}>
        {children}
      </LinearGradient>
      }
    </Shadow>
  );
};

export default Card;

const styles = StyleSheet.create({
  shadow: {
    width: "100%",
  },
});
