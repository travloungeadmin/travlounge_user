import { Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { moderateScale, scale } from "../../lib/responsive-dimensions";
import { Image } from "expo-image";
import ContainerCard from "../common/container-card";
import { distanceAway } from "@/modules/location";

interface Props {
  image: string;
  stationName: string;
  location: string;
  distance: number;
  description: string;
  offersCount: number;
  onPress?: () => void;
}

const StationCard = (props: Props) => {
  const {
    image,
    stationName,
    location,
    distance,
    description,
    offersCount,
    onPress,
  } = props;
  const offers = offersCount !== 0;

  return (
    <ContainerCard style={{ width: "100%" }}>
      <View style={styles.cardContainer}>
        <Image
          contentFit="cover"
          source={
            image?.length > 0
              ? image[0]
              : require("@/assets/images/no-image.jpg")
          }
          style={[
            styles.image,
            !offers && {
              height: scale(56),
            },
          ]}
        />
        <View style={[styles.infoContainer]}>
          <View
            style={
              !offers && {
                justifyContent: "center",
                flex: 1,
                gap: scale(5),
              }
            }
          >
            <Text numberOfLines={1} style={styles.stationName}>
              {stationName}
            </Text>
            <View style={styles.locationContainer}>
              <Text numberOfLines={1} style={styles.locationText}>
                {location}
              </Text>
              <Text numberOfLines={1} style={styles.distanceText}>
                {distanceAway(Math.floor(distance))}
              </Text>
            </View>
          </View>
          {offers && (
            <>
              <Text style={styles.description}>
                {/* <Text style={styles.discountText}>10% </Text> */}
                {description}
              </Text>
              <View style={styles.offersContainer}>
                {offers && (
                  <>
                    <Text style={styles.offersText}>
                      {offersCount > 1 ? `${offersCount - 1}offers more` : ""}
                    </Text>
                    <Pressable onPress={onPress}>
                      <Text style={styles.viewAllText}>View all</Text>
                    </Pressable>
                  </>
                )}
              </View>
            </>
          )}
        </View>
      </View>
    </ContainerCard>
  );
};

export default StationCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: "100%",
    flexDirection: "row",
  },
  image: {
    margin: scale(8),
    width: scale(95),
    height: scale(123),
    marginRight: 0,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "space-between",
    padding: scale(10),
  },
  stationName: {
    color: "#00205B",
    fontFamily: "Poppins",
    fontSize: moderateScale(14),
    fontWeight: "semibold",
  },
  locationContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  locationText: {
    flex: 1,
    color: "#31456A",
    fontFamily: "Poppins",
    fontSize: moderateScale(12),
    fontWeight: "regular",
  },
  distanceText: {
    color: "#31456A",
    fontFamily: "Poppins",
    fontSize: moderateScale(12),
    fontWeight: "regular",
  },
  description: {
    color: "#00205B",
    fontFamily: "Poppins",
    fontSize: moderateScale(12),
    fontWeight: "regular",
  },
  discountText: {
    color: "#00205B",
    fontFamily: "Poppins",
    fontSize: moderateScale(16),
    fontWeight: "bold",
  },
  offersContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },
  offersText: {
    color: "#00205B",
    fontFamily: "Poppins",
    fontSize: moderateScale(14),
    fontWeight: "regular",
  },
  viewAllText: {
    color: "#00205B",
    fontFamily: "Poppins",
    fontSize: moderateScale(14),
    fontWeight: "bold",
  },
});
