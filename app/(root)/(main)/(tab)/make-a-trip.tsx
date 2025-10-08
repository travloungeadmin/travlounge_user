// import { ActivityIndicator, FlatList, Pressable, StyleSheet } from "react-native";
// import React from "react";
// import { Box, Device, Row, Text, TextInput } from "@/core";
// import { colors } from "@/theme";
// import { shadow } from "@/constants";
// import { Image } from "expo-image";
// import Icon from "@/components/ui/icon";
// import { router, useFocusEffect } from "expo-router";
// import useSearchStore from "@/modules/search";
// import MapViewCard from "@/components/make-a-trip/map-view-card";
// import {
//   getLoungesCategoryQuery,
//   getLoungesListQuery,
//   getRouteStationListMutation,
// } from "@/services/query/make-a-trip";
// import useUserStore from "@/modules/user";
// import StationCard from "@/components/make-a-trip/station-card";
// import { Ionicons } from "@expo/vector-icons";
// import BottomSheet from "@/core/bottom-sheet";
// import SingleSelectList from "@/components/bottom-sheet/single-select-list";
// import { BottomSheetModal } from "@gorhom/bottom-sheet";
// import { services } from "@/data";
// import { showSuccess } from "@/lib/toast";
// import Animated, {
//   useAnimatedScrollHandler,
//   useSharedValue,
//   useAnimatedStyle,
//   interpolate,
//   Extrapolate,
// } from 'react-native-reanimated';
// import Header from "@/components/header";
// import LocationPermissionView from "@/old/components/common/location-permission-view";
// const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

// const radiusList = [
//   { id: 1, name: "Within 3 km", value: 3 },
//   { id: 2, name: "Within 5 km", value: 5 },
//   { id: 3, name: "Within 10 km", value: 10 },
//   { id: 7, name: "Within 30 km", value: 30 },
//   { id: 8, name: "Within 50 km", value: 50 },
// ];

// const HEADER_HEIGHT = Device.height*0.6

// const MakeATrip = () => {
//   const listRef = React.useRef(null);
//   const { latitude, longitude,isLocationPermissionGranted } = useUserStore();
//   const [radius, setRadius] = React.useState("Within 3 km");
//   const [selectedIndex, setSelectedIndex] = React.useState(0);
//   const [selectedId, setSelectedId] = React.useState(0);
//   const [isStarted, setIsStarted] = React.useState(false);
//   const [lists, setLists] = React.useState([]);
//   const scrollRef = React.useRef(null);
//   const { toPlace, fromPlace,resetState } = useSearchStore();
//   const { data: categoryList,isLoading:isLoadingCurrentList } = getLoungesCategoryQuery();
//   const radiusRef = React.useRef<BottomSheetModal>(null);

//   const currentRadius = radiusList.find((item) => item.name === radius)?.value;

//   const { mutate, data: loungesList,isPending:isLoadingMapList } = getRouteStationListMutation();

//   const all = {
//     category_name: "All",
//     id: 0,
//   };

//   const scrollY = useSharedValue(0);

//   const scrollHandler = useAnimatedScrollHandler({
//     onScroll: (event) => {
//       scrollY.value = event.contentOffset.y;
//     },
//   });

//   const headerAnimatedStyle = useAnimatedStyle(() => {
//     return {
//       transform: [
//         {
//           translateY: interpolate(
//             scrollY.value,
//             [0, HEADER_HEIGHT],
//             [0, -HEADER_HEIGHT],
//             Extrapolate.CLAMP
//           ),
//         },
//       ],
//     };
//   });

//   const filteredLoungesList =
//     selectedId === 0
//       ? loungesList
//       : loungesList?.filter((item) => item.category === selectedId);

//   const handleFromPress = () => {
//     isStarted && setIsStarted(false);
//     router.navigate({
//       pathname: "/search",
//       params: {
//         isFrom: "true",
//       },
//     });
//   };

//   React.useEffect(() => {
//     if (isStarted) {
//       mutate({
//         lat_from: fromPlace?.coordinates.latitude,
//         lon_from: fromPlace?.coordinates.longitude,
//         lat_to: toPlace?.coordinates.latitude,
//         lon_to: toPlace?.coordinates.longitude,
//       });
//     } else {
//       mutate({
//         curr_lat: latitude as number,
//         curr_lon: longitude as number,
//         radius: currentRadius as number,
//       });
//     }
//   }, [isStarted, radius]);

//   const filteredList = () =>
//     loungesList?.map((item) => {
//       const service = services.find((s) => s.title === item.cat_title);
//       return {
//         id: item.id,
//         coordinate: {
//           latitude: item.latitude,
//           longitude: item.longitude,
//         },
//         icon: service ? service.mapIcon : null,
//       };
//     });

//   React.useEffect(() => {
//     if (loungesList) {
//       const result = filteredList();
//       setLists(result);
//     }
//   }, [loungesList]);
//   const isLoading=isStarted ? isLoadingMapList : isLoadingCurrentList

