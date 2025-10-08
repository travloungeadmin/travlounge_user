import { ImageBackground, Pressable, StyleSheet } from "react-native";
import React from "react";
import { shadow } from "@/old/constants";
import { Device, Text } from "@/core";

const MenuCard = () => {
  return (
    <Pressable
      style={[
        {
          marginHorizontal: 16,
          marginBottom: 30,
          borderRadius: 8,
          backgroundColor: "#fff",
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
          color="#333333"
          preset="POP_16_SB"
        >
          Explore The {"\n"}Greatest Taste
        </Text>
        <Text style={{}} color="#253D8F" preset="POP_16_SB">
          View Menu
        </Text>
      </ImageBackground>
    </Pressable>
  );
};

export default MenuCard;

const styles = StyleSheet.create({});
