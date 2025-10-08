import { StyleSheet, Text, View, FlatList } from "react-native";
import React from "react";
import QRCard from "@/old/components/qr/qr-card";

const QRContainer = (props) => {
  const { data } = props;

  return (
    <View>
      <FlatList
        data={data}
        renderItem={({ item, index }) => <QRCard item={item} />}
        keyExtractor={(item, index) => index.toString()}
        ListFooterComponent={() => <View style={{ height: 70 }} />}
        ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
      />
    </View>
  );
};

export default QRContainer;

const styles = StyleSheet.create({});
