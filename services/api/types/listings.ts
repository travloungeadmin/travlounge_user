export type GetServiceListApiProps = {
  latitude: number | string;
  longitude: number | string;
  category: string;
  page?: number;
  is_travlounge?: boolean;
  is_partner?: boolean;
};

export type ServiceImage = {
  id: number;
  image: string;
};

export type ServiceItem = {
  id: number;
  display_name: string;
  images: ServiceImage[];
  latitude: number;
  longitude: number;
  average_rating: number;
  distance: number;
  place: string;
  offer_percentage: number;
  is_travlounge: boolean;
  is_partner: boolean;
  is_disclaimer?: boolean;
};

export type ServiceListApiResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ServiceItem[];
};
