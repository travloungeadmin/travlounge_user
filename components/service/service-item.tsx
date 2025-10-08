import Icon from '@/components/ui/icon';
import { shadow } from '@/constants';
import { Box, Device, Row, Text } from '@/core';
import { colors } from '@/theme';
import { getRating } from '@/utils/string';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Extrapolation, interpolate, useSharedValue } from 'react-native-reanimated';

interface ServiceItemProps {
  item: {
    id: string;
    display_name: string;
    images: { image: string }[];
    distance: number;
    average_rating: number;
  };
  index: number;
  isSleepingPod?: boolean;
  service: string;
  serviceName?: string;
}

const ServiceItem: React.FC<ServiceItemProps> = ({
  item,
  index,
  isSleepingPod,
  service,
  serviceName,
}) => {
  const scrollOffsetValue = useSharedValue(0);
  const progress = useSharedValue<number>(0);

  const convertDistance = (distance: number) => {
    if (distance >= 1) {
      return `${distance.toFixed(1)} km`;
    } else {
      return `${Math.round(distance * 1000)} m`;
    }
  };

  const imageWidth = Device.width - 32;
  const imageHeight = Device.width * 0.75;

  const handlePress = () =>
    router.navigate({
      pathname: '/services/service-details',
      params: {
        isPartner: item?.is_partner,
        serviceName: serviceName,
        service: service,
        id: item.id,
        name: item.display_name,
        ...(isSleepingPod ? { isSleepingPod } : {}),
      },
    });

  const onConfigurePanGesture = (g: { enabled: (arg0: boolean) => any }) => {
    'worklet';
    g.enabled(false);
  };
  const renderItem = ({ item }: { item: { image: string } }) => (
    <Image source={{ uri: item?.image }} style={styles.image} />
  );
  const customReanimatedStyle = (progress: number, index: number, length: number) => {
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
  };

  const renderPaginationItem = (item: { color: any }) => (
    <View style={{ backgroundColor: item.color, flex: 1 }} />
  );

  return (
    <Pressable onPress={handlePress} style={[shadow, styles.pressable]} key={index}>
      <Box style={styles.box}>
        {item?.is_partner && (
          <View
            style={{
              position: 'absolute',
              top: 20,
              right: 0,
              backgroundColor: 'rgba(37, 61, 143, 1)',
              height: 32,
              zIndex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              paddingHorizontal: 12,
              borderTopLeftRadius: 30,
              borderBottomLeftRadius: 30,
            }}>
            <Icon name="PartnerIcon" size={14} />
            <Text preset="POP_12_M" color="#FFFFFF">
              Travlounge Partner
            </Text>
          </View>
        )}
        {/* <Carousel
          loop={false}
          width={imageWidth}
          height={imageHeight}
          snapEnabled={true}
          pagingEnabled={true}
          autoPlayInterval={2000}
          data={item?.images?.map((image) => ({ color: 'transparent', ...image }))}
          onProgressChange={progress}
          defaultScrollOffsetValue={scrollOffsetValue}
          style={styles.carousel}
          onConfigurePanGesture={onConfigurePanGesture}
          renderItem={renderItem}
        /> */}
        <Image source={{ uri: item?.images?.[0]?.image }} style={styles.image} />
        <LinearGradient style={styles.linearGradient} colors={['transparent', '#000']}>
          <Row style={styles.row}>
            <Text color={colors.textTertiary} preset="POP_14_SB">
              {item.display_name}
            </Text>

            {/* {item?.images?.length > 1 && (
              <Pagination.Custom<{ color: string }>
                progress={progress}
                data={item.images.map((image) => ({ color: 'transparent', ...image }))}
                size={4}
                dotStyle={styles.dotStyle}
                activeDotStyle={styles.activeDotStyle}
                containerStyle={styles.paginationContainer}
                horizontal
                customReanimatedStyle={customReanimatedStyle}
                renderItem={renderPaginationItem}
              />
            )} */}
          </Row>
          <Box style={styles.infoBox}>
            {isSleepingPod ? (
              <Row gap={10}>
                <Box style={styles.infoRow}>
                  <Icon fill={colors.iconTertiary} size={14} name="Star" />
                  <Text color={colors.textTertiary} preset="POP_14_R">
                    {getRating(item.average_rating || 5)}
                  </Text>
                </Box>
                <Box style={styles.infoRow}>
                  <Icon fill={colors.iconQuaternary} size={12} name="Pin" />
                  <Text color={colors.textTertiaryDescription} preset="POP_12_R">
                    {item.place}
                  </Text>
                </Box>
              </Row>
            ) : (
              <Box style={styles.infoRow}>
                <Icon fill={colors.iconQuaternary} size={12} name="Pin" />
                <Text color={colors.textTertiaryDescription} preset="POP_12_R">
                  {convertDistance(item.distance)} away
                </Text>
              </Box>
            )}
            {!isSleepingPod && (
              // <Text preset="POP_18_SB" color="#fff">
              //     ₹ {item.price}
              // </Text>

              <Box style={styles.infoRow}>
                <Icon fill={colors.iconTertiary} size={14} name="Star" />
                <Text color={colors.textTertiary} preset="POP_14_R">
                  {getRating(item.average_rating || 5)}
                </Text>
              </Box>
            )}
          </Box>
        </LinearGradient>
      </Box>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    borderRadius: 8,
  },
  box: {
    width: Device.width - 32,
    height: Device.width * 0.75,
    borderRadius: 8,
  },
  carousel: {
    width: '100%',
  },
  image: {
    width: Device.width - 32,
    height: Device.width * 0.75,
    borderRadius: 8,
  },
  linearGradient: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 40,
    padding: 16,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  row: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dotStyle: {
    borderRadius: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  activeDotStyle: {
    borderRadius: 8,
    width: 6,
    height: 6,
    overflow: 'hidden',
    backgroundColor: colors.textTertiary,
  },
  paginationContainer: {
    justifyContent: 'center',
    gap: 5,
    alignItems: 'center',
  },
  infoBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
  },
});

export default ServiceItem;
