export interface Package {
  amount: number;
  package_name?: string;
  // Add other properties as needed
}

export interface Subscription {
  package_name: string;
  is_welcome_bonus: boolean;
  // Add other properties as needed
}

export interface ActiveSubscriptionResponse {
  active_subscriptions: Subscription[];
}

export interface PackagesListProps {
  packages: Package[];
  subscription_data?: any; // Type this properly if the structure is known
}
