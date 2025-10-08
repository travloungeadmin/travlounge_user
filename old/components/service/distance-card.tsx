import { StyleSheet } from "react-native";
import React from "react";
import { Box, Row } from "@/core";
import { shadow } from "@/old/constants";
import { Text } from "@/core";
import { useTheme } from "@/old/lib/theme";
import Icon from "../ui/icon";

const DistanceCard = () => {
  const { theme } = useTheme();
  return (
    <Box style={{ paddingHorizontal: 16 }}>
      <Row
        style={[
          shadow,
          {
            backgroundColor: theme.backgroundSecondary,
            padding: 16,
            borderRadius: 8,
            justifyContent: "space-between",
          },
        ]}
      >
        <Box>
          <Text preset="POP_16_SB" color="#333333">
            14 min
          </Text>
          <Text preset="POP_12_R" color="rgba(51, 51, 51, 51)">
            2.05 Km away
          </Text>
        </Box>
        <Row style={{ alignItems: "center" }}>
          <Icon name="Pin" size={12} fill="rgba(37, 61, 143, 1)" />
          <Text preset="POP_16_SB" color="rgba(37, 61, 143, 1)">
            View Map
          </Text>
        </Row>
      </Row>
    </Box>
  );
};

export default DistanceCard;

const styles = StyleSheet.create({});
