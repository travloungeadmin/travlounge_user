import { StyleSheet, View } from "react-native";
import React from "react";
import { scale } from "@/old/lib/responsive-dimensions";

import useSearchStore from "@/modules/search";
import { router, useLocalSearchParams } from "expo-router";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const Search = () => {
  const { isFrom } = useLocalSearchParams();

  const { updateFromPlace, updateToPlace, fromPlace, toPlace } =
    useSearchStore();

  return (
    <View style={{ padding: 20, flex: 1 }}>
      <GooglePlacesAutocomplete
        fetchDetails={true}
        placeholder="Search"
        styles={{
          textInput: {
            borderWidth: 1,
            height: scale(43),
            width: "100%",
            borderColor: "#8A95BB",
            backgroundColor: "#F1F5F8",
            borderRadius: scale(7),
            padding: scale(15),
          },
        }}
        onPress={(data, details = null) => {
          if (isFrom === "true") {
            updateFromPlace({
              name: data.description,
              coordinates: {
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              },
            });
          } else {
            updateToPlace({
              name: data.description,
              coordinates: {
                latitude: details.geometry.location.lat,
                longitude: details.geometry.location.lng,
              },
            });
          }
          router.back();
        }}
        query={{
          key: process.env.EXPO_PUBLIC_MAP_KEY_ID,
          language: "in",
        }}
      />
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
