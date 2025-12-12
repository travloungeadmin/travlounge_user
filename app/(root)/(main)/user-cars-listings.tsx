import ScreenWrapper from '@/components/common/ScreenWrapper';
import { ThemedText } from '@/components/common/ThemedText';
import CarSellingListingCard from '@/components/service/CarSellingListingCard';
import { moderateScale } from '@/lib/responsive-dimensions';
import { useUsedCarsListQuery } from '@/services/query/used-cars';
import { FlatList } from 'react-native-gesture-handler';

const UserCarsListings = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useUsedCarsListQuery({
    brand_model: 'Toyota Camry',
    fuel: 'Petrol',
    transmission: 'Automatic',
    kms_max: 10000,
    kms_min: 0,
    max_price: 0,
    min_price: 0,
    ownership: '',
    page_size: 10,
    place: '', // registration_place was not in interface, assuming place
    // seller_name: '', // not in interface
    // variant: '', // not in interface
  });

  const cars = data?.pages.flatMap((page: any) => page.results) || [];

  return (
    <ScreenWrapper>
      <ThemedText
        style={{ margin: moderateScale(12), marginBottom: 0 }}
        variant="bodyLargeEmphasized"
        color="gray900">
        {cars.length} Buffet You Have
      </ThemedText>
      <FlatList
        contentContainerStyle={{
          padding: moderateScale(12),
          gap: moderateScale(12),
        }}
        data={cars}
        onEndReached={() => {
          if (hasNextPage) fetchNextPage();
        }}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          isFetchingNextPage ? (
            <ThemedText style={{ textAlign: 'center', padding: 10 }}>Loading more...</ThemedText>
          ) : null
        }
        renderItem={({ item }) => (
          <CarSellingListingCard
            variant={item.variant}
            fuel={item.fuel}
            year={item.year}
            make={item.make}
            model={item.model}
            price={item.price}
            kilometers={item.kilometers}
            transmission={item.transmission}
            ownerCount={item.owner_count} // Assuming API returns snake_case
            registrationPlace={item.place}
            sellerName={item.seller_name}
            sellerPlace={item.seller_place}
            images={item.images || []}
            onPress={() => {}}
            onComparePress={() => {}}
            isCompareSelected={false}
            isFavorite={false}
          />
        )}
      />
    </ScreenWrapper>
  );
};

export default UserCarsListings;
