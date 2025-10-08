import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import React from "react";
import { Box, Device, Row, Text, TextInput } from "@/core";
import { colors } from "@/theme";
import { shadow } from "@/constants";
import { Image } from "expo-image";
import Icon from "@/components/ui/icon";
import { router } from "expo-router";
import useSearchStore from "@/modules/search";
import MapViewCard from "@/components/make-a-trip/map-view-card";
import {
  getLoungesCategoryQuery,
  getLoungesListQuery,
  getRouteStationListMutation,
} from "@/services/query/make-a-trip";
import useUserStore from "@/modules/user";
import StationCard from "@/components/make-a-trip/station-card";
import DropDownPicker from "react-native-dropdown-picker";
import { Ionicons } from "@expo/vector-icons";
import BottomSheet from "@/core/bottom-sheet";
import SingleSelectList from "@/components/bottom-sheet/single-select-list";
import  { BottomSheetModal } from "@gorhom/bottom-sheet";
import { services } from "@/data";


const radiusList = [
  {id:1,name:"Within 3 km" ,value:3},
  {id:2,name:"Within 5 km" ,value:5},
  {id:3,name:"Within 10 km" ,value:10},
  {id:7,name:"Within 30 km" ,value:30},
  {id:8,name:"Within 50 km" ,value:50},
];

const MapView = () => {
  const { latitude, longitude } = useUserStore();
  const [radius, setRadius] = React.useState("Within 3 km");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [selectedId, setSelectedId] = React.useState(0);
  const [isStarted, setIsStarted] = React.useState(false);
  const [lists, setLists] = React.useState([]);
  const scrollRef = React.useRef(null);
  const { toPlace, fromPlace } = useSearchStore();
  const { data: categoryList } = getLoungesCategoryQuery();
  const radiusRef = React.useRef<BottomSheetModal>(null);

  const currentRadius = radiusList.find((item) => item.name === radius)?.value;

  const { mutate, data: loungesList } = getRouteStationListMutation();
  
  const { data, refetch } = getLoungesListQuery({
    latitude: latitude as number,
    longitude: longitude as number,
    radius:currentRadius as number,
    category: selectedId as number,
    lat_from: fromPlace?.coordinates.latitude as number,
    lon_from: fromPlace?.coordinates.longitude as number,
    lat_to: toPlace?.coordinates.latitude as number,
    lon_to: toPlace?.coordinates.longitude as number,
  });
  const all = {
    category_name: "All",
    id: 0,
  };

  const filteredData =
    selectedId === 0
      ? data
      : data?.filter((item) => item.listing.category === selectedId);

  React.useEffect(() => {
    refetch();
  }, [radius]);

  const handleFromPress = () => {
    isStarted && setIsStarted(false);
    router.navigate({
      pathname: "/search",
      params: {
        isFrom: "true",
      },
    });
  };

  React.useEffect(() => {
    if(isStarted){mutate({
      lat_from: fromPlace?.coordinates.latitude,
      lon_from: fromPlace?.coordinates.longitude,
      lat_to: toPlace?.coordinates.latitude,
      lon_to: toPlace?.coordinates.longitude,
      radius:50,
    },
    );}
    else{
      lists&&setLists([]);
    }

  }, [isStarted]);

  const filteredList=()=> loungesList?.map((item) => {
    const service = services.find((s) => s.title === item.cat_title);
    return {
      coordinate: {
        latitude: item.latitude,
        longitude: item.longitude,
      },
      icon: service ? service.mapIcon : null, 
    };
  });

  React.useEffect(() => {
  if(loungesList){
    const result=filteredList();
    setLists(result);
   
    
  }
  }, [loungesList]);


  

  const renderHeader = React.useMemo(() => {
    return (
      <Box>
        <Box>
          <MapViewCard lists={lists} isStarted={isStarted} />

          <Box style={[styles.mapViewCard, shadow]}>
            <Row style={styles.row}>
              <Box style={styles.flex1}>
                <Pressable onPress={handleFromPress}>
                  <TextInput
                    onPress={handleFromPress}
                    value={fromPlace?.name}
                    editable={false}
                    leftAddon={<Icon size={13} name="Pin" stroke="#253D8F" />}
                    placeholder="Trip from"
                    style={styles.textInput}
                  />
                </Pressable>
                <Box style={styles.separator} />
                <Pressable onPress={() => router.navigate("/search")}>
                  <TextInput
                    onPress={() => router.navigate("/search")}
                    value={toPlace?.name}
                    editable={false}
                    leftAddon={<Icon size={13} name="Pin" stroke="#253D8F" />}
                    placeholder="Trip to"
                    style={styles.textInput}
                  />
                </Pressable>
              </Box>
              <Pressable
                onPress={() => {
                  if (fromPlace && toPlace) {
                    setIsStarted((prev) => !prev);
                  }
                }}
                style={[
                  styles.startButton,
                  { backgroundColor: colors.cardBackgroundSecondary },
                ]}
              >
                <Icon name="Send" size={18} fill={colors.iconTertiary} />
                <Text preset="POP_14_M" color={colors.textTertiary}>
                  {isStarted ? "Stop" : "Start"}
                </Text>
              </Pressable>
            </Row>
            <Pressable

              onPress={() => radiusRef.current?.present()}
              style={[
                {
                  paddingHorizontal: 10,
                  backgroundColor: colors.cardBackgroundPrimary,
                  height: 30,
                  width: 140,
                  position: "absolute",
                  bottom: -60,
                  right: 0,
                  borderRadius: 30,
                  borderWidth: 1,
                  borderColor: "#04103A1F",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                },
                shadow,
              ]}
            >
              <Text preset="POP_12_M" color={colors.textPrimary}>
               {radius}
              </Text>
              <Ionicons
                name="chevron-down"
                size={20}
                color={colors.iconPrimary}
              />
            </Pressable>
          </Box>
        </Box>

        <FlatList
          horizontal
          ref={scrollRef}
          renderItem={({ item, index }) => {
            const isSelected = selectedIndex === index;
            return (
              <Pressable
                onPress={() => {
                  setSelectedIndex(index);
                  setSelectedId(item?.id);
                  scrollRef.current.scrollToIndex({ index });
                }}
                style={[
                  shadow,
                  styles.categoryItem,
                  isSelected && styles.selectedCategoryItem,
                ]}
              >
                <Text
                  preset="POP_14_R"
                  color={isSelected ? colors.textTertiary : colors.textPrimary}
                >
                  {item?.category_name}
                </Text>
              </Pressable>
            );
          }}
          data={[all, ...(categoryList || [])]}
          keyExtractor={(item) => item.id.toString()}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        />
      </Box>
    );
  }, [
    categoryList,
    selectedIndex,
    selectedId,
    isStarted,
    fromPlace,
    toPlace,
    radius,
  ]);

  return (
    <Box style={styles.container}>
      <FlatList
        contentContainerStyle={styles.flatListContent}
        ListHeaderComponent={renderHeader}
        data={filteredData}
        keyExtractor={(item) => item.toString()}
        ItemSeparatorComponent={() => <Box style={styles.itemSeparator} />}
        renderItem={({ item }) => <StationCard isParent item={item} />}
        ListEmptyComponent={() => (
          <Box style={styles.emptyComponent}>
            <Image
              contentFit="contain"
              source={require("@/assets/images/not-found.png")}
              style={styles.notFoundImage}
            />
            <Text preset="POP_14_M">Not found</Text>
          </Box>
        )}
      />
      <BottomSheet
        ref={radiusRef}
        enableDynamicSizing
       >
        <SingleSelectList
        data={radiusList}
        headerTitle="Select Radius"
        selectedValue={radius}
        onSelect={(val, index) => {
          setRadius(val);
          radiusRef.current?.dismiss();
        }}

        />

       </BottomSheet>
    </Box>
  );
};

