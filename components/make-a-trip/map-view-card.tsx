// import { StyleSheet, View } from "react-native";
// import React from "react";
// import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";

// import useSearchStore from "@/modules/search";

// import MapViewDirections from "react-native-maps-directions";
// import { getRouteStationListMutation } from "@/services/query/make-a-trip";
// import { Box, Device } from "@/core";
// import Icon from "../ui/icon";
// import { services } from "@/data";

// type propsType = {
//   isStarted: boolean;
//   lists: any;
//   onPress:()=>void
// };

// const MapViewCard = (props: propsType) => {
//   const { isStarted, lists = [],onPress } = props;
//   const [mapKey, setMapKey] = React.useState(0);

//   const cameraRef = React.useRef<Camera>(null);

//   const { toPlace, fromPlace } = useSearchStore();
//   const [isReady, setIsReady] = React.useState(false);
//   const [fromCoordinate, setFromCoordinate] = React.useState({
//     latitude: 0,
//     longitude: 0,
//   });
//   const [toCoordinate, setToCoordinate] = React.useState({
//     latitude: 0,
//     longitude: 0,
//   });

//   React.useEffect(() => {
//     setIsReady(isStarted);
//   }, [isStarted]);
//   React.useEffect(() => {
//     setFromCoordinate(fromPlace?.coordinates);
//   }, [fromPlace]);
//   React.useEffect(() => {
//     setToCoordinate(toPlace?.coordinates);
//   }, [toPlace]);

//   React.useEffect(() => {
//     if (toCoordinate) {
//       const markerLocation = {
//         ...toCoordinate,
//         latitudeDelta: 0.05,
//         longitudeDelta: 0.05,
//       };
//       cameraRef.current.animateToRegion(markerLocation, 1000);
//     }
//   }, [toCoordinate]);
//   React.useEffect(() => {
//     if (fromCoordinate) {
//       const markerLocation = {
//         ...fromCoordinate,
//         latitudeDelta: 0.05,
//         longitudeDelta: 0.05,
//       };
//       cameraRef.current.animateToRegion(markerLocation, 1000);
//     }
//   }, [fromCoordinate]);

// React.useEffect(() => {
//   setMapKey((prevKey) => prevKey + 1); // Increment the key to re-render MapView
// }, [lists]);

//   return (
//     <View
//       style={{
//         height: Device.height * 0.6,
//         width: "100%",
//         borderRadius: 6,
//         overflow: "hidden",
//       }}
//     >
//       <MapView
//       //  key={mapKey}
//         provider={PROVIDER_GOOGLE}
//         ref={cameraRef}
//         cameraZoomRange={{
//           minCenterCoordinateDistance: 1000,
//           maxCenterCoordinateDistance: 100000,
//           animated: true,
//         }}
//         showsMyLocationButton
//         showsUserLocation
//         followsUserLocation
//         style={StyleSheet.absoluteFill}
//       >
//         {!!fromCoordinate&&<Marker key={fromCoordinate?.latitude||2+fromCoordinate?.longitude||2} focusable coordinate={fromCoordinate} />}
//        { !!toCoordinate&&<Marker  key={toCoordinate?.latitude||1+toCoordinate?.longitude||1}  focusable coordinate={toCoordinate} />}
//         {lists?.map((item, index) => (
//           <Marker onPress={()=>onPress(item?.id)} coordinate={item.coordinate}>
//           {item?.icon&&<Icon name={item.icon} size={40} />}
//           </Marker>
//         ))}
//         {isReady && (
//           <MapViewDirections
//             origin={fromCoordinate}
//             destination={toCoordinate}
//             strokeWidth={6}
//             strokeColor="#66A1F4"
//             strokeColors={["#66A1F4"]}
//             apikey={process.env.EXPO_PUBLIC_MAP_KEY_ID || ""}
//           />
//         )}
//       </MapView>
//     </View>
//   );
// };

// export default MapViewCard;

// const styles = StyleSheet.create({});
