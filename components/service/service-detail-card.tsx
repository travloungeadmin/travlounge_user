import { Box, Device, Row, Text } from '@/core';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Extrapolation, interpolate, useSharedValue } from 'react-native-reanimated';
import Carousel, { Pagination } from 'react-native-reanimated-carousel';

import { shadow } from '@/constants';
import { colors } from '@/theme';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';

type propsType = {
  description: string;
  location: string;
  name: string;
  rating: number;
  images: string[];
  offerPercentage?: number;
};

const ServiceDetailCard = (props: propsType) => {
  const { description, location, name, rating = 5, images, offerPercentage } = props;
  const scrollOffsetValue = useSharedValue(0);
  const progress = useSharedValue<number>(0);

  const imageWidth = Device.width - 32;
  const imageHeight = 332;
  return (
    <Box
      style={[
        {
          borderRadius: 8,
          // overflow: "hidden",
          margin: 16,
          marginBottom: 20,
          backgroundColor: colors.cardBackgroundPrimary,
        },

        shadow,
      ]}>
      <Box>
        <Carousel
          loop={images?.length > 1}
          width={imageWidth}
          height={imageHeight}
          snapEnabled={true}
          pagingEnabled={true}
          autoPlay={images?.length > 1}
          autoPlayInterval={3000}
          onProgressChange={progress}
          data={images}
          defaultScrollOffsetValue={scrollOffsetValue}
          style={{ width: '100%', borderTopLeftRadius: 8, borderTopRightRadius: 8 }}
          renderItem={({ item }) => {
            return (
              <View>
                <Image
                  source={{ uri: item?.image }}
                  style={{
                    width: imageWidth,
                    height: imageHeight,
                  }}
                />
              </View>
            );
          }}
        />
        {images?.length > 1 && (
          <Box
            style={{
              backgroundColor: colors.cardBackgroundPrimary,
              paddingHorizontal: 5,
              paddingVertical: 5,
              borderRadius: 8,
              position: 'absolute',
              bottom: 10,
              alignSelf: 'center',
              zIndex: 1,
            }}>
            <Pagination.Custom<string>
              progress={progress}
              data={images}
              size={4}
              dotStyle={{
                borderRadius: 16,
                backgroundColor: colors.textSecondaryDisable,
              }}
              activeDotStyle={{
                borderRadius: 8,
                width: 6,
                height: 6,
                overflow: 'hidden',
                backgroundColor: colors.textSecondary,
              }}
              containerStyle={{
                justifyContent: 'center',
                gap: 5,
                alignItems: 'center',
              }}
              horizontal
              customReanimatedStyle={(progress, index, length) => {
                let val = Math.abs(progress - index);
                if (index === 0 && progress > length - 1) {
                  val = Math.abs(progress - length);
                }

                return {
                  transform: [
                    {
                      translateY: interpolate(val, [0, 1], [0, 0], Extrapolation.CLAMP),
                    },
                  ],
                };
              }}
              renderItem={() => (
                <Box
                  style={{
                    backgroundColor: colors.textPrimary,
                    flex: 1,
                  }}
                />
              )}
            />
          </Box>
        )}
      </Box>
      <Box style={{ padding: 16, paddingTop: 20 }}>
        <Text preset="POP_16_SB" color={colors.textPrimary}>
          {name}
        </Text>
        <Row style={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Text color={colors.textPrimary} preset="POP_14_M">
            {location}
          </Text>
          {/* <Row style={{ alignItems: "center", gap: 5 }}>
            <Icon name="Star" size={12} fill={colors.iconPrimary} />
            <Text color={colors.textPrimary} preset="POP_14_R">
              {rating}
            </Text>
          </Row> */}
        </Row>
        <Text preset="POP_12_R" color={colors.textPrimaryDescription} style={{ paddingTop: 16 }}>
          {description}
        </Text>

        {!!offerPercentage ? (
          <LinearGradient
            colors={['#2D60E3', '#253D8F']}
            style={{
              marginTop: 14,
              borderRadius: 4,
              padding: 10,
              flexDirection: 'row',
              gap: 8,
              alignItems: 'center',
            }}>
            <View style={{ gap: 8, flex: 1 }}>
              <Text preset="POP_14_SB" color="#FFFFFF">
                Get up to {offerPercentage}% OFF
              </Text>
              <Text preset="POP_12_R" color="#FFFFFF">
                Exclusive car wash offers available for you. Limited-time offer!
              </Text>
            </View>
            <Text preset="POP_32_SB" color="#FFCC02">
              {offerPercentage}%
            </Text>
          </LinearGradient>
        ) : null}
      </Box>
    </Box>
  );
};

export default ServiceDetailCard;

const styles = StyleSheet.create({});
