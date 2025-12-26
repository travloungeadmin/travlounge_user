import Icon from '@/components/ui/icon';
import { shadow } from '@/constants';
import { Box, Device, Row } from '@/core';
import { useTheme } from '@/hooks/useTheme';
import { getRating } from '@/utils/string';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { Extrapolation, interpolate, useSharedValue } from 'react-native-reanimated';
import { ThemedText } from '../common/ThemedText';

interface ServiceItemProps {
  item: {
    id: string;
    display_name: string;
    images: { image: string }[];
    distance: number;
    average_rating: number;
    is_partner?: boolean;
    place?: string;
  };
  index: number;
  isSleepingPod?: boolean;
  service: string;
  serviceName?: string;
  offerPercentage?: number;
}

const ServiceItem: React.FC<ServiceItemProps> = ({
  item,
  index,
  isSleepingPod,
  service,
  serviceName,
  offerPercentage,
}) => {
  const scrollOffsetValue = useSharedValue(0);
  const progress = useSharedValue<number>(0);
  const { theme } = useTheme();

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
            <ThemedText variant="bodySmall" color="white">
              Travlounge Partner
            </ThemedText>
          </View>
        )}
        {!!offerPercentage && (
          <View
            style={{
              position: 'absolute',
              top: 62,
              right: 0,
              backgroundColor: '#FFCC02',
              height: 26,
              zIndex: 1,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              paddingHorizontal: 12,
              borderTopLeftRadius: 30,
              borderBottomLeftRadius: 30,
            }}>
            <ThemedText variant="bodySmall" color="primary">
              <ThemedText
                style={{ fontWeight: '600' }}
                variant="bodySmallEmphasized"
                color="primary">
                {offerPercentage}%
              </ThemedText>{' '}
              Off for you
            </ThemedText>
          </View>
        )}
        <Image source={{ uri: item?.images?.[0]?.image }} style={styles.image} />
        <LinearGradient style={styles.linearGradient} colors={['transparent', '#000']}>
          <Row style={styles.row}>
            <ThemedText color="white" variant="bodySmallEmphasized">
              {item.display_name}
            </ThemedText>
          </Row>
          <Box style={styles.infoBox}>
            {isSleepingPod ? (
              <Row gap={10}>
                <Box style={styles.infoRow}>
                  <Icon fill={theme.primary} size={14} name="Star" />
                  <ThemedText color="white" variant="bodySmall">
                    {getRating(item.average_rating || 5)}
                  </ThemedText>
                </Box>
                <Box style={styles.infoRow}>
                  <Icon fill={theme.gray500} size={12} name="Pin" />
                  <ThemedText color="gray300" variant="label">
                    {item.place}
                  </ThemedText>
                </Box>
              </Row>
            ) : (
              <Box style={styles.infoRow}>
                <Icon fill={theme.gray500} size={12} name="Pin" />
                <ThemedText color="gray300" variant="label">
                  {convertDistance(item.distance)} away
                </ThemedText>
              </Box>
            )}
            {!isSleepingPod && (
              <Box style={styles.infoRow}>
                <Icon fill={theme.primary} size={14} name="Star" />
                <ThemedText color="white" variant="bodySmall">
                  {getRating(item.average_rating || 5)}
                </ThemedText>
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
    backgroundColor: 'rgba(255, 255, 255, 1)',
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
