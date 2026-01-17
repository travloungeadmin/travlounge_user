export type CategoryName =
  | 'Hygeinic Washrooms'
  | 'Sleeping pod'
  | 'Cafe'
  | 'Restaurant'
  | 'Petrol Pump'
  | 'Car Wash'
  | 'Travelmart'
  | 'Resort'
  | 'Mechanic'
  | 'Buffet'
  | 'Cars'
  | 'Insurance'
  | 'Food';

export type Category = {
  id: number;
  category_name: string;
};

export type Listing = {
  id: number;
  name: string;
  category: Category;
};

export type AssociationBanner = {
  title: string;
  image: string;
  listing: Listing;
  category_id: number;
  category_name: string;
  listing_id: number;
  listing_name: string;
  type: string;
};

export type Service = {
  id: number;
  service_name: CategoryName | string;
};

export type Banner = {
  image: string;
  service: Service;
  category_id: number | null;
  category_name: string | null;
  listing_id: number | null;
  listing_name: string | null;
  type: string;
  is_food_banner: boolean;
};

export type ActiveSubscriptionBenefit = {
  type: string;
  total: number;
  used: number;
  remaining: number;
};

export type ActiveSubscription = {
  id: number;
  package_name: string;
  expiry_date: string;
  benefits: ActiveSubscriptionBenefit[];
};

export type SuggestedOffer = {
  id: number;
  package_name: string;
  price: number;
};

export type UserDetails = {
  user_id: number;
  user_name: string;
  mobile_number: string;
  is_registered: boolean;
  elite_coin_balance: number;
  elite_coins_worth: number;
  is_welcome_offer_claimed: boolean;
};

export type HomeApiResponse = {
  association_banners: AssociationBanner[];
  banners: Banner[];
  active_subscriptions: ActiveSubscription[];
  suggested_offers: SuggestedOffer[];
  user_details: UserDetails;
};
