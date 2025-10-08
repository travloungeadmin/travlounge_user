import { shadow } from '@/constants';
import { Box, Device, Image, Pressable, Row, Text } from '@/core';
import { colors } from '@/theme';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet } from 'react-native';

type PropsType = {
  item: any;
  isParent?: boolean;
  isStarted?: boolean;
};

const StationCard = ({ item, isParent, isStarted }: PropsType) => {
  const router = useRouter();

  const name = isStarted ? item.display_name : item?.listing?.contact_name;
  const images = isStarted ? item?.images : item?.listing?.image;
  const place = isStarted ? item?.place : item?.listing?.place;
  const distance = item?.distance;
  const offers = item?.offers;

  const convertMetresToKm = (distance: number) => {
    return distance < 1000 ? `${distance.toFixed(0)}m` : `${(distance / 1000).toFixed(2)}km`;
  };

  return (
    <Pressable
      onPress={() =>
        router.navigate({
          pathname: '/(root)/(main)/services/service-details',
          params: {
            id: item.id,
            name: item.display_name,
            ...(item?.is_sleeping_pod ? { isSleepingPod: 'true' } : {}),
          },
        })
      }
      style={[styles.container, shadow]}>
      {images?.length > 0 && (
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <Row style={styles.imageRow}>
            {images.map((image: string) => (
              <Box key={image} style={[styles.imageBox, shadow]}>
                <Image source={{ uri: image }} style={styles.image} />
              </Box>
            ))}
          </Row>
        </ScrollView>
      )}

      <Box style={styles.detailsContainer}>
        <Text color={colors.textPrimary} preset="POP_16_SB">
          {name}
        </Text>

        <Row style={styles.infoRow}>
          <Text color={colors.textPrimaryDescription} preset="POP_14_R">
            {place}
          </Text>
          {distance && (
            <Text color={colors.textPrimaryDescription} preset="POP_14_R">
              {convertMetresToKm(distance)}
            </Text>
          )}
        </Row>

        {isParent ? (
          <>
            {offers?.length > 0 && (
              <Text color={colors.textPrimary} preset="POP_14_R">
                {offers[0]}
              </Text>
            )}

            {offers?.length > 0 && (
              <Row style={styles.offersRow}>
                <Text color={colors.textPrimary} preset="POP_14_M">
                  {`${offers.length} offers more`}
                </Text>
                <Pressable
                  onPress={() =>
                    router.navigate({
                      pathname: '/(root)/(main)/make-a-trip/station',
                      params: { data: JSON.stringify(item) },
                    })
                  }>
                  <Text color={colors.textSecondary} preset="POP_14_B">
                    View all
                  </Text>
                </Pressable>
              </Row>
            )}
          </>
        ) : (
          offers?.map((offer: string, index: number) => (
            <Box key={index} style={styles.offerBox}>
              <Text color={colors.textPrimary} preset="POP_14_R">
                {offer}
              </Text>
            </Box>
          ))
        )}
      </Box>
    </Pressable>
  );
};

export default React.memo(StationCard);

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    backgroundColor: colors.cardBackgroundPrimary,
    borderRadius: 8,
  },
  imageRow: {
    gap: 16,
    padding: 16,
    paddingBottom: 14,
  },
  imageBox: {
    backgroundColor: colors.cardBackgroundPrimary,
    borderRadius: 8,
  },
  image: {
    width: Device.width * 0.68,
    height: Device.width * 0.58,
    borderRadius: 8,
  },
  detailsContainer: {
    gap: 10,
    padding: 16,
  },
  infoRow: {
    justifyContent: 'space-between',
  },
  offersRow: {
    justifyContent: 'space-between',
  },
  offerBox: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 4,
  },
});
