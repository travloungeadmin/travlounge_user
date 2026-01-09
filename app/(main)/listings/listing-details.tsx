import UsedCarListingDetails from '@/components/screens/listing/used-car-listing-details';
import { CategoryName } from '@/services/api/types/home';
import { useLocalSearchParams } from 'expo-router';
import ServiceDetails from '../services/service-details';

const ListingDetails = () => {
  const { id, category } = useLocalSearchParams() as { id: string; category: CategoryName };

  switch (category) {
    case 'Cars':
      return <UsedCarListingDetails />;
    default:
      return <ServiceDetails />;
  }
};

export default ListingDetails;
