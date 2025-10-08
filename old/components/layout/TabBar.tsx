// import React from 'react';

// import { View, Pressable, Dimensions, StyleSheet } from 'react-native';
// // import NavigationIcon from './navigationIcon';

// const { width } = Dimensions.get('window');

// const TabBar = ({ state, descriptors, navigation }: any) => {
//   return (
//     <View style={styles.mainContainer}>
//       {state.routes.map((route: any, index: number) => {
//         const { options } = descriptors[route.key];
//         const label =
//           options.tabBarLabel !== undefined
//             ? options.tabBarLabel
//             : options.title !== undefined
//             ? options.title
//             : route.name;

//         const isFocused = state.index === index;

//         const onPress = () => {
//           const event = navigation.emit({
//             type: 'tabPress',
//             target: route.key,
//           });

//           if (!isFocused && !event.defaultPrevented) {
//             navigation.navigate(route.name);
//           }
//         };

//         return (
//           <View
//             key={index}
//             style={[
//               styles.mainItemContainer,
//               { borderRightWidth: label == 'notes' ? 3 : 0 },
//             ]}
//           >
//             <Pressable
//               onPress={onPress}
//               style={{
//                 backgroundColor: isFocused ? '#030D16' : '#182028',
//                 borderRadius: 20,
//               }}
//             >
//               <View
//                 style={{
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   flex: 1,
//                   padding: 15,
//                 }}
//               >
//                 {/* <NavigationIcon route={label} isFocused={isFocused} /> */}
//               </View>
//             </Pressable>
//           </View>
//         );
//       })}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   mainContainer: {
//     flexDirection: 'row',
//     position: 'absolute',
//     bottom: 25,
//     backgroundColor: '#182028',
//     borderRadius: 25,
//     marginHorizontal: width * 0.1,
//   },
//   mainItemContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginVertical: 10,
//     borderRadius: 1,
//     borderColor: '#333B42',
//   },
// });

// export default TabBar;

import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Shadow } from "react-native-shadow-2";
import { router } from "expo-router";
import {
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "@/theme";
import { shadow } from "@/constants";

const window = Dimensions.get("window");

const TabBar = ({ state, descriptors, navigation }) => {
  const focusIndex = state.index;
  const insets = useSafeAreaInsets();
  const routeName = state.routeNames[focusIndex];

  return (
    <SafeAreaView
      edges={["bottom"]}
      style={{
        backgroundColor: colors.cardBackgroundPrimary,
        height: 50 + insets.bottom,
        alignItems: "center",
        justifyContent: "space-evenly",
        flexDirection: "row",
        // alignItems: "center",
      }}
    >
      <TouchableOpacity
        style={{

          height: "100%",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => router.navigate("/")}
      >
        <Text
          style={
            routeName === "index" ? styles.selectedText : styles.unselectedText
          }
        >
          Travlounge
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          {
            marginBottom: 20,
            flex: 0.5,
            alignItems: "center",
            justifyContent: "center",
          },
        ]}
        onPress={() => router.navigate("/qr")}
      >
        <LinearGradient
          angle={0}
          colors={["#0029C9", "#7E98FF"]}
          style={[
            shadow,
            {
              height: routeName === "qr" ? 70 : 60,
              width: routeName === "qr" ? 70 : 60,
              // backgroundColor: "red",
              borderRadius: 40,
              borderWidth: 1,
              borderColor: "#FFFFFF",
              justifyContent: "center",
              alignItems: "center",
              shadowColor: "#0029C9",
              shadowOpacity: 1,
            },
          ]}
        >
          <MaterialIcons
            name="qr-code-scanner"
            size={routeName === "qr" ? 38 : 30}
            color={"white"}
          />
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          flex: 1,
        }}
        onPress={() => router.navigate("/make-a-trip")}
      >
        <Text
          style={
            routeName === "make-a-trip"
              ? styles.selectedText
              : styles.unselectedText
          }
        >
          Make a trip
        </Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  selectedText: { fontWeight: "bold", fontSize: 14, color: "#00205B" },
  unselectedText: {
    fontWeight: "semibold",
    fontSize: 13,
    color: "#919ABE",
    textAlign: "center",
  },
});
