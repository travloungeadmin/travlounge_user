import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
} from "react-native";
import React from "react";
import { Shadow } from "react-native-shadow-2";
import { router } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { colors, constants } from "@/old/constants";
import { MaterialIcons } from "@expo/vector-icons";
import queryClient from "@/services/query";
import QUERIES_KEY from "@/services/query/query-keys";

const screenWidth = Dimensions.get("window").width;

const UserCard = () => {
  const { user } = queryClient.getQueryData([QUERIES_KEY.PROFILE]);

  const handleEdit = () => {
    router.navigate({
      pathname: "/old/edit-profile",
      params: { type: "edit" },
    });
  };

  return (
    <Shadow distance={8}>
      <LinearGradient
        colors={["#F3F7FA", "#DDE0E5"]}
        angle={139}
        style={styles.card}
      >
        <Shadow>
          <LinearGradient
            colors={["#ECF0F3", "#ECF0F3"]}
            angle={180}
            style={styles.imageContainer}
          >
            <Image
              style={styles.image}
              priority="high"
              source={ !user?.image? require("@/assets/images/empty_avatar.jpeg") :{
                uri: user?.image
              }}
            />
          </LinearGradient>
        </Shadow>
        <View style={{ flex: 1 }}>
          <Text style={styles.userName}>{user?.name||"New user"}</Text>
          <Text style={styles.userPhone}>{user?.phone}</Text>
        </View>
        <TouchableOpacity onPress={handleEdit} style={styles.editButton}>
          <MaterialIcons name="edit" size={24} color="#31456A" />
        </TouchableOpacity>
      </LinearGradient>
    </Shadow>
  );
};

