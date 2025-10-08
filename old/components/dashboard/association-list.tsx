import { ScrollView, StyleSheet, ViewStyle, ImageStyle } from "react-native";
import React from "react";
import { Device } from "@/old/lib/device";
import { Image } from "expo-image";
import { Box, Row } from "@/core";
import { shadow } from "@/old/constants";

interface AssociationListProps {
  data: { image: string }[];
}

const AssociationList: React.FC<AssociationListProps> = ({ data }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <Row style={{ gap: 20, paddingHorizontal: 16 }}>
        {data.map((item, index) => (
          <Box
            key={index}
            style={[shadow, styles.shadowView, { backgroundColor: "grey" }]}
          >
            <Image
              contentFit="cover"
              source={require("@/assets/dummy/banner.png")}
              style={[shadow, styles.image]}
            />
            {/* <Image contentFit="cover" source={{ uri: item.image }} style={[shadow, styles.image]} /> */}
          </Box>
        ))}
      </Row>
    </ScrollView>
  );
};

export default AssociationList;

const styles = StyleSheet.create({
  shadowView: {
    marginBottom: 30,
    marginTop: 20,
    width: Device.width * 0.78,
    height: Device.width * 0.78 * 0.5,
    borderRadius: 10,
  } as ViewStyle,
  image: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
  } as ImageStyle,
});
