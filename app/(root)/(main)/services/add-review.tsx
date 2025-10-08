import { shadow } from '@/constants';
import { Box, Image, Pressable, Row, Text, TextInput, useSafeAreaInsets } from '@/core';
import { colors } from '@/theme';
import React from 'react';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';

import Star from '@/assets/svgs/star.svg';
import UnStar from '@/assets/svgs/un-rated-star.svg';
import { requestCameraPermissions } from '@/core/permissions';
import { showSuccess } from '@/lib/toast';
import { addReviewMutation } from '@/services/query/service';
import * as ImagePicker from 'expo-image-picker';
import { useLocalSearchParams, useRouter } from 'expo-router';

const AddReview = () => {
  const { name, image, location, id } = useLocalSearchParams();
  const { mutate, isPending } = addReviewMutation();
  const router = useRouter();
  const { bottomHeight } = useSafeAreaInsets();

  const [userName, setUserName] = React.useState('');
  const [review, setReview] = React.useState('');
  const [rating, setRating] = React.useState(0);
  const [reviewImage, setReviewImage] = React.useState<string | null>(null);

  const camera = async () => {
    const permission = await requestCameraPermissions();

    if (!permission.granted) {
      await requestCameraPermissions();
      return null;
    }
    const result = await ImagePicker.launchCameraAsync({
      quality: 0.1,
    });

    if (!result.canceled) {
      return result.assets;
    }
    return null;
  };

  const pickPhoto = async () => {
    const result = await camera();
    if (result) {
      setReviewImage(result[0].uri);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Box style={[styles.box, shadow]}>
        <Row style={styles.row}>
          <Image contentFit="cover" source={{ uri: image }} style={styles.image} />
          <Box style={styles.textBox}>
            <Text preset="POP_16_SB" color={colors.textPrimary}>
              {name}
            </Text>
            <Text preset="POP_14_M" color={colors.textPrimary}>
              {location}
            </Text>
          </Box>
        </Row>
        <Box style={styles.divider} />
        <Box style={styles.contentBox}>
          {/* <TextInput
            type="outline"
            borderColor={colors.dividerPrimary}
            placeholder="Enter your name"
            style={styles.textInput}
            value={userName}
            onChangeText={(text) => setUserName(text)}
          /> */}
          {/* <Text preset="POP_14_R" color={colors.textPrimary}>
            Share images
          </Text> */}

          <TextInput
            value={review}
            onChangeText={(text) => setReview(text)}
            type="outline"
            borderColor={colors.dividerPrimary}
            placeholder="Enter your review"
            style={styles.reviewInput}
          />
          <Row>
            {[1, 2, 3, 4, 5].map((item, index) => (
              <Pressable onPress={() => setRating(index + 1)} key={item}>
                {rating >= index + 1 ? <Star /> : <UnStar />}
              </Pressable>
            ))}
          </Row>
          <Text preset="POP_14_R" color={colors.textPrimary}>
            Share images
          </Text>
          <Pressable style={styles.photoBox} onPress={pickPhoto}>
            <Image
              contentFit="cover"
              source={
                reviewImage ? { uri: reviewImage } : require('@/assets/images/empty-image.png')
              }
              style={reviewImage ? styles.fullImage : styles.emptyImage}
            />
          </Pressable>
        </Box>
        <Pressable
          onPress={() =>
            mutate(
              {
                id: id,
                review: review,
                image: reviewImage,
                rating: rating,
              },
              {
                onSuccess: () => {
                  showSuccess('Success', 'Review submitted successfully.');
                  router.back();
                },
              }
            )
          }
          style={styles.submitButton}>
          {isPending ? (
            <ActivityIndicator />
          ) : (
            <Text preset="POP_14_M" color={colors.textTertiary}>
              Submit
            </Text>
          )}
        </Pressable>
      </Box>
      <Box style={{ height: bottomHeight || 20 }} />
    </ScrollView>
  );
};

export default AddReview;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.backgroundPrimary,
    flex: 1,
  },
  box: {
    margin: 16,
    backgroundColor: colors.cardBackgroundPrimary,
    borderRadius: 8,
  },
  row: {
    gap: 16,
    padding: 16,
  },
  image: {
    width: 61,
    height: 61,
    borderRadius: 8,
  },
  textBox: {
    justifyContent: 'space-evenly',
  },
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: colors.dividerPrimary,
  },
  contentBox: {
    padding: 16,
    gap: 16,
  },
  textInput: {
    backgroundColor: '#fff',
    height: 40,
    borderRadius: 4,
    width: '100%',
  },
  reviewInput: {
    backgroundColor: '#fff',
    height: 200,
    borderRadius: 4,
    width: '100%',
  },
  photoBox: {
    width: 145,
    height: 145,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  fullImage: {
    width: '100%',
    height: '100%',
  },
  emptyImage: {
    width: 30,
    height: 30,
  },
  submitButton: {
    height: 45,
    backgroundColor: colors.buttonBackgroundPrimary,
    borderRadius: 23,
    margin: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