export default UserCard;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  backgroundStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    flexGrow: 1,
  },
  neo1: {
    shadowRadius: 1,
    borderRadius: 60,
    backgroundColor: "#FAFAFA",
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  neo2: {
    shadowRadius: 4,
    borderRadius: 55,
    backgroundColor: colors.tb_border,
    width: 93,
    height: 93,
    justifyContent: "center",
    alignItems: "center",
  },
  touchable1: {
    position: "absolute",
    right: 5,
    bottom: 5,
    zIndex: 9999,
    height: 30,
    width: 30,
  },
  text10: {
    color: colors.white,
    fontSize: 16,
    fontFamily: constants.fontPopM,
    alignSelf: "center",
  },

  touchable2: {
    paddingHorizontal: 10,
    paddingTop: 10,
    alignSelf: "flex-end",
    flexDirection: "row",
  },

  view: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    width: Dimensions.get("window").width,
    height: "100%",
    marginTop: Platform.OS === "ios" ? 20 : 80,
    paddingBottom: 100,
    // position : 'absolute',
    // bottom : 20
  },
  view1: {
    flexDirection: "row",
  },
  view2: {
    flexDirection: "column",
  },
  view3: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  view4: {
    borderRadius: 10,
    overflow: "hidden",
    padding: 20,
  },
  view5: {
    // position: 'absolute',
    // top: 0, left: 0, right: 0, bottom: 0,
    justifyContent: "center",
    alignItems: "center",
    width: 83,
    height: 83,
    borderRadius: 41,
    borderColor: colors.circular_bg1,
    borderWidth: 3,
    overflow: "hidden",
  },
  user_card: {
    width: Dimensions.get("window").width - 30,
    borderRadius: 10,
    padding: 16,
    flexDirection: "column",
  },
  view6: {
    paddingBottom: 30,
    // marginTop: 30,
    // width: Dimensions.get("window").width - 250,
    height: 58,
    alignSelf: "flex-end",
  },
  view7: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    marginTop: "auto",
  },
  button1: {
    // width: Dimensions.get("window").width - 250,
    height: 58,
    borderRadius: 10,
    padding: 16,
    flexDirection: "column",
    alignSelf: "flex-end",
  },
  logoutButton: {
    width: "100%",
    height: 58,
    borderRadius: 10,
    padding: 16,
    flexDirection: "column",
    alignSelf: "flex-end",
  },
  button2: {
    width: 130,
    height: 58,
    borderRadius: 10,
    padding: 16,
    flexDirection: "column",
  },
  button3: {
    width: 120,
    height: 50,
    borderRadius: 10,
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
  },
  time_image: {
    width: 91,
    height: 91,
    backgroundColor: colors.font_color2,
    marginRight: 10,
  },
  text1: {
    color: colors.font_color,
    fontSize: 30,
    fontFamily: constants.fontPopM,
    marginTop: -5,
  },
  text2: {
    color: colors.font_color2,
    fontSize: 16,
    fontFamily: constants.fontPopSB,
    lineHeight: 22,
  },
  text3: {
    color: colors.font_color,
    fontSize: 14,
    fontFamily: constants.fontPopR,
    lineHeight: 22,
  },
  text4: {
    color: colors.font_color2,
    fontSize: 14,
    fontFamily: constants.fontPopM,
    lineHeight: 22,
  },
  text5: {
    color: colors.white,
    fontSize: 16,
    fontFamily: constants.fontPopM,
    alignSelf: "center",
  },
  text6: {
    fontSize: 27,
    lineHeight: 35,
  },
  text7: {
    fontSize: 19,
    color: colors.font_color,
    alignSelf: "flex-start",
    marginLeft: 25,
    fontWeight: "400",
  },
  text8: {
    color: colors.font_color,
    fontSize: 14,
    fontFamily: constants.fontPopM,
    lineHeight: 18,
    marginLeft: 5,
    marginBottom: 10,
  },
  text9: {
    color: colors.font_color,
    fontFamily: constants.fontRobB,
    fontSize: 18,
    textAlignVertical: "center",
    paddingTop: 10,
  },
  textSB: {
    fontFamily: constants.fontPopSB,
    color: "#00205B",
    fontSize: 16,
  },
  luxury_image: {
    width: Dimensions.get("window").width - 100,
    height: Dimensions.get("window").width - 20,
    backgroundColor: colors.font_color2,
    borderRadius: 10,
  },
  luxury_title: {
    flexDirection: "column",
    justifyContent: "flex-start",
    width: "100%",
    paddingLeft: 40,
  },
  luxury_detail: {
    width: Dimensions.get("window").width / 1.5,
    // padding : 15,
    borderRadius: 12,
  },
  shadow: {
    shadowOffset: { width: 0, height: 4 },
    shadowColor: "rgba( 31, 38, 135, 0.37 )",

    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 10,
    backgroundColor: "#0000",
  },
  shadow2: {
    shadowOffset: { width: 0, height: 4 },
    shadowColor: "#3578A1CF",
    //backgroundColor: Colors.white,
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 10,
    borderWidth: 1,
    borderColor: colors.tb_border2,
  },
  image1: {
    height: 16,
    width: 8,
    alignSelf: "center",
    marginLeft: 4,
    marginBottom: 2,
  },
  image2: { height: 80, width: 80 },
  image3: { height: 23, width: 23 },

  linear: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 1,
    borderColor: "#fff",
    alignContent: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  box: { width: "70%", height: "70%", backgroundColor: "gray" },

  linear_shadow: {
    shadowOffset: { width: 0, height: 2 },
    shadowColor: colors.shadow_color1,
    // shadowColor: '#1999FF',
    backgroundColor: colors.white,
    shadowOpacity: Platform.OS === "ios" ? 0.6 : 0.5,
    shadowRadius: 10,
    elevation: 10,

    marginBottom: 30,
    borderRadius: 10,
    // backgroundColor: 'red',
  },
  linear_shadow2: {
    shadowOffset: { width: 0, height: Platform.OS === "ios" ? 6 : 12 },
    shadowColor: colors.shadow_color1,
    // shadowColor: '#1999FF',
    backgroundColor: colors.white,
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 15,
    borderRadius: 10,
  },
  curve_side: {
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    borderBottomLeftRadius: 15,
  },
  service_image: { width: 40, height: 40, marginTop: 10 },
  textM: {
    fontFamily: constants.fontPopM,
    color: "#00205B",
    fontSize: 16,
  },
  textR: {
    fontFamily: constants.fontPopR,
    color: "#00205B",
    fontSize: 16,
  },
  textB: {
    fontFamily: constants.fontPopB,
    color: "#00205B",
    fontSize: 18,
    // marginLeft: 10,
  },
  logoutBtnNew: {
    width: "40%",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.font_color,
    borderRadius: 8,
    height: 50,
    justifyContent: "center",
  },
  chatbutton: {
    width: Dimensions.get("window").width - 200,
    height: 58,
    borderRadius: 10,
    padding: 16,
    flexDirection: "column",
    alignSelf: "flex-end",
  },
  card: {
    width: screenWidth - 40,
    borderRadius: 6,
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
  imageContainer: {
    borderRadius: 50,
    height: 70,
    width: 70,
    borderWidth: 2,
    borderColor: "#FBFAFF",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    height: 70,
    width: 70,
    borderRadius: 50,
  },
  userName: {
    fontFamily: constants.fontPopSB,
    fontSize: 16,
    color: "#31456A",
  },
  userPhone: {
    fontFamily: constants.fontPopR,
    fontSize: 14,
    color: "#31456A",
  },
  editButton: {
    alignSelf: "flex-end",
  },
});
