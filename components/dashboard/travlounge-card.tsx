import { Platform, Pressable, StyleSheet, View } from "react-native";
import React from "react";
import Icon from "@/components/ui/icon";

import { router } from "expo-router";
import { Box, Text } from "@/core";
import { shadow } from "@/constants";
import { colors } from "@/theme";

const TravloungeCard = () => {
  return (
    <Pressable
      onPress={() => router.navigate("/old/travlounge/home")}
      style={[
     
        {
          borderRadius: 8,
          marginHorizontal: 16,
          backgroundColor: colors.cardBackgroundSecondary,
          shadowColor: colors.cardBackgroundSecondary,
          shadowOpacity: 0.5,
        }, 
          shadow,
      ]}
    >
      <Box style={[styles.shadowView]}>
        <Box style={[styles.outerCircle, { backgroundColor: "#2A46A8" }]}>
          <Box style={[styles.middleCircle, { backgroundColor: "#3553BB" }]}>
            <Box style={[styles.innerCircle, { backgroundColor: "#385BD6" }]}>
              <Icon size={51} name="TravloungeIcon" />
            </Box>
          </Box>
        </Box>
        <Box style={styles.textContainer}>
          <Text preset="POP_16_M" color={colors.textTertiary}>
            Travlounge
          </Text>
          <Text preset="POP_12_R" color={colors.textTertiary}>
            explore all travlounge
          </Text>
        </Box>
        <Box style={styles.iconContainer}>
          <Icon stroke={colors.iconQuinary} size={24} name="ArrowRight" />
        </Box>
      </Box>
    </Pressable>
  );
};

export default TravloungeCard;

const styles = StyleSheet.create({
  shadowView: {
    paddingRight: 16,
    height: 76,
    borderRadius: 8,
    flexDirection: "row",
    overflow: "hidden",
  },
  outerCircle: {
    borderRadius: 120,
    height: 150,
    width: 150,
    marginLeft: -35,
    marginTop: -30,
  },
  middleCircle: {
    borderRadius: 90,
    height: 120,
    width: 120,
    marginTop: 10,
    marginLeft: 20,
  },
  innerCircle: {
    borderRadius: 76,
    height: 76,
    width: 76,
    marginLeft: 35,
    marginTop: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    gap: Platform.OS === "ios" ? 5 : 0,
    justifyContent: "center",
    marginLeft: 16,
    flex: 1,
  },
  iconContainer: {
    justifyContent: "center",
  },
});
