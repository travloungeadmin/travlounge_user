import { shadow } from '@/constants';
import { Box, Row, Text } from '@/core';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
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

  const router = useRouter();
  return (
    <Box
      style={[
        {
          backgroundColor: '#F8FAFC',
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
          <Text preset="POP_18_SB" color="#333333">
            Reviews
          </Text>
          <Row style={{ gap: 5, alignItems: 'center' }}>
            <Icon name="Star" size={12} fill={'#EFB603'} />
            <Text preset="POP_14_R" color="#333333">
              {averageRating?.toFixed(1) || 5}
            </Text>
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
            backgroundColor: '#253D8F',
            height: 30,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 15,
            paddingHorizontal: 16,
          }}>
          <Text preset="POP_14_M" color="#fff">
            Add Review
          </Text>
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
