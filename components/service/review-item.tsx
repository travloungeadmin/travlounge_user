import { Box, Device, Image, Row } from '@/core';
import React from 'react';
import { StyleSheet, View } from 'react-native';

import { useTheme } from '@/hooks/useTheme';
import { ThemedText } from '../common/ThemedText';
import Icon from '../ui/icon';

const ReviewItem = (props: any) => {
  const { review } = props;
  const { theme } = useTheme();

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
              <ThemedText color="gray900" variant="bodySmallEmphasized">
                {review.user_details.name || 'New User'}
              </ThemedText>
              <Row style={{ justifyContent: 'space-between' }}>
                <ThemedText color="gray700" variant="label">
                  {dateAgo(review.created_on)}
                </ThemedText>
                <Row style={{ gap: 5, alignItems: 'center' }}>
                  <Icon name="Star" size={12} fill={'#EFB603'} />
                  <ThemedText variant="bodySmall" color="gray900">
                    {review.rating.toFixed(1)}
                  </ThemedText>
                </Row>
              </Row>
            </Box>
          </Row>
          <ThemedText color="gray900" variant="label">
            {review.reviewText}
          </ThemedText>
          {review?.images?.length > 0 && (
            <Row
              style={{
                height: (Device.width - 64) / 2,
                width: '100%',
                borderRadius: 8,
              }}>
              {review?.images?.map((item: any, index: number) => (
                <Image
                  key={index}
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
