import CarSellingListingCard from '@/components/service/CarSellingListingCard';
import { colors } from '@/theme';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import analytics from '@react-native-firebase/analytics';
import { LinearGradient } from 'expo-linear-gradient';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Dimensions, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Header from '@/components/header';
import useUserStore from '@/modules/user';
import {
  useToggleUsedCarsFavoriteMutation,
  useUsedCarDetailsQuery,
} from '@/services/query/used-cars';
import { UsedCarItem } from '@/types/api/used-cars.types';

const { width } = Dimensions.get('window');

const dummyImages = [
  'https://imgd.aeplcdn.com/1056x594/n/cw/ec/48542/e-class-exterior-front-view-2.jpeg?q=80',
  'https://imgd.aeplcdn.com/1056x594/n/cw/ec/48542/e-class-exterior-right-front-three-quarter.jpeg?q=80',
];

const ListingDetails = () => {
  const { user } = useUserStore();
  const router = useRouter();
  const params = useLocalSearchParams();
  const { id } = params;
  const { top, bottom } = useSafeAreaInsets();

  const { data: carData } = useUsedCarDetailsQuery(id as string) as { data: UsedCarItem };
  const { mutate: toggleFavorite } = useToggleUsedCarsFavoriteMutation();

  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (carData) {
      setIsFavorite(carData.is_favourite);
    }
  }, [carData]);

  const handleToggleFavorite = () => {
    setIsFavorite((prev) => !prev);
    toggleFavorite(id as string);
  };

  // Map API data
  const carDetails = {
    name: carData?.name || '',
    variant: carData?.car_model || '',
    kms: carData?.kms ? `${carData.kms} kms` : '',
    fuel: carData?.fuel || '',
    transmission: carData?.transmission || '',
    owner: carData?.ownership || '',
    rto: carData?.rto || carData?.place || '',
    price: carData?.price ? `₹ ${carData.price}` : '',
    location: carData?.place || '',
    seller: carData?.agent_details?.agency_name || '',
  };

  const overviewData = [
    { label: 'Registration year', value: carData?.year_of_manufacture?.toString() || '-' },
    { label: 'Insurance', value: carData?.insurance || '-' },
    { label: 'Fuel type', value: carData?.fuel || '-' },
    { label: 'Seats', value: carData?.number_of_seats ? `${carData.number_of_seats} Seats` : '-' },
    { label: 'Kms driven', value: carData?.kms ? `${carData.kms} kms` : '-' },
    { label: 'RTO', value: carData?.rto || '-' },
    { label: 'Ownership', value: carData?.ownership || '-' },
    { label: 'Transmission', value: carData?.transmission || '-' },
    { label: 'Year of manufactured', value: carData?.year_of_manufacture?.toString() || '-' },
  ];

  const featuresData = carData?.features || [];

  const specsData = carData?.specifications
    ? Object.entries(carData.specifications).map(([key, value]) => ({
        label: key.replace(/_/g, ' '),
        value: String(value),
      }))
    : [];

  const images = carData?.images || dummyImages;
  const packages = carData?.packages || [];

  useEffect(() => {
    analytics().logEvent('visited_listing', {
      user_id: String(user?.id || ''),
      user_name: user?.name || '',
      user_phone: user?.mobile_number || '',
      listing_id: id,
      listing_name: carData?.name,
      listing_type: 'Cars',
      is_partner: false,
      model: carData?.car_model || '',
      year: carData?.year_of_manufacture || '',
      seller_name: carData?.agent_details?.agency_name || '',
    });
  }, [id, carData?.agent_details?.agency_name]);

  return (
    <View style={styles.container}>
      <Header title={carDetails.name} back style={{ zIndex: 1, top: 0, right: 0, left: 0 }} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={{ padding: 16 }}>
          <CarSellingListingCard
            isFavorite={isFavorite}
            year={carData?.year_of_manufacture || ''}
            make={carData?.name || ''}
            model={carData?.car_model || ''}
            variant={carData?.variant || ''}
            price={carData?.price || ''}
            kilometers={carData?.kms || ''}
            fuel={carData?.fuel || ''}
            transmission={carData?.transmission || ''}
            ownerCount={carData?.ownership || ''}
            registrationPlace={carData?.rto || carData?.place || ''}
            sellerName={carData?.agent_details?.agency_name || ''}
            sellerPlace={carData?.place || ''}
            images={images}
            onPress={() => {}}
            onPressFavorite={handleToggleFavorite}
          />
        </View>

        {/* Gift Banner */}
        {/* {packages.length > 0 && (
          <View style={styles.giftBanner}>
            <View style={styles.giftContent}>
              <Text style={styles.giftTitle}>Gift of</Text>
              <Text style={styles.giftAmount}>₹ {packages.length * 5000}</Text>
              <Text style={styles.giftSubtitle}>Worth</Text>
              <Text style={styles.giftDescription}>Travlounge subscription with this car</Text>
            </View>
            <View style={styles.giftFooter}>
              <Text style={styles.giftFooterText}>Toloo 50</Text>
              <Text style={styles.giftFooterText}>Car wash 12</Text>
              <Text style={styles.giftFooterText}>Coffee 12</Text>
              <Text style={styles.giftFooterText}>Buffet 6</Text>
            </View>
          </View>
        )} */}

        {/* Car Overview */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Car Overview</Text>
          <View style={styles.overviewGrid}>
            {overviewData.map((item, index) => (
              <View key={index} style={styles.overviewItem}>
                <View style={styles.overviewIconPlaceholder}>
                  <MaterialCommunityIcons name="car-info" size={16} color="#666" />
                </View>
                <Text style={styles.overviewLabel}>{item.label}</Text>
                <Text style={styles.overviewValue}>{item.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Features */}
        {featuresData.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Features</Text>
            <View style={styles.featuresGrid}>
              {featuresData.map((feature, index) => (
                <View key={index} style={styles.featureItem}>
                  <Ionicons name="checkmark-circle-outline" size={20} color={'#34C759'} />
                  <Text style={styles.featureText}>{feature}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        {/* Specs */}
        {specsData.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Specifications</Text>
            <View style={{ gap: 12, marginTop: 10 }}>
              {specsData.map((spec, index) => (
                <View key={index} style={styles.specRow}>
                  <Text style={styles.specLabel}>{spec.label}</Text>
                  <Text style={styles.specValue}>{spec.value}</Text>
                </View>
              ))}
            </View>
          </View>
        )}

        <View style={{ height: 40 }} />
      </ScrollView>

      {/* Footer Button */}
      <View style={[styles.footer, { paddingBottom: bottom + 16 }]}>
        <Pressable
          onPress={() => {
            if (carData?.agent_details?.contact_number) {
              Linking.openURL(`tel:${carData.agent_details.contact_number}`);
            }
          }}>
          <LinearGradient
            colors={['#253D8F', '#4664cd']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientButton}>
            <MaterialCommunityIcons
              name="phone-in-talk"
              size={24}
              color="white"
              style={{ marginRight: 10 }}
            />
            <Text style={styles.contactBtnText}>Contact Seller Now</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
  );
};

const InspectionDonut = ({
  title,
  passed,
  issues,
}: {
  title: string;
  passed: number;
  issues: number;
}) => (
  <View style={styles.donutContainer}>
    <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 5 }}>
      <Text style={styles.donutTitle}>{title}</Text>
    </View>
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
      <AnimatedCircularProgress
        size={50}
        width={6}
        fill={(passed / (passed + issues)) * 100}
        tintColor={colors.buttonBackgroundPrimary}
        backgroundColor="#E0E0E0">
        {() => <View />}
      </AnimatedCircularProgress>
      <View>
        <Text style={styles.donutPassed}>{passed} Passed</Text>
        <Text style={styles.donutIssues}>{issues} Issues</Text>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(242, 244, 247, 1)',
  },
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    padding: 8,
    marginRight: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.textPrimary,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  locationText: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  actionButton: {
    padding: 8,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  carousel: {
    height: 250,
  },
  carouselImage: {
    width: width,
    height: 250,
  },
  section: {
    marginHorizontal: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
    marginBottom: 16,
  },
  carName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  variant: {
    fontWeight: '400',
    fontSize: 16,
    color: '#666',
  },
  tagRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  tagText: {
    fontSize: 13,
    color: '#666',
  },
  tagDot: {
    marginHorizontal: 4,
    color: '#666',
  },
  price: {
    fontSize: 22,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginTop: 8,
  },
  giftBanner: {
    backgroundColor: '#0056D2',
    marginHorizontal: 16,
    marginBottom: 16,
    borderRadius: 8,
    overflow: 'hidden',
  },
  giftContent: {
    padding: 16,
    alignItems: 'flex-start',
  },
  giftTitle: {
    color: '#FFD700',
    fontSize: 24,
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  giftAmount: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  giftSubtitle: {
    color: 'white',
    fontSize: 12,
  },
  giftDescription: {
    color: 'white',
    fontSize: 14,
    marginTop: 4,
  },
  giftFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#0044A5',
    padding: 10,
  },
  giftFooterText: {
    color: 'white',
    fontSize: 11,
  },
  inspectionCard: {
    margin: 16,
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    borderWidth: 1,
    borderColor: '#eee',
  },
  inspectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 8,
  },
  inspectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  progressBarBg: {
    height: 12,
    flex: 1,
    backgroundColor: '#E0EDFD',
    borderRadius: 6,
    marginRight: 12,
  },
  progressBarFill: {
    height: 100,
    backgroundColor: '#3366ff',
    borderRadius: 6,
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3366ff',
    marginLeft: 4,
  },
  inspectionDesc: {
    fontSize: 13,
    color: '#444',
    lineHeight: 18,
    marginBottom: 12,
  },
  sellerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sellerLocation: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  contactButton: {
    backgroundColor: '#2b52d4',
    borderRadius: 8,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  contactButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  donutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  donutContainer: {
    width: '48%',
  },
  donutTitle: {
    fontWeight: '600',
    fontSize: 14,
  },
  donutPassed: {
    color: '#34C759',
    fontSize: 12,
    fontWeight: 'bold',
  },
  donutIssues: {
    color: colors.textSecondary,
    fontSize: 12,
  },
  downloadRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  downloadText: {
    color: colors.buttonBackgroundPrimary,
    fontWeight: '600',
    fontSize: 14,
  },
  downloadSub: {
    color: '#666',
    fontSize: 12,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.textPrimary,
    marginBottom: 16,
  },
  overviewGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  overviewItem: {
    width: '48%',
    marginBottom: 16,
    alignItems: 'flex-start',
  },
  overviewIconPlaceholder: {
    marginBottom: 4,
  },
  overviewLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 2,
  },
  overviewValue: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  featureItem: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    gap: 6,
  },
  featureText: {
    fontSize: 14,
    color: '#444',
  },
  viewAllBtn: {
    marginTop: 8,
  },
  viewAllText: {
    color: colors.buttonBackgroundPrimary,
    fontWeight: 'bold',
    fontSize: 14,
  },
  viewAllSub: {
    color: '#888',
    fontSize: 12,
    marginTop: 2,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  specLabel: {
    color: '#666',
    fontSize: 14,
  },
  specValue: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: '500',
  },
  footer: {
    backgroundColor: 'white',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  gradientButton: {
    borderRadius: 50,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
  },
  contactBtnText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ListingDetails;
