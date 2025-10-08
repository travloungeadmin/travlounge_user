import {
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Shadow } from "react-native-shadow-2";
import { LinearGradient } from "expo-linear-gradient";
import { constants } from "@/old/constants";
import QUERIES_KEY from "@/services/query/query-keys";
import queryClient from "@/services/query";

const screenWidth = Dimensions.get("window").width;
const RedeemCard = () => {
  const { packages } = queryClient.getQueryData([QUERIES_KEY.PROFILE]);
  return (
    <Shadow distance={8}>
      <LinearGradient
        colors={["#F3F7FA", "#DDE0E5"]}
        style={{
          borderRadius: 6,
          padding: 20,
          flexDirection: "row",
          alignItems: "center",
          width: screenWidth - 40,
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
          >{`${packages?.remaining_count} Coupon`}</Text>
          <Text
            style={{
              fontFamily: constants.fontPopR,
              fontSize: 14,
              color: "#00205B",
            }}
          >
            You have
          </Text>
        </View>

        <Shadow distance={4} offset={[3, 3]}>
          <TouchableOpacity style={{ borderRadius: 10, overflow: "hidden" }}>
            <LinearGradient
              colors={["#B3A6F2", "#9480FE"]}
              style={{
                alignItems: "center",
                paddingVertical: 15,
                paddingHorizontal: 20,
              }}
            >
              <Text
                style={{
                  fontFamily: constants.fontPopM,
                  fontSize: 16,
                  color: "#FBFAFF",
                }}
              >
                Redeem
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </Shadow>
      </LinearGradient>
    </Shadow>
  );
};

export default RedeemCard;

const styles = StyleSheet.create({});
