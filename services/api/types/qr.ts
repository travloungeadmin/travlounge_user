export interface Benefit {
  category: string;
  total: number;
  used?: number;
  remaining?: number;
}

export interface Pricing {
  original_price: number | null;
  offer_price: number;
  discount_percent: number;
  currency: string;
}

export interface Subscription {
  subscription_id: number;
  plan_name: string;
  duration_months: number;
  total_uses?: number;
  remaining_uses?: number;
  status: string;
  valid_from?: string;
  valid_till?: string;
  ui_theme: string;
  benefits: Benefit[];
  pricing?: Pricing;
}

export interface User {
  user_id: number;
  username: string;
  wallet_balance: number;
}

export interface EliteCard {
  total_points: number;
  worth_amount: number;
}

export interface WalletDetailsData {
  user: User;
  elite_card: EliteCard;
  active_subscription: Subscription[];
  subscriptions: Subscription[];
}

export interface WalletDetailsResponse {
  status: boolean;
  message: string;
  data: WalletDetailsData;
}

export interface ServiceListResponse {
  [key: string]: any;
}

export interface QrCheckResponse {
  [key: string]: any;
}
