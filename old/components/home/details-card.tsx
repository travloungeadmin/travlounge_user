import { StyleSheet, Text, View } from "react-native";
import React from "react";

import { AnimatedCircularProgress } from "react-native-circular-progress";
import { Image } from "expo-image";
import { constants } from "@/old/constants";
import queryClient from "@/services/query";
import QUERIES_KEY from "@/services/query/query-keys";
import { getCurrentGreeting } from "@/modules/home";
import { green } from "react-native-reanimated/lib/typescript/Colors";
// import queryClient from "../services/query";
// import QUERIES_KEY from "../services/query/query-keys";

const DetailsCard = () => {
  const data = queryClient.getQueryData([QUERIES_KEY.HOME]);

  const fillCount =
    (data?.subscription_data?.remaining_count /
      data?.subscription_data?.total_count) *
    100;
  return (
    <View
      style={styles.container}
    >
      <View
        style={styles.wrapper}
      >
        <Image
          source={require("@/old/assets/images/weatherMoistlySunny.png")}
          style={styles.image}
        />
        <View>
          <Text
            style={styles.greeting}
          >
            {getCurrentGreeting()},{" "}
          </Text>
          <Text
            style={styles.name}
          >
            {data?.user?.user_name}
          </Text>
          <Text
            style={styles.weather}
          >
            Mostly sunny, 32°C/90°C
          </Text>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginBottom: -20,
          paddingHorizontal: 30,
          justifyContent: "space-between",
        }}
      >
        <View>
          <Text
            style={{
              fontFamily: constants.fontPopSB,
              fontSize: 17,
              color: "#00205B",
            }}
          >
            {data?.subscription_data?.package_name || "No Package Subscribed"}
          </Text>
          <Text
            style={{
              fontFamily: constants.fontPopR,
              fontSize: 12,
              color: "#00205B",
            }}
          >
            {data?.subscription_data?.remaining_count > 0
              ? `${data?.subscription_data?.remaining_count} Usage, ${
                  data?.subscription_data?.expiry_date || 0
                }`
              : "No Usage"}
            {/* {`${data?subscription_data?.remaining_count} Usage, ${data?.subscription_data?.expiry_date || 0}`} */}
          </Text>
        </View>
        <View
          style={styles.circleContainer}
        >
          <AnimatedCircularProgress
            size={100}
            width={8}
            fill={fillCount}
            tintColor="#7E97FE"
            backgroundColor="#E0E6FF"
            rotation={0}
          >
            {(fill) => (
              <Image
                source={require("@/old/assets/images/sampleQr.png")}
                style={styles.qr}
              />
            )}
          </AnimatedCircularProgress>
        </View>
      </View>
    </View>
  );
};

export default DetailsCard;

const styles = StyleSheet.create({
  container:{
    borderWidth: 1,
    borderColor: "#7E98FF",
    borderRadius: 8,
    margin: 15,
    marginBottom: 40,
  },wrapper:{
    flexDirection: "row",
    marginHorizontal: 15,
    alignItems: "center",
    marginTop: 10,
  },image:{ height: 100, width: 100 },
greeting:{
  fontFamily: constants.fontPopM,
  fontSize: 14,
  color: "#00205B",
},name:{
  fontFamily: constants.fontPopB,
  fontSize: 21,
  color: "#00205B",
},weather:{
  fontFamily: constants.fontPopR,
  fontSize: 12,
  color: "#00205B",
},qr:{ height: 60, width: 60 },

circleContainer:{
  backgroundColor: "#EDF1F3",
  padding: 5,
  borderRadius: 100,
  borderWidth: 2,
  borderColor: "#FFF",
}



});
