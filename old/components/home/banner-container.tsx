
import React from "react";
import { StyleSheet, View, Animated, FlatList, Dimensions } from "react-native";
import ShadowView from "../common/shadow-view";
import { Box, Image } from "@/core";
import { shadow } from "@/old/constants";
import { colors } from "@/theme";

const screenWidth = Dimensions.get("window").width;

const Indicator = ({ scrollx, data }) => {
  return (
    <View style={styles.indicatorContainer}>
      {data?.map((_, i) => {
        const inputRange = [
          (i - 1) * screenWidth,
          i * screenWidth,
          (i + 1) * screenWidth,
        ];
        const scale = scrollx.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: "clamp",
        });

        return (
          <Animated.View
            key={`indicator-${i}`}
            style={[styles.indicatorDot, { width: scale, height: 10 }]}
          ></Animated.View>
        );
      })}
    </View>
  );
};

const BannerContainer = (props) => {
  const { banners, } = props;
  const scrollx = React.useRef(new Animated.Value(0)).current;
  const flatListRef = React.useRef(null);

  const BannerCard = ({ item }) => {
    return (
      <Box style={{ width: screenWidth, padding: 16, paddingBottom: 20 }}>
        <Box
          style={[
            shadow,
            {
              backgroundColor: colors.cardBackgroundPrimary,
              borderRadius: 10,
              shadowColor: "#717eff",
              shadowRadius: 5,
              shadowOffset: { height: 10, width: 0 },
            },
          ]}
        >
          <Image
            source={
              require("@/assets/images/banner-1.jpeg")
            }
            // source={{ uri: item.image }}
            style={{ height: screenWidth * 0.51, borderRadius: 10 }}
            contentFit="cover"
            priority="high"
          />
        </Box>
      </Box>
    );
  };

  return (
    <View>
      <FlatList
        data={banners}
        ref={flatListRef}
        scrollEventThrottle={32}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollx } } }],
          {
            useNativeDriver: false,
          }
        )}
        renderItem={({ item }) => <BannerCard item={item} />}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      />
   {banners?.length>1&&   <Indicator data={banners} scrollx={scrollx} />}
    </View>
  );
};

const styles = StyleSheet.create({
  indicatorContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 25,
    left: 30,
  },
  indicatorDot: {
    height: 10,
    width: 10,
    backgroundColor: "#FFF",
    margin: 4,
    borderRadius: 5,
  },
});

export default BannerContainer;
