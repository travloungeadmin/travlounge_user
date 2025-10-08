import { Route } from '@react-navigation/native';

export type ServiceDetailsParams = Route<string> & {
  id: string;
  name: string;
  isSleepingPod?: boolean;
  serviceName?: string;
  isPartner: 'true' | 'false' | undefined;
};

export type ServiceDetailsData = {
  description: string;
  display_name: string;
  place: string;
  images: Array<{ image: string }>;
  average_rating: number;
  distance: number;
  time_to_loc: number;
  latitude: number;
  longitude: number;
  offer_data?: {
    title: string;
    description: string;
  };
  offer_images?: Array<{
    image: string;
    title: string;
  }>;
  reviews?: Array<any>;
};
