import { StyleSheet } from 'react-native';
import React from 'react';
import { Box, Device, Row, Text } from '@/core';
import { Image } from 'expo-image';
import Icon from '../ui/icon';

const ReviewItem = () => {
  return (
    <Box style={{ flex: 1, padding: 16, gap: 15 }}>
      <Row style={{ flex: 1, gap: 20 }}>
        <Image
          source={{
            uri: 'https://pbs.twimg.com/profile_images/1652302478346690563/7H-8y-OE_400x400.jpg',
          }}
          style={{ height: 38, width: 38, borderRadius: 20 }}
        />
        <Box style={{ flex: 1 }}>
          <Text color="#333333" preset="POP_14_SB">
            User name
          </Text>
          <Row style={{ justifyContent: 'space-between' }}>
            <Text color="rgba(51, 51, 51, 1)" preset="POP_12_R">
              1 Week ago
            </Text>
            <Row style={{ gap: 5, alignItems: 'center' }}>
              <Icon name="Star" size={12} fill={'#EFB603'} />
              <Text preset="POP_14_R" color="#333333">
                5.0
              </Text>
            </Row>
          </Row>
        </Box>
      </Row>
      <Text color="#333333" preset="POP_12_R">
        Epicurean Escape blew me away! The farm-to-table concept is executed perfectly. The grilled
        salmon was fresh and flavorful. A hidden gem in the city!
      </Text>
      <Image
        contentFit="cover"
        source={{
          uri: 'https://pbs.twimg.com/profile_images/1652302478346690563/7H-8y-OE_400x400.jpg',
        }}
        style={{
          height: (Device.width - 64) / 2,
          width: '100%',
          borderRadius: 8,
        }}
      />
    </Box>
  );
};

export default ReviewItem;

const styles = StyleSheet.create({});
