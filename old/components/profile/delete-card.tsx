import {
  Alert,
  Dimensions,
  Linking,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { Shadow } from "react-native-shadow-2";
import { LinearGradient } from "expo-linear-gradient";
import { constants } from "@/old/constants";
import { deleteAccountMutation } from "@/services/query/profile";
import useUserStore from "@/modules/user";
import { router } from "expo-router";

const screenWidth = Dimensions.get("window").width;
const DeleteCard = () => {
  const {mutate,isSuccess}=deleteAccountMutation()


  const {reset}=useUserStore()
  if(isSuccess){
    reset()
    router.replace("/auth")
  }
  const deleteHandler = () => {
    Alert.alert("Delete account", "Are you sure you want to delete your account?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          mutate()
        },
      },
    ]);
  };  
  return (
    <Shadow distance={8}>
      <LinearGradient
        colors={["#F3F7FA", "#DDE0E5"]}
        angle={159}
        style={{ width: screenWidth - 40, borderRadius: 6, padding: 20 }}
      >
        <Text
          style={{
            fontFamily: constants.fontPopM,
            fontSize: 16,
            color: "#00205B",
            marginBottom: Platform.OS === "ios" ? 8 : 0,
          }}
        >
          Delete account
        </Text>
        <Text
          style={{
            fontFamily: constants.fontPopR,
            fontSize: 13,
            color: "#00205B",
            marginBottom: 20,
          }}
        >
          Are you sure you want to delete your account? This action cannot be undone.
        </Text>
        <Shadow distance={4} offset={[3, 3]}>
          <TouchableOpacity
            onPress={deleteHandler}
            style={{ borderRadius: 10, overflow: "hidden" }}
          >
            <LinearGradient
              colors={["#6D8AFC", "#B5C4FF"]}
              angle={358}
              style={{
                width: screenWidth - 80,
                alignItems: "center",
                paddingVertical: 15,
              }}
            >
              <Text
                style={{
                  fontFamily: constants.fontPopM,
                  fontSize: 16,
                  color: "#FBFAFF",
                }}
              >
                Delete account
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </Shadow>
      </LinearGradient>
    </Shadow>
  );
};

export default DeleteCard;

const styles = StyleSheet.create({});
