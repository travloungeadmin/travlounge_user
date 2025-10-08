import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { scale } from "../../lib/responsive-dimensions";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

import useSearchStore from "@/modules/search";
import ContainerCard from "@/old/components/common/container-card";
import { Image } from "expo-image";
import MapViewDirections from "react-native-maps-directions";
import { getRouteStationListMutation } from "@/services/query/make-a-trip";

const MapViewCard = (props) => {
  const { onPress } = props;
  const cameraRef = React.useRef<Camera>(null);

  const { toPlace, fromPlace } = useSearchStore();
  const { mutate, data: loungesList } = getRouteStationListMutation();

  React.useEffect(() => {
    if (toPlace) {
      const markerLocation = {
        latitude: toPlace?.coordinates.latitude,
        longitude: toPlace?.coordinates.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };
      cameraRef.current.animateToRegion(markerLocation, 1000);
    }
  }, [toPlace]);
  React.useEffect(() => {
    if (fromPlace) {
      const markerLocation = {
        latitude: fromPlace?.coordinates.latitude,
        longitude: fromPlace?.coordinates.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      };
      cameraRef.current.animateToRegion(markerLocation, 1000);
    }
  }, [fromPlace]);

  React.useEffect(() => {
    if (toPlace && fromPlace) {
      mutate({
        lat_from: fromPlace?.coordinates?.latitude,
        lon_from: fromPlace?.coordinates?.longitude,
        lat_to: toPlace?.coordinates?.latitude,
        lon_to: toPlace?.coordinates?.longitude,
      });
    }
  }, [toPlace, fromPlace]);

  return (
    <ContainerCard>
      <View
        style={{
          height: scale(315),
          width: scale(330),
          borderRadius: scale(6),
          overflow: "hidden",
        }}
      >
        <MapView
          provider={PROVIDER_GOOGLE}
          ref={cameraRef}
          cameraZoomRange={{
            minCenterCoordinateDistance: 1000,
            maxCenterCoordinateDistance: 100000,
            animated: true,
          }}
          showsMyLocationButton
          showsUserLocation
          followsUserLocation
          style={StyleSheet.absoluteFill}
        >
          {fromPlace && (
            <Marker
              focusable
              coordinate={{
                latitude: fromPlace?.coordinates.latitude,
                longitude: fromPlace?.coordinates.longitude,
              }}
            />
          )}
          {toPlace && (
            <Marker
              focusable
              coordinate={{
                latitude: toPlace?.coordinates.latitude,
                longitude: toPlace?.coordinates.longitude,
              }}
            />
          )}
          {loungesList &&
            loungesList.map((item) => (
              <Marker
                onPress={() => {
                  onPress(item.id);
                }}
                coordinate={{
                  latitude: item.latitude,
                  longitude: item.longitude,
                }}
              >
                <Image
                  source={require("@/old/assets/images/pin.png")}
                  style={{ height: 50, width: 50 }}
                />
              </Marker>
            ))}
          {fromPlace && toPlace && (
            <MapViewDirections
              origin={fromPlace?.coordinates}
              destination={toPlace?.coordinates}
              strokeWidth={5}
              strokeColor="#0096FF"
              apikey={process.env.EXPO_PUBLIC_MAP_KEY_ID || ""}
            />
          )}
        </MapView>
      </View>
    </ContainerCard>
  );
};

export default MapViewCard;

const styles = StyleSheet.create({});
