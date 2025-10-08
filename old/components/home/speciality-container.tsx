import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import SpecialityItemCard from "@/old/components/home/speciality-item-card";
import { constants } from "@/old/constants";
import queryClient from "@/services/query";
import QUERIES_KEY from "@/services/query/query-keys";

// import queryClient from "../services/query";
// import QUERIES_KEY from "../services/query/query-keys";

const SpecialityContainer = () => {
  const { services } = queryClient.getQueryData([QUERIES_KEY.HOME]);
  const servicesList = services?.sort((a, b) => a.id - b.id);

  return (
    <View style={{ marginTop: 20 }}>
      <Text
        style={{
          fontFamily: constants.fontPopB,
          fontSize: 26,
          color: "#00205B",
          marginLeft: 15,
        }}
      >
        Our Specialities
      </Text>
      <FlatList
        data={servicesList}
        renderItem={({ item }) => <SpecialityItemCard item={item} />}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default SpecialityContainer;

const styles = StyleSheet.create({});
