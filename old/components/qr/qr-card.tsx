import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ActivityIndicator,
  Modal,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { Shadow } from "react-native-shadow-2";

import QRCode from "react-native-qrcode-svg";
import DashedLine from "react-native-dashed-line";

import { getCurrentTimePlusOneHour } from "@/old/utils/dateUtils";
import { router } from "expo-router";
import { qrCheckMutation } from "@/services/query/qr";
import { LinearGradient } from "expo-linear-gradient";
import { colors, constants } from "@/old/constants";

const window = Dimensions.get("window");

const QRCard = ({ item }) => {
  const [isQRModalVisible, setIsQRModalVisible] = React.useState(false);
  // const currentTime = getCurrentTimePlusOneHour();
  const expiryDate = getCurrentTimePlusOneHour();
  const { mutate, isPending } = qrCheckMutation();

  const generateHandler = () => {
    const data = { service_type: item.id };
    mutate(data, {
      onSuccess: (res) => {
        setIsQRModalVisible(true);
      },
      onError: (err) => {
        router.navigate("/old/wallet");
      },
    });
  };

  const qrData = `10,${item?.type},${item?.id.toString()},m`;
  const QRCodeModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={isQRModalVisible}
        onRequestClose={() => {
          setIsQRModalVisible(false);
        }}
      >
        <View
          onTouchStart={() => setIsQRModalVisible(false)}
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          }}
        >
          <Shadow>
            <LinearGradient
              colors={["#F3F7FA", "#DDE0E5"]}
              angle={169}
              style={{
                // height: 500,
                width: "100%",
                borderRadius: 10,
                overflow: "hidden",
                // flexDirection: 'row',
              }}
            >
              <View
                style={{
                  padding: 30,
                  width: window.width - 40,
                  height: window.width - 40,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <QRCode
                  value={qrData}
                  size={window.width - 100}
                  color={colors.black}
                  backgroundColor="transparent"
                  // fgColor='white'
                />
              </View>
              <DashedLine dashThickness={1} dashGap={5} dashColor="gray" />

              <View
                style={{
                  flexDirection: "row",
                  paddingHorizontal: 15,
                  gap: 10,
                }}
              >
                <View
                  style={{
                    height: 108,
                    width: 108,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Image
                    source={require("@/old/assets/images/tolooo.png")}
                    style={{ height: 50, width: 100 }}
                  />
                </View>
                <View style={{ paddingVertical: 20, flex: 1 }}>
                  <Text
                    style={{
                      color: "#00205B",
                      fontFamily: constants.fontPopSB,
                      fontSize: 14,
                    }}
                  >
                    {item.serviceType_name}
                  </Text>
                  <Text
                    numberOfLines={1}
                    ellipsizeMode="tail"
                    style={{
                      color: "#00205B",
                      fontFamily: constants.fontPopR,
                      fontSize: 12,
                      opacity: 0.75,
                      marginBottom: 7,
                    }}
                  >
                    {item.remaining == 0
                      ? item.description
                      : `${item.remaining} usage available`}
                  </Text>
                  <Text
                    style={{
                      color: "#00205B",
                      fontFamily: constants.fontRobM,
                      fontSize: 12,
                    }}
                  >
                    {item.remaining == 0
                      ? `₹ ${item.amount}`
                      : `valid till ${expiryDate}`}
                  </Text>
                </View>
              </View>
            </LinearGradient>
          </Shadow>
        </View>
      </Modal>
    );
  };
  return (
    <View
      style={{
        marginVertical: 15,
        width: window.width,
        justifyContent: "center",
        alignItems: "center",
        height: 90,
      }}
    >
      <Shadow distance={5}>
        <LinearGradient
          colors={["#F3F7FA", "#DDE0E5"]}
          angle={169}
          style={{
            // height: 500,
            width: "100%",
            borderRadius: 10,
            overflow: "hidden",
            // flexDirection: 'row',
          }}
        >
          <QRCodeModal />
          {/* <DashedLine dashThickness={1} dashGap={5} dashColor='gray' /> */}

          <TouchableOpacity
            onPress={generateHandler}
            activeOpacity={0.7}
            style={{
              flexDirection: "row",
              paddingHorizontal: 15,
              gap: 20,
              width: window.width - 40,
            }}
          >
            <View
              style={{
                height: 108,
                width: 108,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Image
                source={require("@/old/assets/images/tolooo.png")}
                style={{ height: 50, width: 100 }}
              />
            </View>
            <View style={{ paddingVertical: 20, flex: 1 }}>
              <Text
                style={{
                  color: "#00205B",
                  fontFamily: constants.fontPopSB,
                  fontSize: 14,
                }}
              >
                {item.serviceType_name}
              </Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  color: "#00205B",
                  fontFamily: constants.fontPopR,
                  fontSize: 12,
                  opacity: 0.75,
                  marginBottom: 7,
                }}
              >
                {item.remaining == 0
                  ? item.description
                  : `${item.remaining} usage available`}
              </Text>
              <Text
                style={{
                  color: "#00205B",
                  fontFamily: constants.fontRobM,
                  fontSize: 12,
                }}
              >
                {item.remaining == 0
                  ? `₹ ${item.amount}`
                  : `valid till ${expiryDate}`}
              </Text>
            </View>
          </TouchableOpacity>
        </LinearGradient>
      </Shadow>
    </View>
  );
};

export default QRCard;

const styles = StyleSheet.create({});
