import { ImageBackground, Pressable, StyleSheet } from "react-native";
import React from "react";
import { shadow } from "@/constants";
import { Device, Text } from "@/core";
import { colors } from "@/theme";

const MenuCard = () => {
  return (
    <Pressable
      style={[
        {
          marginHorizontal: 16,
          marginBottom: 30,
          borderRadius: 8,
          backgroundColor: colors.cardBackgroundPrimary,
        },
        shadow,
      ]}
    >
      <ImageBackground
        source={require("@/assets/images/menu-background.png")}
        style={{
          width: Device.width - 32,
          height: (Device.width - 32) * 0.36,

          alignItems: "center",
          flexDirection: "row",
          justifyContent: "space-between",
          paddingRight: 20,
        }}
      >
        <Text
          style={{ marginLeft: (Device.width - 32) * 0.253 }}
          color={colors.textPrimary}
          preset="POP_16_SB"
        >
          Explore The {"\n"}Greatest Taste
        </Text>
        <Text style={{}} color={colors.textSecondary} preset="POP_16_SB">
          View Menu
        </Text>
      </ImageBackground>
    </Pressable>
  );
};

export default MenuCard;

const styles = StyleSheet.create({});
