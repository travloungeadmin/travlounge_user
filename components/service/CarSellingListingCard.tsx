import { useTheme } from '@/hooks/useTheme';
import { Image } from '@/lib/Image';
import { moderateScale } from '@/lib/responsive-dimensions';
import { SPACING } from '@/newConstants/spacing';
import { EvilIcons, FontAwesome } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { Pressable, StyleSheet, View } from 'react-native';
import { ThemedText } from '../common/ThemedText';
import { ThemedView } from '../common/ThemedView';

interface CarSellingListingCardProps {
  isFavorite: boolean;
  year: string | number;
  make: string;
  model: string;
  variant: string;
  price: string;
  kilometers: string | number;
  fuel: string;
  transmission: string;
  ownerCount: string | number;
  registrationPlace: string;
  sellerName: string;
  sellerPlace: string;
  images: string[];
  onPress: () => void;
  onComparePress?: () => void;
  isCompareSelected?: boolean;
  onPressFavorite?: () => void;
}

const CarSellingListingCard = ({
  isFavorite,
  year,
  make,
  model,
  variant,
  price,
  kilometers,
  fuel,
  transmission,
  ownerCount,
  registrationPlace,
  sellerName,
  sellerPlace,
  images,
  onPress,
  onComparePress,
  onPressFavorite,
  isCompareSelected = false,
}: CarSellingListingCardProps) => {
  const { theme } = useTheme();

  return (
    <Pressable onPress={onPress}>
      <ThemedView style={styles.container} backgroundColor="white">
        <View>
          <Image style={styles.image} source={{ uri: images?.[0] || '' }}>
            <Pressable onPress={onPressFavorite}>
              <BlurView style={styles.favoriteButton}>
                <FontAwesome
                  name={isFavorite ? 'heart' : 'heart-o'}
                  size={moderateScale(24)}
                  color={isFavorite ? theme.error : theme.white}
                />
              </BlurView>
            </Pressable>

            {/* <View style={[styles.subscriptionBadge, { backgroundColor: theme.primary }]}>
              <ThemedText variant="titleSmall" color="white">
                ₹12999 worth Travlounge subscription
              </ThemedText>
            </View> */}
          </Image>
        </View>

        <View style={styles.contentContainer}>
          {/* Title Row */}
          <View style={styles.titleRow}>
            <ThemedText variant="titleEmphasized" color="gray900">
              {year} {make} {model}
            </ThemedText>
            <ThemedText variant="body" color="gray500">
              {variant}
            </ThemedText>
          </View>

          <View style={styles.detailsRow}>
            <ThemedText variant="bodySmall" color="gray500">
              {kilometers} kms
            </ThemedText>
            <View style={[styles.dotSeparator, { backgroundColor: theme.gray400 }]} />
            <ThemedText variant="bodySmall" color="gray500">
              {fuel}
            </ThemedText>
            <View style={[styles.dotSeparator, { backgroundColor: theme.gray400 }]} />
            <ThemedText variant="bodySmall" color="gray500">
              {transmission}
            </ThemedText>
            <View style={[styles.dotSeparator, { backgroundColor: theme.gray400 }]} />
            <ThemedText variant="bodySmall" color="gray500">
              {ownerCount}
            </ThemedText>
            <View style={[styles.dotSeparator, { backgroundColor: theme.gray400 }]} />
            <ThemedText variant="bodySmall" color="gray500">
              {registrationPlace}
            </ThemedText>
          </View>

          <View style={[styles.priceRow, { borderBottomColor: theme.gray100 }]}>
            <ThemedText variant="titleEmphasized" color="gray900">
              ₹ {price}
            </ThemedText>
            {/* <Pressable onPress={onComparePress} style={styles.compareContainer}>
              <MaterialIcons
                name={isCompareSelected ? 'check-box' : 'check-box-outline-blank'}
                size={moderateScale(24)}
                color={theme.gray400}
              />
              <ThemedText variant="body" color="gray600">
                Compare
              </ThemedText>
            </Pressable> */}
          </View>

          <View style={styles.sellerRow}>
            <EvilIcons name="location" size={moderateScale(16)} color={theme.gray600} />
            <ThemedText variant="bodySmall" color="gray600">
              {sellerName}, {sellerPlace}
            </ThemedText>
          </View>
        </View>
      </ThemedView>
    </Pressable>
  );
};

export default CarSellingListingCard;

const styles = StyleSheet.create({
  container: {
    borderRadius: moderateScale(8),
    overflow: 'hidden',
  },
  image: {
    height: SPACING.screenWidth * 0.58,
    width: '100%',
  },
  favoriteButton: {
    position: 'absolute',
    top: moderateScale(12),
    right: moderateScale(12),
    overflow: 'hidden',
    height: moderateScale(40),
    width: moderateScale(40),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: moderateScale(8),
  },
  subscriptionBadge: {
    position: 'absolute',
    bottom: -2,
    left: 0,
    paddingHorizontal: moderateScale(12),
    paddingVertical: moderateScale(4),
    borderTopRightRadius: moderateScale(8),
  },
  paginationContainer: {
    position: 'absolute',
    bottom: moderateScale(20),
    right: moderateScale(12),
    flexDirection: 'row',
    gap: moderateScale(4),
  },
  paginationDot: {
    width: moderateScale(6),
    height: moderateScale(6),
    borderRadius: moderateScale(3),
  },
  contentContainer: {
    padding: moderateScale(12),
    paddingBottom: 0,
  },
  titleRow: {
    flexDirection: 'row',
    gap: moderateScale(8),
    alignItems: 'center',
  },
  detailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: moderateScale(4),
  },
  dotSeparator: {
    width: moderateScale(3),
    height: moderateScale(3),
    borderRadius: moderateScale(1.5),
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: moderateScale(12),
    borderBottomWidth: 1,
  },
  compareContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(4),
  },
  sellerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: moderateScale(4),
    paddingVertical: moderateScale(5),
  },
});
