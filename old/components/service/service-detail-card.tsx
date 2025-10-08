import { StyleSheet } from "react-native";
import React from "react";
import { Box, Device, Row, Text } from "@/core";
import { useTheme } from "@/old/lib/theme";
import Icon from "../ui/icon";
import {
  Extrapolation,
  interpolate,
  useSharedValue,
} from "react-native-reanimated";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";

import { Image } from "expo-image";
import { Pagination } from "@/lib/carousel";
import { shadow } from "@/old/constants";

type propsType = {
  description: string;
  location: string;
  name: string;
  rating: number;
  images: string[];
};

const ServiceDetailCard = (props: propsType) => {
  const { description, location, name, rating = 5, images } = props;
  const { theme } = useTheme();
  const scrollOffsetValue = useSharedValue(0);

  const imageWidth = Device.width - 32;
  const imageHeight = 332;
  return (
    <Box
      style={[
        shadow,
        {
          borderRadius: 8,
          overflow: "hidden",
          margin: 16,
          backgroundColor: theme.backgroundSecondary,
        },
      ]}
    >
      <Box style={{ height: 332, width: imageWidth }}>
        <Carousel
          // loop={true}
          width={imageWidth}
          height={imageHeight}
          snapEnabled={true}
          pagingEnabled={true}
          autoPlayInterval={2000}
          data={images}
          defaultScrollOffsetValue={scrollOffsetValue}
          style={{ width: "100%" }}
          onScrollStart={() => {
            console.log("Scroll start");
          }}
          onScrollEnd={() => {
            console.log("Scroll end");
          }}
          onConfigurePanGesture={(g: { enabled: (arg0: boolean) => any }) => {
            "worklet";
            g.enabled(false);
          }}
          onSnapToItem={(index: number) => console.log("current index:", index)}
          renderItem={({ item }) => {
            console.log("item", item);

            return (
              <Image
                source={{ uri: `https://admin.calicutheroes.com${item.image}` }}
                style={{ width: imageWidth, height: imageHeight }}
              />
            );
          }}
        />
        {/* <Pagination.Basic<{ color: string }>
          progress={scrollOffsetValue}
          data={[1, 2]}
          size={20}
          dotStyle={{
            borderRadius: 100,
            backgroundColor: 'green',
          }}
          activeDotStyle={{
            borderRadius: 100,
            overflow: 'hidden',
            backgroundColor: 'red',
          }}
          containerStyle={[
            {
              zIndex: 9,
              position: 'absolute',
              gap: 5,
              marginBottom: 10,
            },
          ]}
          horizontal
          //   onPress={onPressPagination}
        /> */}
      </Box>
      <Box style={{ padding: 16, paddingTop: 20 }}>
        <Text preset="POP_16_SB" color={theme.textPrimary}>
          {name}
        </Text>
        <Row style={{ justifyContent: "space-between", alignItems: "center" }}>
          <Text color={theme.textPrimary} preset="POP_14_M">
            {location}
          </Text>
          <Row style={{ alignItems: "center", gap: 5 }}>
            <Icon name="Star" size={12} fill={theme.IconSecondary} />
            <Text color={theme.textPrimary} preset="POP_14_R">
              {rating}
            </Text>
          </Row>
        </Row>
        <Text
          preset="POP_12_R"
          color={theme.textPrimary}
          style={{ paddingTop: 16 }}
        >
          {description}
        </Text>
      </Box>
    </Box>
  );
};

export default ServiceDetailCard;

const styles = StyleSheet.create({});
