import { Box, Device, Image, Row, Text } from '@/core';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import Icon from '../ui/icon';

const ReviewItem = (props: propsType) => {
  const { review } = props;

  //i want to return like 1 Week ago
  const dateAgo = (date: string) => {
    const currentDate = new Date();
    const reviewDate = new Date(date);
    const diff = currentDate.getTime() - reviewDate.getTime();

    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const months = Math.floor(days / 30);
    const years = Math.floor(days / 365);

    if (minutes < 60) {
      return `${minutes} Minutes ago`;
    } else if (hours < 24) {
      return `${hours} Hours ago`;
    } else if (days < 7) {
      return `${days} Days ago`;
    } else if (days < 30) {
      return `${Math.floor(days / 7)} Week ago`;
    } else if (days < 365) {
      return `${months} Month${months > 1 ? 's' : ''} ago`;
    } else {
      return `${years} Year${years > 1 ? 's' : ''} ago`;
    }
  };

  return (
    <View>
      {review.rating.toFixed(1) < 1 ? null : (
        <Box style={{ flex: 1, padding: 16, gap: 15 }}>
          <Row style={{ flex: 1, gap: 20 }}>
            {
              <Image
                contentFit="cover"
                source={
                  review.user_details.image
                    ? {
                        uri: review.user_details.image,
                      }
                    : require('@/assets/images/empty_avatar.jpeg')
                }
                style={{ height: 38, width: 38, borderRadius: 20 }}
              />
            }
            <Box style={{ flex: 1 }}>
              <Text color="#333333" preset="POP_14_SB">
                {review.user_details.name || 'New User'}
              </Text>
              <Row style={{ justifyContent: 'space-between' }}>
                <Text color="rgba(51, 51, 51, 1)" preset="POP_12_R">
                  {dateAgo(review.created_on)}
                </Text>
                <Row style={{ gap: 5, alignItems: 'center' }}>
                  <Icon name="Star" size={12} fill={'#EFB603'} />
                  <Text preset="POP_14_R" color="#333333">
                    {review.rating.toFixed(1)}
                  </Text>
                </Row>
              </Row>
            </Box>
          </Row>
          <Text color="#333333" preset="POP_12_R">
            {review.reviewText}
          </Text>
          {review?.images?.length > 0 && (
            <Row
              style={{
                height: (Device.width - 64) / 2,
                width: '100%',
                borderRadius: 8,
              }}>
              {review?.images?.map((item, index) => (
                <Image
                  contentFit="cover"
                  source={{
                    uri: item?.image,
                  }}
                  style={{
                    flex: 1,
                  }}
                />
              ))}
            </Row>
          )}
        </Box>
      )}
    </View>
  );
};

export default ReviewItem;

const styles = StyleSheet.create({});
