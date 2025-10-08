import { Pressable, StyleSheet } from "react-native";
import React from "react";
import { Box, Row, Text } from "@/core";
import { shadow } from "@/old/constants";
import Icon from "../ui/icon";
import ReviewItem from "./review-item";

const ReviewCard = () => {
  return (
    <Box
      style={[
        {
          backgroundColor: "#F8FAFC",
          marginTop: 30,
          marginHorizontal: 16,
          borderRadius: 8,
          //   padding: 16,
        },
        shadow,
      ]}
    >
      <Row
        style={{
          justifyContent: "space-between",
          alignItems: "center",
          padding: 16,
          borderBottomWidth: 1,
          borderColor: "rgba(37, 61, 143, 0.2)",
        }}
      >
        <Box>
          <Text preset="POP_18_SB" color="#333333">
            Reviews
          </Text>
          <Row style={{ gap: 5, alignItems: "center" }}>
            <Icon name="Star" size={12} fill={"#EFB603"} />
            <Text preset="POP_14_R" color="#333333">
              5.0
            </Text>
          </Row>
        </Box>
        <Pressable
          style={{
            backgroundColor: "#253D8F",
            height: 30,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 15,
            paddingHorizontal: 16,
          }}
        >
          <Text preset="POP_14_M" color="#fff">
            Add Review
          </Text>
        </Pressable>
      </Row>

      <ReviewItem />

      <Pressable
        style={{
          margin: 20,
          borderWidth: 1,
          borderColor: "#253D8F",
          height: 30,
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 15,
          paddingHorizontal: 16,
          alignSelf: "center",
        }}
      >
        <Text color="#253D8F" preset="POP_14_R">
          Load More
        </Text>
      </Pressable>
    </Box>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({});
