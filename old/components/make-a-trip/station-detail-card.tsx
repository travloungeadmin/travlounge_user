import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ContainerCard from "../common/container-card";
import GalleryView from "./gallery-view";
import { moderateScale, scale } from "../../lib/responsive-dimensions";
import { distanceAway } from "@/modules/location";

interface PropsType {
  images: string[];
  stopName: string;
  location: string;
  distance: number;
  offers: { id: number; discount: number; description: string }[];
}

const StationDetailCard = (props: PropsType) => {
  const { images, stopName, location, distance, offers = [] } = props;

  return (
    <ContainerCard style={{ width: "100%" }}>
      {images?.length > 0 && <GalleryView images={images} />}
      <View style={{ padding: scale(20), gap: scale(20) }}>
        <View>
          <Text
            style={{
              color: "rgba(0, 32, 91, 1)",
              fontSize: moderateScale(14),
              fontFamily: "Poppins",
              fontWeight: "semibold",
            }}
          >
            {stopName}
          </Text>
          <View style={{ flexDirection: "row" }}>
            <Text
              style={{
                color: "rgba(49, 69, 106, 0.75)",
                fontSize: moderateScale(12),
                fontFamily: "Poppins",
                fontWeight: "regular",
                flex: 1,
              }}
            >
              {location}
            </Text>
            <Text
              style={{
                color: "rgba(49, 69, 106, 0.75)",
                fontSize: moderateScale(12),
                fontFamily: "Poppins",
                fontWeight: "regular",
              }}
            >
              {distanceAway(Math.floor(distance))}
            </Text>
          </View>
        </View>

        {offers.map((item, index) => (
          <View style={{ flexDirection: "row", gap: scale(10) }}>
            <View
              style={{
                marginTop: scale(5),
                height: scale(9),
                width: scale(9),
                borderRadius: scale(9),
                backgroundColor: "rgba(58, 83, 128, 1)",
              }}
            />
            <Text
              numberOfLines={2}
              style={{
                color: "rgba(0, 32, 91, 0.75)",
                fontFamily: "Poppins",
                fontSize: moderateScale(13),
                fontWeight: "regular",
              }}
            >
              {/* <Text
                style={{
                  color: "rgba(0, 32, 91, 0.75)",
                  fontFamily: "Poppins",
                  fontSize: moderateScale(16),
                  fontWeight: "bold",
                }}
              >
                10%
              </Text> */}
              {item.description}
            </Text>
          </View>
        ))}
      </View>
    </ContainerCard>
  );
};

export default StationDetailCard;

const styles = StyleSheet.create({});
