export type CategoryName =
  | 'Hygeinic Washrooms'
  | 'Sleeping Pod'
  | 'Cafe'
  | 'Restaurant'
  | 'Petrol Pump'
  | 'Car Wash'
  | 'Travelmart'
  | 'Resort'
  | 'Mechanic'
  | 'Buffet'
  | 'Cars'
  | 'Insurance';
export type Category = {
  id: number;
  category_name: CategoryName;
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
};

export type Service = {
  id: number;
  service_name: CategoryName;
};

export type Banner = {
  image: string;
  service: Service;
};
