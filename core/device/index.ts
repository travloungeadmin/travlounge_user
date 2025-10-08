import { Dimensions } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

export const Device = {
  height: deviceHeight,
  width: deviceWidth,
};
