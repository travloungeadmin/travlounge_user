import { PackageService } from '@/types/api/package.types';

export interface ProfileScreenProps {}

export interface UserProfile {
  user?: {
    name?: string;
    phone?: string;
    image?: string;
  };
  curr_offers?: {
    package_name: string;
    amount: string;
    package_services: PackageService[];
  }[];
}

export interface Subscription {
  active_subscriptions: {
    package_name: string;
    services: {
      type: string;
      remaining: number;
      total: number;
    }[];
  }[];
}

export interface ServiceItem {
  type: string;
  remaining: number;
  total: number;
}
