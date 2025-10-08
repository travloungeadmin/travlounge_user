import React from 'react';
import { StyleSheet, View } from 'react-native';

import { shadow } from '@/constants';
import { Image, Text } from '@/core';

const CarwashDetailCard = (props: {
  name: string;
  place: string;
  vehicleType: string;
  date: string;
  timeslot: string;
  features?: string;
  image: string;
}) => {
  const { name, place, vehicleType, date, timeslot, features, image } = props;
  return (
    <View
      style={[
        { backgroundColor: '#FFFFFF', margin: 16, padding: 16, borderRadius: 8, gap: 18 },
        shadow,
      ]}>
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <Image
          source={{ uri: image as string }} // Replace with actual image URL
          style={{ width: 47, height: 47, borderRadius: 4 }}
        />
        <View style={{ justifyContent: 'space-evenly' }}>
          <Text preset="POP_16_SB" color="#333333">
            {name}
          </Text>
          <Text preset="POP_12_R" color="#333333">
            {place}
          </Text>
        </View>
      </View>
      <View style={{ backgroundColor: 'rgba(37, 61, 143, 0.3)', height: 1 }} />
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <View style={{ gap: 4 }}>
          <Text preset="POP_12_M" color="rgba(34, 49, 63, 0.8)">
            Vehicle
          </Text>
          <Text preset="POP_14_M" color="#000">
            {vehicleType}
          </Text>
        </View>
        <View style={{ gap: 4 }}>
          <Text preset="POP_12_M" color="rgba(34, 49, 63, 0.8)">
            Date
          </Text>
          <Text preset="POP_14_M" color="#000">
            {date}
          </Text>
        </View>
        <View style={{ gap: 4 }}>
          <Text preset="POP_12_M" color="rgba(34, 49, 63, 0.8)">
            Time Slot
          </Text>
          <Text preset="POP_14_M" color="#000">
            {timeslot}
          </Text>
        </View>
      </View>
      <View style={{ gap: 4 }}>
        <Text preset="POP_12_M" color="rgba(34, 49, 63, 0.8)">
          Special Features
        </Text>
        <Text preset="POP_14_M" color="#000">
          {features}
        </Text>
      </View>
    </View>
  );
};

export default CarwashDetailCard;

const styles = StyleSheet.create({});
