import { StyleSheet, View } from "react-native";
import React from "react";
import MapViewCard from "./map-view-card";
import StationCard from "./station-card";
import { router } from "expo-router";
import { getLoungeDetailsQuery } from "@/services/query/make-a-trip";
import useUserStore from "@/modules/user";

const MapListContainer = () => {
  const { data, mutate } = getLoungeDetailsQuery();
  const { latitude, longitude } = useUserStore();
  return (
    <View style={{ gap: 20 }}>
      <MapViewCard
        onPress={(id) => {
          mutate({
            id: id,
            latitude,
            longitude,
          });
        }}
      />
      {data && (
        <StationCard
          image={data[0].listing.image}
          distance={data[0].distance}
          description={data[0].offers[0]?.description}
          location={data[0].listing.place}
          stationName={data[0].listing.contact_name}
          offersCount={data[0].offers.length}
          onPress={() => {
            router.navigate({
              pathname: "/old/stop-details",
              params: { data: JSON.stringify(data[0]) },
            });
          }}
        />
      )}
    </View>
  );
};

export default MapListContainer;

const styles = StyleSheet.create({});
