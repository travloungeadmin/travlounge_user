export interface SubscriptionBenefit {
  category: string;
  total: number;
}

export interface SubscriptionPricing {
  original_price: number;
  offer_price: number;
  discount_percent: number;
  currency: string;
  gst: {
    applicable: boolean;
    percentage: number;
  };
}

export interface SubscriptionValidity {
  value: number;
  unit: string;
}

export interface SubscriptionPlan {
  subscription_id: number;
  plan_name: string;
  plan_type: string;
  status: string;
  ui_theme: string;
  validity: SubscriptionValidity;
  pricing: SubscriptionPricing;
  total_uses: number;
  remaining_uses: number;
  benefits: SubscriptionBenefit[];
  offer: string[];
  note: string;
}

export interface SubscriptionResponse {
  status: boolean;
  message: string;
  subscriptions: SubscriptionPlan[];
}

export interface SubscriptionPackagesResponse {
  status: boolean;
  message: string;
  packages: SubscriptionPlan[];
}

export interface SubscriptionOrderResponse {
  order_id: string;
  is_profile_completed: boolean;
  subscription_id: number;
  subtotal: number;
  tax_amount: number;
  tax_rate: number;
  total_amount: number;
  payment_method: string;
  status: string;
  wallet_balance: number | null;
}

export interface SubscriptionTransaction {
  transaction_id: string;
  type: string;
  transaction_type: string;
  title: string;
  location: string;
  points: number;
  amount: number;
  subtotal: number;
  tax_amount: number;
  total_amount: number;
  tax_rate: number | null;
  date: string;
  time: string;
  date_display: string;
  status: string;
  plan_type: string;
  ui_theme: string;
  validity: SubscriptionValidity;
  subscribed_date: string;
  expiry_date: string;
  razorpay_order_id: string | null;
  subscription_loaded_type: string;
}

export interface TransactionsByMonth {
  month: string;
  transactions: SubscriptionTransaction[];
}

export interface Pagination {
  current_page: number;
  page_size: number;
  total_pages: number;
  total_transactions: number;
  has_next: boolean;
  has_previous: boolean;
}

export interface SubscriptionHistoryResponse {
  transactions_by_month: TransactionsByMonth[];
  pagination: Pagination;
  period: string;
}