export default MapView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundPrimary,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  itemSeparator: {
    height: 20,
  },
  emptyComponent: {
    alignItems: "center",
    height: Device.width / 3 + 40,
    width: "100%",
  },
  notFoundImage: {
    width: Device.width / 3,
    height: Device.width / 3,
  },
  mapViewCard: {
    position: "absolute",
    alignSelf: "center",
    top: 16,
    borderColor: "#DCE9FD",
    width: Device.width - 32,
    backgroundColor: colors.cardBackgroundPrimary,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderRadius: 13,
  },
  row: {
    gap: 10,
  },
  flex1: {
    flex: 1,
  },
  textInput: {
    backgroundColor: colors.cardBackgroundPrimary,
    height: 40,
    borderRadius: 0,
    padding: 0,
    alignSelf: "center",
  },
  separator: {
    backgroundColor: "#DCE9FD",
    height: 1,
    marginHorizontal: 16,
  },
  startButton: {
    alignSelf: "center",
    height: 60,
    width: 60,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
  },
  dropDownContainer: {
    borderRadius: 40,
    width: 150,
    position: "absolute",
    right: 10,
    bottom: -50,
  },
  dropDownPicker: {
    backgroundColor: colors.cardBackgroundPrimary,
    height: 40,
    borderRadius: 40,
    width: 150,
    paddingHorizontal: 16,
    borderColor: "#DCE9FD",
    borderWidth: 1,
  },
  categoryItem: {
    marginLeft: 16,
    alignItems: "center",
    justifyContent: "center",
    height: 30,
    paddingHorizontal: 16,
    backgroundColor: colors.cardBackgroundPrimary,
    borderRadius: 30,
  },
  selectedCategoryItem: {
    backgroundColor: colors.cardBackgroundSecondary,
    shadowColor: colors.cardBackgroundSecondary,
    shadowOpacity: 0.5,
  },
  categoryList: {
    paddingRight: 16,
    paddingTop: 16,
    paddingBottom: 40,
  },
});
