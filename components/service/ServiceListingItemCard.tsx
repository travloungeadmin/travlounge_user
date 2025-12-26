import { Image } from '@/lib/Image';
import { moderateScale } from '@/lib/responsive-dimensions';
import { SPACING } from '@/newConstants/spacing';
import { useTheme } from '@/newTheme';
import { EvilIcons, FontAwesome } from '@expo/vector-icons';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '../common/ThemedText';
import { ThemedView } from '../common/ThemedView';
import Icon from '../ui/icon';
import { convertDistance } from './service-details/utils';

interface ServiceListingItemCardProps {
  isFavorite?: boolean;
  name: string;
  distance: string | number;
  place: string;
  rating: string | number;
  images: { id: number; image: string }[];
  onPress: () => void;
  isPartner?: boolean;
  offerPercentage?: string | number;
}

const ServiceListingItemCard = ({
  isFavorite,
  name,
  distance,
  place,
  rating,
  images,
  onPress,
  isPartner,
  offerPercentage,
}: ServiceListingItemCardProps) => {
  const { theme } = useTheme();

  return (
    <Pressable onPress={onPress}>
      <ThemedView style={styles.container} backgroundColor="white">
        <Image style={styles.image} source={{ uri: images?.[0]?.image || '' }}>
          {/* <Pressable>
            <BlurView style={styles.favoriteButton}>
              <FontAwesome
                name={isFavorite ? 'heart' : 'heart-o'}
                size={moderateScale(24)}
                color={isFavorite ? theme.error : theme.white}
              />
            </BlurView>
          </Pressable> */}
          {isPartner && (
            <View style={[styles.subscriptionBadge, { backgroundColor: theme.primary }]}>
              <Icon name="PartnerIcon" size={14} />
              <ThemedText variant="titleSmall" color="white">
                Travlounge Partner
              </ThemedText>
            </View>
          )}
          {!!offerPercentage && (
            <View
              style={{
                position: 'absolute',
                top: 20,
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
              <ThemedText variant="bodySmall" style={{ color: '#253D8F' }}>
                <ThemedText variant="bodySmallEmphasized" style={{ color: '#253D8F' }}>
                  {offerPercentage}%
                </ThemedText>{' '}
                Off for you
              </ThemedText>
            </View>
          )}
        </Image>
        <View style={styles.contentContainer}>
          <View
            style={[
              styles.headerRow,
              {
                gap: moderateScale(10),
                flex: 1,
                borderBottomColor: theme.gray100,
              },
            ]}>
            <ThemedText
              style={{ flex: 1 }}
              numberOfLines={1}
              variant="titleEmphasized"
              color="gray900">
              {name}
            </ThemedText>
            <ThemedText variant="labelLargeEmphasized" color="gray900">
              {/* {distance} KM */}
              {convertDistance(Number(distance))}
            </ThemedText>
          </View>
          <View style={styles.detailsRow}>
            <View style={[styles.infoContainer, { flex: 1, justifyContent: 'flex-start' }]}>
              <EvilIcons name="location" size={moderateScale(16)} color={theme.gray600} />
              <ThemedText numberOfLines={1} variant="bodySmall" color="gray600">
                {place}
              </ThemedText>
            </View>
            <View style={styles.infoContainer}>
              <ThemedText numberOfLines={1} variant="body" color="gray900">
                {rating}
              </ThemedText>
              <FontAwesome name="star" size={moderateScale(16)} color={theme.secondary500} />
            </View>
          </View>
        </View>
      </ThemedView>
    </Pressable>
  );
};

export default ServiceListingItemCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: moderateScale(8),
    overflow: 'hidden',
  },
  image: {
    height: SPACING.screenWidth * 0.58,
  },
  favoriteButton: {
    position: 'absolute',
    top: moderateScale(8),
    right: moderateScale(8),
    overflow: 'hidden',
    height: moderateScale(40),
    width: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(5),
  },
  contentContainer: {
    paddingHorizontal: moderateScale(10),
  },
  headerRow: {
    borderBottomWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: moderateScale(5),
  },
  detailsRow: {
    gap: moderateScale(30),
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoContainer: {
    paddingVertical: moderateScale(5),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: moderateScale(5),
  },
  subscriptionBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(5),
    position: 'absolute',
    bottom: -2,
    left: 0,
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(4),
    borderTopRightRadius: moderateScale(8),
  },
});