//   const handleIconPress = (id) => {
//     setSelectedId(0);
//     setSelectedIndex(0);
//     scrollRef.current.scrollToIndex({ index: 0,animated:true });
//     const listIndex = lists.findIndex((item) => item.id === id);
//     console.log(listIndex);
//     listRef?.current?.scrollToIndex({ index: listIndex,animated:true });
//   };

//   const renderHeader = React.useMemo(() => {
//     return (
//       <Box>
//         {categoryList&&<FlatList
//           horizontal
//           ref={scrollRef}
//           renderItem={({ item, index }) => {
//             const isSelected = selectedIndex === index;
//             return (
//               <Pressable
//                 onPress={() => {
//                   setSelectedIndex(index);
//                   setSelectedId(item?.id);
//                   scrollRef.current.scrollToIndex({ index, animated: true });
//                 }}
//                 style={[
//                   shadow,
//                   styles.categoryItem,
//                   isSelected && styles.selectedCategoryItem,
//                 ]}
//               >
//                 <Text
//                   preset="POP_14_R"
//                   color={isSelected ? colors.textTertiary : colors.textPrimary}
//                 >
//                   {item?.category_name}
//                 </Text>
//               </Pressable>
//             );
//           }}
//           data={[all, ...(categoryList || [])]}
//           keyExtractor={(item) => item.id.toString()}
//           showsHorizontalScrollIndicator={false}
//           contentContainerStyle={styles.categoryList}
//         />}
//       </Box>
//     );
//   }, [
//     categoryList,
//     selectedIndex,
//     selectedId,
//     isStarted,
//     fromPlace,
//     toPlace,
//     radius,
//   ]);

//   return (<Box style={{flex:1}}>
//       <Header profileIcon title="Make a trip" />
//     <Box style={styles.container}>
//            <Animated.View style={[styles.header, headerAnimatedStyle]}>
//             <MapViewCard
//               onPress={handleIconPress}
//               lists={lists}
//               isStarted={isStarted}
//             />
//             </Animated.View>

//             <AnimatedFlatList
//              scrollEventThrottle={16}
//              contentContainerStyle={[styles.flatListContent,{ paddingTop: HEADER_HEIGHT }]}
//              onScroll={scrollHandler}

//               ref={listRef}

//               ListHeaderComponent={renderHeader}
//               data={ filteredLoungesList }
//               ListFooterComponent={() => <Box style={styles.itemSeparator} />}
//               keyExtractor={(item) => item.id.toString()}
//               ItemSeparatorComponent={() => (
//                 <Box style={styles.itemSeparator} />
//               )}
//               renderItem={({ item }) => (
//                 <StationCard isStarted isParent item={item} />
//               )}
//               ListEmptyComponent={() => (
//                 <Box style={styles.emptyComponent}>
//                   {isLoading?<ActivityIndicator size={"large"} color={colors.textPrimary}/>:

//                     <><Image
//                     contentFit="contain"
//                     source={require("@/assets/images/not-found.png")}
//                     style={styles.notFoundImage}
//                   />
//                   <Text preset="POP_14_M">Not data found</Text>
//                   </>}
//                 </Box>
//               )}
//             />
//           {/* </>
//         )}
//       /> */}

//       <BottomSheet ref={radiusRef} enableDynamicSizing>
//         <SingleSelectList
//           data={radiusList}
//           headerTitle="Select Radius"
//           selectedValue={radius}
//           onSelect={(val, index) => {
//             setRadius(val);
//             radiusRef.current?.dismiss();
//           }}
//         />
//       </BottomSheet>

//       <Box style={[styles.mapViewCard, shadow]}>
//         <Row style={styles.row}>
//           <Box style={styles.flex1}>
//             <Pressable onPress={handleFromPress}>
//               <TextInput
//                 onPress={handleFromPress}
//                 value={fromPlace?.name}
//                 editable={false}
//                 leftAddon={<Icon size={13} name="Pin" stroke="#253D8F" />}
//                 placeholder="Trip from"
//                 style={styles.textInput}
//               />
//             </Pressable>
//             <Box style={styles.separator} />
//             <Pressable onPress={() => router.navigate("/search")}>
//               <TextInput
//                 onPress={() => router.navigate("/search")}
//                 value={toPlace?.name}
//                 editable={false}
//                 leftAddon={<Icon size={13} name="Pin" stroke="#253D8F" />}
//                 placeholder="Trip to"
//                 style={styles.textInput}
//               />
//             </Pressable>
//           </Box>
//           <Pressable
//             onPress={() => {
//               if (fromPlace && toPlace) {
//                 if(isStarted){
//                   resetState();
//                 }
//                else{showSuccess( "Success","Trip started",3000)}
//                 setIsStarted((prev) => !prev);
//               }
//             }}
//             style={[
//               styles.startButton,
//               { backgroundColor: colors.cardBackgroundSecondary },
//             ]}
//           >
//             <Icon name="Send" size={18} fill={colors.iconTertiary} />
//             <Text preset="POP_14_M" color={colors.textTertiary}>
//               {isStarted ? "Stop" : "Start"}
//             </Text>
//           </Pressable>
//         </Row>
//         {!isStarted && (
//           <Pressable
//             onPress={() =>
//               radiusRef.current?.present()}
//             style={[
//               {
//                 paddingHorizontal: 10,
//                 backgroundColor: colors.cardBackgroundPrimary,
//                 height: 30,
//                 width: 140,
//                 position: "absolute",
//                 bottom: -60,
//                 right: 0,
//                 borderRadius: 30,
//                 borderWidth: 1,
//                 borderColor: "#04103A1F",
//                 flexDirection: "row",
//                 alignItems: "center",
//                 justifyContent: "space-between",
//               },
//               shadow,
//             ]}
//           >
//             <Text preset="POP_12_M" color={colors.textPrimary}>
//               {radius}
//             </Text>
//             <Ionicons
//               name="chevron-down"
//               size={20}
//               color={colors.iconPrimary}
//             />
//           </Pressable>
//         )}
//       </Box>
//     </Box>
//     {!isLocationPermissionGranted &&<LocationPermissionView/>}
//     </Box>
//   );
// };

