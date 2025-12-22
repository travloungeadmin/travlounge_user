import ScreenWrapper from '@/components/common/ScreenWrapper';
import CarSellingListingCard from '@/components/service/CarSellingListingCard';
import FilterBar from '@/components/service/FilterBar';
import FilterModal from '@/components/service/FilterModal';
import { Box, Device, Image, Text, useSafeAreaInsets } from '@/core';
import { moderateScale } from '@/lib/responsive-dimensions';
import { GetUsedCarsParams } from '@/services/api/used-cars';
import {
  useFilterOptionsQuery,
  useToggleUsedCarsFavoriteMutation,
  useUsedCarsListQuery,
} from '@/services/query/used-cars';
import { router } from 'expo-router';
import LottieView from 'lottie-react-native';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

const ServiceListings = () => {
  const [selectedFilters, setSelectedFilters] = useState<GetUsedCarsParams>({});
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const { data: filterOptions } = useFilterOptionsQuery();
  const { mutate: toggleFavorite } = useToggleUsedCarsFavoriteMutation();
  const { data, isLoading } = useUsedCarsListQuery(selectedFilters);
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
      <FilterBar
        filters={filterOptions}
        selectedFilters={selectedFilters}
        onFilterChange={(key, value) => setSelectedFilters((prev) => ({ ...prev, [key]: value }))}
        openFilterModal={() => setFilterModalVisible(true)}
      />
      <FilterModal
        isVisible={isFilterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        filters={filterOptions}
        selectedFilters={selectedFilters}
        onApply={(filters) => setSelectedFilters(filters)}
        onClear={() => setSelectedFilters({})}
      />
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
            variant={item?.variant || ''} // Corrected mapping - assuming car_model is variant? Or name is make?
            fuel={item?.fuel}
            year={item?.year_of_manufacture}
            make={item?.name}
            model={item?.car_model || ''}
            price={item?.price}
            kilometers={item?.kms}
            transmission={item?.transmission}
            ownerCount={item?.ownership}
            registrationPlace={item?.place}
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
