import { StyleSheet, FlatList, View, Text } from "react-native";
import React from "react";

import { constants } from "@/old/constants";
import queryClient from "@/services/query";
import QUERIES_KEY from "@/services/query/query-keys";
import OfferCard from "./offer-card";

const OfferCardContainer = () => {
  const { curr_offers } = queryClient.getQueryData([QUERIES_KEY.PROFILE]);
  return (
    <View>
      <Text
        style={{
          fontFamily: constants.fontPopM,
          fontSize: 18,
          color: "#00205B",
          textAlign: "center",
          textAlign: "left",
          marginLeft: 20,
          marginTop: 40,
        }}
      >
        Exciting offers for you
      </Text>
      <FlatList
        data={curr_offers}
        renderItem={({ item }) => (
          <View style={{ paddingVertical: 20 }}>
            <OfferCard item={item} />
          </View>
        )}
        ListHeaderComponent={() => <View style={{ marginLeft: 20 }} />}
        ListFooterComponent={() => <View style={{ marginRight: 20 }} />}
        ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default OfferCardContainer;

const styles = StyleSheet.create({});

//  [{"amount": "1500.00", "days": 30, "description": "Description of gold package", "id": 1, "package_name": "Gold", "package_services": [Array], "type": 1, "valid_for": [Array]}],
