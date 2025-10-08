import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Icon from "../ui/icon";
import { moderateScale, scale } from "@/old/lib/responsive-dimensions";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, FONTS } from "@/old/constants";
import { router } from "expo-router";
import useUserStore from "@/modules/user";

const MakeATripHeader = () => {
  const { place, subPlace } = useUserStore();
  return (
    <SafeAreaView
      edges={["top"]}
      style={{
        paddingHorizontal: scale(15),
        paddingVertical: scale(10),
        flexDirection: "row",

        justifyContent: "space-between",
        width: "100%",
      }}
    >
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: scale(5),
          }}
        >
          <Icon fill="#253d8f" name="Pin" size={moderateScale(12)} />
          <Text
            style={{
              fontFamily: "Poppins",
              fontSize: moderateScale(14),
              fontWeight: "medium",
              color: "#253D8F",
            }}
          >
            {place}
          </Text>
        </View>
        <Text
          style={{
            color: "#253D8F",
            fontFamily: "Poppins",
            fontSize: moderateScale(12),
            fontWeight: "regular",
          }}
        >
          {subPlace}
        </Text>
      </View>
      <View style={{ flexDirection: "row", gap: scale(25) }}>
        <Icon name="Notification" size={moderateScale(25)} />
        <Icon name="Settings" size={moderateScale(25)} />
        <Pressable
          onPress={() =>
            router.navigate({
              pathname: "/old/profile",
            })
          }
        >
          <Icon name="User" size={moderateScale(25)} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default MakeATripHeader;

const styles = StyleSheet.create({});
