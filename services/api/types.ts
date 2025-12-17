export type MakeATripChatSuggestionsResponse = {
  count: number;
  last_updated: string; // ISO 8601 timestamp
  suggestions: string[];
};
export type Category = {
  id: number;
  category_name: string;
  icon: string | null;
};
export type GetCategoryApiResponce = Category[];

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
};

export type ServiceListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: ServiceItem[];
};

export type GetServiceListApiProps = {
  latitude: number | string;
  longitude: number | string;
  category: string;
  page?: number;
  is_travlounge?: boolean;
  is_partner?: boolean;
};
