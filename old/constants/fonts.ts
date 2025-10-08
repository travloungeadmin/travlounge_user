import { StyleSheet } from "react-native";
import { moderateScale } from "../lib/responsive-dimensions";

export const FONTS = StyleSheet.create({
  POP_12_R: {
    fontFamily: "Poppins",
    fontSize: moderateScale(12),
    fontWeight: "regular",
  },
  POP_14_M: {
    fontFamily: "Poppins",
    fontSize: moderateScale(14),
    fontWeight: "medium",
  },
  POP_17_R: {
    fontFamily: "Poppins",
    fontSize: moderateScale(17),
    fontWeight: "regular",
  },
  POP_17_B: {
    fontFamily: "Poppins",
    fontSize: moderateScale(17),
    fontWeight: "bold",
  },
});
