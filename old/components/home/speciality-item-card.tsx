import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";

import { Image } from "expo-image";
import { constants, shadow } from "@/old/constants";
import { BlurView } from "expo-blur";

const windowWidth = Dimensions.get("window").width;

const SpecialityItemCard = ({ item }) => {
  const cardHeight = windowWidth * 0.85 + 15 + windowWidth * 0.6 * 0.85;

  return (
    <View style={{ flex: 1 }}>
      <Image
        source={{
          uri: item.image,
        }}
        contentFit="cover"
        style={styles.image}
      />

      <View style={{ flex: 1 }}>
        <View
          style={[
            {
              // backgroundColor: 'rgba(255, 255, 255, 1)',
              marginTop: -100,
              margin: 45,
              borderRadius: 10,
              flex: 1,
            },
            shadow,
          ]}
        >
          <BlurView
            experimentalBlurMethod="dimezisBlurView"
            // intensity={20}
            style={[
              {
                width: windowWidth * 0.75 - 60,
                borderRadius: 10,
                padding: 20,
                flex: 1,
                borderColor: "#FFFFFFA6",
                borderWidth: 1,
                overflow: "hidden",
              },
            ]}
          >
            <Text style={styles.serviceName}>{item.service_name}</Text>
            <Text style={styles.description}>{item.description}</Text>
          </BlurView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: windowWidth * 0.75,
    height: windowWidth * 0.85,
    margin: 15,
    borderRadius: 10,
    alignItems: "center",
    zIndex: -1,
  },

  serviceName: {
    fontSize: 17,
    fontFamily: constants.fontPopSB,
    color: "#31456A",
    marginBottom: 15,
  },
  description: {
    fontSize: 13,
    fontFamily: constants.fontPopR,
    color: "#31456A",
  },
});

export default SpecialityItemCard;
