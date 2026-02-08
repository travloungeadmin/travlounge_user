import ScreenWrapper from '@/components/common/ScreenWrapper';
import { ThemedText } from '@/components/common/ThemedText';
import CarSellingListingCard from '@/components/service/CarSellingListingCard';
import { moderateScale } from '@/lib/responsive-dimensions';
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
  return (
    <ScreenWrapper>
      <ThemedText
        style={{ margin: moderateScale(12), marginBottom: 0 }}
        variant="bodyLargeEmphasized"
        color="gray900">
        25 Buffet You Have
      </ThemedText>
      <FlatList
        contentContainerStyle={{
          padding: moderateScale(12),
          gap: moderateScale(12),
        }}
        data={DATA}
        renderItem={({ item }) => (
          <CarSellingListingCard
            variant="Camry"
            fuel="Petrol"
            year="2022"
            make="Toyota"
            model="Camry"
            price="100000"
            kilometers="10000"
            transmission="Automatic"
            ownerCount="1"
            registrationPlace="Delhi"
            sellerName="John Doe"
            sellerPlace="Delhi"
            images={['https://via.placeholder.com/150']}
            onPress={() => {}}
            onComparePress={() => {}}
            isCompareSelected
            isFavorite
          />
        )}
      />
    </ScreenWrapper>
  );
};

export default ServiceListings;
