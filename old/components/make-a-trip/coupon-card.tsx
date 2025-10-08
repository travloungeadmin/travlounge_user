import { StyleSheet, Text, View } from "react-native";
import React from "react";
import ContainerCard from "@/components/common/container-card";
import { moderateScale, scale } from "@/lib/responsive-dimensions";

import Icon from "@/components/ui/icon";
import { STRINGS } from "@/old/constants/strings";

interface Props {
  couponCode: string;
}

const CouponCard = (props: Props) => {
  const { couponCode } = props;
  return (
    <ContainerCard style={styles.containerCard}>
      <View
        style={{
          position: "absolute",
          top: scale(8),
          right: scale(6),
          opacity: 0.05,
        }}
      >
        <Icon fill="#00205B" name="Discount" size={scale(71)} />
      </View>
      <View style={styles.row}>
        <Icon fill="#00205B" name="Discount" size={scale(32)} />
        <View style={styles.textContainer}>
          <Text style={styles.couponTitle}>{STRINGS.COUPON}</Text>
          <Text style={styles.shareText}>{STRINGS.SHARE_THIS_CODE}</Text>
        </View>
      </View>
      <Text style={styles.codeText}>{couponCode}</Text>
    </ContainerCard>
  );
};

export default CouponCard;

const styles = StyleSheet.create({
  containerCard: {
    height: scale(119),
    paddingHorizontal: scale(20),
    justifyContent: "space-evenly",
  },
  row: {
    flexDirection: "row",
    gap: scale(10),
  },
  textContainer: {
    justifyContent: "space-between",
  },
  couponTitle: {
    fontFamily: "Poppins",
    fontSize: moderateScale(16),
    fontWeight: "semibold",
    color: "#00205B",
  },
  shareText: {
    fontFamily: "Poppins",
    fontSize: moderateScale(13),
    fontWeight: "regular",
    color: "rgba(0, 32, 91, 0.75)",
  },
  codeText: {
    fontFamily: "Poppins",
    fontSize: moderateScale(16),
    fontWeight: "bold",
    color: "rgba(0, 32, 91, 0.75)",
  },
});
