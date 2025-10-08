import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from "react-native";
import React, { useState } from "react";
import { Shadow } from "react-native-shadow-2";

import { router } from "expo-router";
import languages from "@/old/constants/languages";
import { colors, constants } from "@/old/constants";
import { LinearGradient } from "expo-linear-gradient";
import OtpContainer from "./otp-container";
import Card from "../ui/card";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ResentOtpContainer from "./resent-otp-container";
import { verifyOTPQuery } from "@/services/query/auth";
import { setRefresh, setRegister, setSession } from "@/modules/user";
import { Device } from "@/core";
//   import { verifyOTPQuery } from "../services/query/auth";

type propsType = {
  number: string;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  isLogin: boolean;
};

const VerifyBottomContainer = (props: propsType) => {
  const { setIsLogin, number, isLogin } = props;
  const { mutate, isPending } = verifyOTPQuery();

  const [value, setValue] = useState("");

  const continueHandler = () => {
    const formData = new FormData();
    formData.append("mobile_number", number);
    formData.append("otp", value);
    mutate(formData, {
      onSuccess: (res) => {
        setSession(res.access_token);
        setRefresh(res.refresh_token);
        if (res.user) {
          router.replace("(tab)");
        } else {
          setRegister(false);
          router.replace("/edit-profile");
        }
      },
    });
  };
  return (
    <View style={{ gap: 20, paddingHorizontal: 20 }}>
      <Card
        style={{
          width: Device.width - 40,
          borderRadius: 21,
          paddingTop: 30,
          paddingHorizontal: 20,
          gap: 20,
        }}
      >
        <Text style={[styles.text1]}>Verification</Text>

        <Text style={styles.text2}>
          Please enter the verification code we've sent you on {number}
          <Text
            onPress={() => {
              setValue("");
              setIsLogin(true);
            }}
            style={styles.text3}
          >
            Edit
          </Text>
        </Text>
        <OtpContainer value={value} setValue={setValue} />
        <Shadow
          distance={4}
          offset={[3, 3]}
          style={{
            width: "100%",
            marginBottom: 30,
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <TouchableOpacity onPress={continueHandler} activeOpacity={0.7}>
            <LinearGradient
              style={{
                borderRadius: 10,
                height: 48,
                justifyContent: "center",
                alignItems: "center",

                width: "100%",
              }}
              colors={["#6D8AFC", "#B5C4FF"]}
            >
              {isPending ? (
                <ActivityIndicator color={colors.white} />
              ) : (
                <Text
                  style={{
                    color: colors.white,
                    fontFamily: constants.fontPopM,
                    fontSize: 16,
                  }}
                >
                  Continue
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </Shadow>
      </Card>
      <ResentOtpContainer isLogin={isLogin} number={number} />
    </View>
  );
};

export default VerifyBottomContainer;

const styles = StyleSheet.create({
  text1: {
    color: colors.font_color,
    fontSize: 14,
    fontFamily: constants.fontPopM,
    marginTop: Platform.OS == "android" ? 3 : 0,
    width: "100%",
    alignSelf: "flex-start",
    paddingLeft: 9,
    lineHeight: 18,
  },
  text2: {
    color: colors.font_color2,
    fontSize: 13,
    fontFamily: constants.fontPopR,
    marginTop: Platform.OS == "android" ? 3 : 0,
    alignSelf: "flex-start",
    paddingLeft: 9,
    alignItems: "center",
    lineHeight: 20,
  },
  text3: {
    color: colors.font_color3,
    fontSize: 13,
    fontFamily: constants.fontPopM,
    marginTop: Platform.OS == "android" ? 3 : 0,
    alignSelf: "flex-start",
    lineHeight: 20,
  },
});
