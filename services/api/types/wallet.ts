export interface EliteDashboardOffer {
  id: number;
  offer_name: string;
  amount_inr: number;
  coins_given: number;
  bonus_coins: number;
  description: string;
  display_order: number;
}

export interface DefaultConversion {
  amount_inr: number;
  coins_given: number;
  bonus_coins: number;
}

export interface EliteUser {
  user_id: number;
  user_name: string;
  mobile_number: string;
  is_registered: boolean;
}

export interface EliteDashboardResponse {
  coin_balance: number;
  worth_inr: number;
  banners: any[]; // You can refine this if banners structure is known
  offers: EliteDashboardOffer[];
  default_conversion: DefaultConversion;
  conversion_rate: string;
  user: EliteUser;
}

export interface TransactionHistoryParams {
  transaction_type?: 'credit' | 'debit' | '';
  page?: number;
  page_size?: number;
}