// export default MakeATrip;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: colors.backgroundPrimary,
//   },
//   header: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     height: HEADER_HEIGHT,
//     // backgroundColor: '#6200ee',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 1,
//     elevation: 10,
//   },
//   flatListContent: {
//     paddingBottom: 20,
//   },
//   itemSeparator: {
//     height: 20,
//   },
//   emptyComponent: {
//     alignItems: "center",
//     height: Device.width / 3 + 40,
//     width: "100%",
//   },
//   notFoundImage: {
//     width: Device.width / 3,
//     height: Device.width / 3,
//   },
//   mapViewCard: {
//     zIndex: 1000,
//     position: "absolute",
//     alignSelf: "center",
//     top: 16,
//     borderColor: "#DCE9FD",
//     width: Device.width - 32,
//     backgroundColor: colors.cardBackgroundPrimary,
//     paddingHorizontal: 10,
//     borderWidth: 1,
//     borderRadius: 13,
//   },
//   row: {
//     gap: 10,
//   },
//   flex1: {
//     flex: 1,
//   },
//   textInput: {
//     backgroundColor: colors.cardBackgroundPrimary,
//     height: 40,
//     borderRadius: 0,
//     padding: 0,
//     alignSelf: "center",
//   },
//   separator: {
//     backgroundColor: "#DCE9FD",
//     height: 1,
//     marginHorizontal: 16,
//   },
//   startButton: {
//     alignSelf: "center",
//     height: 60,
//     width: 60,
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 8,
//   },
//   dropDownContainer: {
//     borderRadius: 40,
//     width: 150,
//     position: "absolute",
//     right: 10,
//     bottom: -50,
//   },
//   dropDownPicker: {
//     backgroundColor: colors.cardBackgroundPrimary,
//     height: 40,
//     borderRadius: 40,
//     width: 150,
//     paddingHorizontal: 16,
//     borderColor: "#DCE9FD",
//     borderWidth: 1,
//   },
//   categoryItem: {
//     marginLeft: 16,
//     alignItems: "center",
//     justifyContent: "center",
//     height: 30,
//     paddingHorizontal: 16,
//     backgroundColor: colors.cardBackgroundPrimary,
//     borderRadius: 30,
//   },
//   selectedCategoryItem: {
//     backgroundColor: colors.cardBackgroundSecondary,
//     shadowColor: colors.cardBackgroundSecondary,
//     shadowOpacity: 0.5,
//   },
//   categoryList: {
//     paddingRight: 16,
//     paddingTop: 16,
//     paddingBottom: 40,
//   },
// });

import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';

import Header from '@/components/header';
import { Device, Image, Text, useSafeAreaInsets } from '@/core';

const MakeATrip = () => {
  const { bottomHeight } = useSafeAreaInsets();
  return (
    <View style={{ flex: 1 }}>
      <Header profileIcon title="Make a trip" />
      <View
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text preset="POP_28_B" color="#253D8F">
          Coming Soon!
        </Text>
        <Text preset="POP_16_SB" color="#253D8F">
          We are working for you
        </Text>
        <Image
          source={require('@/assets/images/coming_soon_make_a_trip.png')}
          priority="high"
          style={{
            width: Device.width,
            height: Device.width * 1.105,
          }}
          contentFit="contain"
        />
        <Pressable
          onPress={() => router.back()}
          style={{
            position: 'absolute',
            bottom: bottomHeight || 20,
            left: 20,
            alignSelf: 'flex-end',
            backgroundColor: '#253D8F',
            height: 48,
            width: Device.width - 40,
            borderRadius: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text preset="POP_16_SB" color="#FFF">
            Go To Home
          </Text>
        </Pressable>
      </View>
    </View>
  );
};

export default MakeATrip;

const styles = StyleSheet.create({});
