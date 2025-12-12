import ScreenWrapper from '@/components/common/ScreenWrapper';
import CarSellingListingCard from '@/components/service/CarSellingListingCard';
import { Box, Device, Image, Text, useSafeAreaInsets } from '@/core';
import { moderateScale } from '@/lib/responsive-dimensions';
import { GetUsedCarsParams } from '@/services/api/used-cars';
import {
  useToggleUsedCarsFavoriteMutation,
  useUsedCarsListQuery,
} from '@/services/query/used-cars';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const DATA = [
  {
    id: '1',
    fuel: 'Petrol',
    year: '2022',
    make: 'Toyota',
    model: 'Camry',
    price: '100000',
    kilometers: '10000',
    transmission: 'Automatic',
    ownerCount: '1',
    registrationPlace: 'Delhi',
    sellerName: 'John Doe',
    sellerPlace: 'Delhi',
    images: ['https://via.placeholder.com/150'],
    isCompareSelected: true,
    isFavorite: true,
    variant: 'Camry',
  },
  {
    id: '2',
    fuel: 'Diesel',
    year: '2020',
    make: 'Honda',
    model: 'City',
    price: '80000',
    kilometers: '25000',
    transmission: 'Manual',
    ownerCount: '2',
    registrationPlace: 'Mumbai',
    sellerName: 'Jane Smith',
    sellerPlace: 'Mumbai',
    images: ['https://via.placeholder.com/150'],
    isCompareSelected: false,
    isFavorite: false,
    variant: 'V',
  },
  {
    id: '3',
    fuel: 'Petrol',
    year: '2023',
    make: 'Hyundai',
    model: 'Creta',
    price: '150000',
    kilometers: '5000',
    transmission: 'Automatic',
    ownerCount: '1',
    registrationPlace: 'Bangalore',
    sellerName: 'Bob Johnson',
    sellerPlace: 'Bangalore',
    images: ['https://via.placeholder.com/150'],
    isCompareSelected: false,
    isFavorite: true,
    variant: 'SX',
  },
];

const ServiceListings = () => {
  const { mutate: toggleFavorite } = useToggleUsedCarsFavoriteMutation();
  const { data, isLoading } = useUsedCarsListQuery({
    // brand_model: '',
    // place: '',
    // page: 1,
    // page_size: 20,
    // sort: '',
    // fuel: '',
    // transmission: '',
    // ownership: '',
    // year: '',
    // kms_max: null,
    // kms_min: null,
    // price_max: null,
    // price_min: null,
    // max_price: null,
    // min_price: null,
    // max_kms: null,
    // min_kms: null,
    // sort_by: '',
    // year_min: null,
    // year_max: null,
  } as GetUsedCarsParams);
  const { topHeight, bottomHeight } = useSafeAreaInsets();

  const ListEmptyComponent = () => (
    <View
      style={[
        styles.emptyComponent,
        { height: Device.height - topHeight - 50 - bottomHeight || 20 },
      ]}>
      {isLoading ? (
        <LottieView
          source={require('@/old/assets/animation/loading.json')}
          style={styles.loadingAnimation}
          autoPlay
          loop
        />
      ) : (
        <Box style={styles.notFoundBox}>
          <Image
            contentFit="contain"
            source={require('@/assets/images/not-found.png')}
            style={styles.notFoundImage}
          />
          <Text preset="POP_14_M">No Cars found</Text>
        </Box>
      )}
    </View>
  );
  return (
    <ScreenWrapper>
      {/* <ThemedText
        style={{ margin: moderateScale(12), marginBottom: 0 }}
        variant="bodyLargeEmphasized"
        color="gray900">
        25 Buffet You Have
      </ThemedText> */}
      <FlatList
        contentContainerStyle={{
          padding: moderateScale(12),
          gap: moderateScale(12),
        }}
        data={data}
        ListEmptyComponent={ListEmptyComponent}
        renderItem={({ item }) => (
          <CarSellingListingCard
            variant={''}
            fuel={item?.fuel}
            year={item?.year_of_manufacture}
            make={item?.name}
            model={item?.car_model || ''}
            price={item?.price}
            kilometers={item?.kms}
            transmission={item?.transmission}
            ownerCount={item?.ownership}
            registrationPlace="Delhi"
            sellerName={item?.agent_details?.agency_name}
            sellerPlace={item?.place}
            images={item?.images}
            isFavorite={item?.is_favourite}
            onPress={() => {
              router.navigate({
                pathname: '/listings/listing-details',
                params: { id: item?.id },
              });
            }}
            onComparePress={() => {}}
            onPressFavorite={() => {
              if (item?.id) {
                toggleFavorite(item.id);
              }
            }}
            // isCompareSelected
            // isFavorite
          />
        )}
      />
    </ScreenWrapper>
  );
};

export default ServiceListings;

const styles = StyleSheet.create({
  notFoundImage: {
    width: Device.width / 2,
    height: Device.width / 2,
  },
  emptyComponent: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  loadingAnimation: {
    width: '40%',
    height: '40%',
  },
  notFoundBox: {
    alignItems: 'center',
  },
});
