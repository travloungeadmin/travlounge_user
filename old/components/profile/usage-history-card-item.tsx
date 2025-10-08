import { Dimensions, Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Shadow } from "react-native-shadow-2";
import { LinearGradient } from "expo-linear-gradient";
import { constants } from "@/old/constants";
import queryClient from "@/services/query";
import QUERIES_KEY from "@/services/query/query-keys";

const screenWidth = Dimensions.get("window").width;

type propsType = {
  item: any;
};
const UsageHistoryCardItem = (props: propsType) => {
  const { item } = props;

  return (
    <Shadow distance={6}>
      <LinearGradient
        colors={["#F3F7FA", "#DDE0E5"]}
        angle={174}
        style={{
          borderRadius: 6,
          padding: 10,
          flexDirection: "row",
          alignItems: "center",
          width: screenWidth - 60,
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: constants.fontPopM,
              fontSize: 16,
              color: "#00205B",
              marginBottom: Platform.OS === "ios" ? 8 : 0,
            }}
          >
            {item?.package_name}
          </Text>
          <Text
            style={{
              fontFamily: constants.fontPopR,
              fontSize: 12,
              color: "#00205B",
            }}
          >{`Valid until ${item?.expiry_date}`}</Text>
        </View>
        <View>
          <Text
            style={{
              fontFamily: constants.fontPopR,
              fontSize: 12,
              color: "#00205B",
              textAlign: "right",
              marginBottom: Platform.OS === "ios" ? 8 : 0,
            }}
          >
            QR balance
          </Text>
          <Text
            style={{
              fontFamily: constants.fontPopM,
              fontSize: 18,
              color: "#00205B",
              textAlign: "right",
            }}
          >
            {item?.remaining_count}
          </Text>
        </View>
      </LinearGradient>
    </Shadow>
  );
};

export default UsageHistoryCardItem;

const styles = StyleSheet.create({});
