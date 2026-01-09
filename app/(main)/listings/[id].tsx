import ComingSoonListing from '@/components/screens/listing/coming-soon';
import CommonListings from '@/components/screens/listing/common-listings';
import UsedCarListings from '@/components/screens/listing/used-car-listing';
import { CategoryName } from '@/services/api/types/home';
import { useLocalSearchParams } from 'expo-router/build/hooks';
import SleepingPod from '../services/sleeping-pod';

const ServiceListings = () => {
  const { id, name } = useLocalSearchParams() as { name: CategoryName };
  if (id === '999') return <ComingSoonListing />;
  switch (name as CategoryName) {
    case 'Sleeping Pod':
      return <SleepingPod />;
    case 'Cars':
      return <UsedCarListings />;

    default:
      return <CommonListings />;
  }
};

export default ServiceListings;
