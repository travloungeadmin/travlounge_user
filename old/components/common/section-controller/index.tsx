import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { scale } from "@/lib/responsive-dimensions";
import StationCard from "@/components/make-a-trip/station-card";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  getLoungesCategoryQuery,
  getLoungesListQuery,
} from "@/services/query/make-a-trip";
import DropList from "@/components/droplist";
import SelectionButtonContainer from "./selection-button-container";
import * as Location from "expo-location";
import { showError } from "@/lib/toast";
import useUserStore from "@/modules/user";

const SectionController = (props) => {
  const { latitude, longitude } = useUserStore();
  const { data: categoryList } = getLoungesCategoryQuery();
  const [selectedId, setSelectedId] = React.useState(0);
  const [radius, setRadius] = React.useState(2);
  const categoryListRef = React.useRef(null);

  const { data, refetch } = getLoungesListQuery({
    latitude: latitude,
    longitude: longitude,
    radius: radius,
    category: selectedId,
  });

  React.useEffect(() => {
    refetch({
      latitude: latitude,
      longitude: longitude,
      radius: radius,
      category: selectedId,
    });
  }, [radius, selectedId]);

  const handlePress = (id) => {
    setSelectedId(id);
  };

  const all = {
    category_name: "All",
    id: 0,
  };

  const filteredData =
    selectedId === 0
      ? data
      : data?.filter((item) => item.listing.category === selectedId);

  React.useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        showError("Error", "Permission to access location was denied");
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    })();
  }, []);

  return (
    <View style={{ marginTop: 20 }}>
      <FlatList
        ref={categoryListRef}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
        horizontal
        data={[all, ...(categoryList ?? [])]}
        ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
        renderItem={({ item, index }) => {
          const isSelected = selectedId === item.id;
          return (
            <SelectionButtonContainer
              onPress={() => {
                handlePress(item.id);
                categoryListRef.current.scrollToIndex({
                  index: index,
                  animated: true,
                });
              }}
              isSelected={isSelected}
            >
              <Text
                style={{
                  color: isSelected ? "#fff" : "#000",
                  fontSize: isSelected ? scale(14) : scale(13),
                  fontWeight: isSelected ? "semibold" : "medium",
                  fontFamily: "Poppins",
                }}
              >
                {item.category_name}
              </Text>
            </SelectionButtonContainer>
          );
        }}
      />

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          padding: 20,
          paddingTop: 0,
        }}
      >
        <View style={{ flex: 1 }} />
        <DropList
          onSelect={(selectedItem) => {
            setRadius(selectedItem);
          }}
        />
      </View>

      <FlatList
        contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 20 }}
        data={filteredData ?? []}
        ItemSeparatorComponent={() => (
          <View
            style={{
              height: 20,
            }}
          />
        )}
        ListEmptyComponent={() => (
          <View
            style={{
              width: "100%",
              height: 300,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Text>No data found</Text>
          </View>
        )}
        ListFooterComponent={() => <View style={{ height: 50 }} />}
        renderItem={({ item }) => (
          <StationCard
            image={item.image}
            distance={item.distance}
            description={item?.offers[0]?.description}
            location={item.listing.place}
            stationName={item.listing.contact_name}
            offersCount={item.offers.length}
            onPress={() => {
              router.navigate({
                pathname: "/old/stop-details",
                params: { data: JSON.stringify(item) },
              });
            }}
          />
        )}
      />
    </View>
  );
};

export default SectionController;

const styles = StyleSheet.create({});
