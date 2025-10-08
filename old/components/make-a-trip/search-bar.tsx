import { StyleSheet, TextInput, View } from "react-native";
import React from "react";
import { scale } from "@/old/lib/responsive-dimensions";
import { router } from "expo-router";
import Icon from "@/components/ui/icon";
import useSearchStore from "@/modules/search";
import { Device } from "@/old/lib/device";
import { LinearGradient } from "expo-linear-gradient";

const SearchBar = () => {
  const { toPlace, fromPlace } = useSearchStore();

  return (
    <View
      style={{
        marginTop: scale(20),
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <TextInput
        value={fromPlace?.name}
        onPress={() =>
          router.navigate({
            pathname: "/old/search",
            params: {
              isFrom: true,
            },
          })
        }
        style={{
          borderWidth: 1,
          height: scale(43),
          width: (Device.width - scale(45)) / 2,
          borderColor: "#8A95BB",
          backgroundColor: "#F1F5F8",
          borderRadius: scale(7),
          padding: scale(15),
        }}
        placeholder="From"
      />
      <TextInput
        onPress={() =>
          router.navigate({
            pathname: "/old/search",
            params: {
              isFrom: false,
            },
          })
        }
        value={toPlace?.name}
        style={{
          borderWidth: 1,
          height: scale(43),
          width: (Device.width - scale(45)) / 2,
          borderColor: "#8A95BB",
          backgroundColor: "#F1F5F8",
          borderRadius: scale(7),
          padding: scale(15),
        }}
        placeholder="To"
      />
      <LinearGradient
        colors={["#B5C4FF", "#6D8AFC"]}
        style={{
          marginLeft: (Device.width - scale(45)) / 2 - scale(5),
          alignSelf: "center",
          position: "absolute",
          height: scale(25),
          width: scale(25),
          borderRadius: scale(7),
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Icon stroke="#fff" name="ArrowRight" size={15} />
      </LinearGradient>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({});
