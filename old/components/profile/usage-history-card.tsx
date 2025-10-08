import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Shadow } from "react-native-shadow-2";

import { constants } from "@/old/constants";
import { LinearGradient } from "expo-linear-gradient";
import UsageHistoryCardItem from "./usage-history-card-item";

const screenWidth = Dimensions.get("window").width;

type propsType = {
  packages: any;
};

const UsageHistoryCard = (props: propsType) => {
  const { packages } = props;
  return (
    <Shadow distance={8}>
      <LinearGradient
        colors={["#F3F7FA", "#DDE0E5"]}
        angle={139}
        style={{
          width: screenWidth - 40,
          borderRadius: 6,
          alignItems: "center",
          gap: 10,
        }}
      >
        {/* <View style={{ paddingVertical: 20, paddingHorizontal: 10, gap: 20 }}>
          <UsageHistoryCardItem />

          <Shadow distance={4} offset={[3, 3]}>
            <TouchableOpacity style={{ borderRadius: 10, overflow: 'hidden' }}>
              <LinearGradient colors={['#6D8AFC', '#B5C4FF']} angle={358} style={{ width: screenWidth - 60, alignItems: 'center', paddingVertical: 15 }}>
                <Text style={{ fontFamily: constants.fontPopM, fontSize: 16, color: '#FBFAFF' }}>Usage history</Text>
              </LinearGradient>
            </TouchableOpacity>
          </Shadow>
        </View> */}
        <FlatList
          data={[packages]}
          renderItem={({ item }) => (
            <View style={{ paddingVertical: 5, paddingHorizontal: 10 }}>
              <UsageHistoryCardItem item={item} />
            </View>
          )}
          ListHeaderComponent={() => <View style={{ marginTop: 15 }} />}
          ListFooterComponent={() => (
            <View style={{ paddingHorizontal: 10, marginVertical: 20 }}>
              <Shadow distance={4} offset={[3, 3]}>
                <TouchableOpacity
                  style={{ borderRadius: 10, overflow: "hidden" }}
                >
                  <LinearGradient
                    colors={["#6D8AFC", "#B5C4FF"]}
                    angle={358}
                    style={{
                      width: screenWidth - 60,
                      alignItems: "center",
                      paddingVertical: 15,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: constants.fontPopM,
                        fontSize: 16,
                        color: "#FBFAFF",
                      }}
                    >
                      Usage history
                    </Text>
                  </LinearGradient>
                </TouchableOpacity>
              </Shadow>
            </View>
          )}
        />
      </LinearGradient>
    </Shadow>
  );
};

export default UsageHistoryCard;

const styles = StyleSheet.create({});
