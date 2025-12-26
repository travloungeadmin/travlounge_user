import { shadow } from '@/constants';
import { Box, Row } from '@/core';
import { useTheme } from '@/hooks/useTheme';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import { ThemedText } from '../common/ThemedText';
import Icon from '../ui/icon';
import ReviewItem from './review-item';

type propsType = {
  reviews: any;
  averageRating: number | null;
  image: string;
  name: string;
  location: string;
  id: number | string;
};

const ReviewCard = (props: propsType) => {
  const { reviews, averageRating, image, name, location, id } = props;
  const { theme } = useTheme();

  const router = useRouter();
  return (
    <Box
      style={[
        {
          backgroundColor: theme.backgroundTop,
          // marginTop: 30,
          marginHorizontal: 16,
          borderRadius: 8,
          //   padding: 16,
        },
        shadow,
      ]}>
      <Row
        style={{
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 16,
          borderBottomWidth: 1,
          borderColor: 'rgba(37, 61, 143, 0.2)',
        }}>
        <Box>
          <ThemedText variant="headline" color="gray900">
            Reviews
          </ThemedText>
          <Row style={{ gap: 5, alignItems: 'center' }}>
            <Icon name="Star" size={12} fill={'#EFB603'} />
            <ThemedText variant="bodySmall" color="gray900">
              {averageRating?.toFixed(1) || 5}
            </ThemedText>
          </Row>
        </Box>
        <Pressable
          onPress={() =>
            router.navigate({
              pathname: '/services/add-review',
              params: {
                id: id,
                name: name,
                location: location,
                image: image,
              },
            })
          }
          style={{
            backgroundColor: theme.primary,
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
            paddingHorizontal: 16,
          }}>
          <ThemedText variant="bodySmall" color="white">
            Add Review
          </ThemedText>
        </Pressable>
      </Row>

      {reviews?.map((item) => <ReviewItem review={item} />)}

      {/* <Pressable
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
      </Pressable> */}
    </Box>
  );
};

export default ReviewCard;

const styles = StyleSheet.create({});
