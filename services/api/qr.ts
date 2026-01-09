import apiClient from '.';
import ENDPOINTS from '../end-points';

const getServiceListApi = async () => {
  const response = await apiClient({
    method: 'get',
    url: `${ENDPOINTS.SERVICES}`,
  });
  return response.data;
};
const qrCheckApi = async (formData) => {
  const response = await apiClient({
    method: 'post',
    url: `${ENDPOINTS.QR_CHECK}`,
    data: formData,
  });
  return response.data;
};
export interface ServiceUsage {
  service: string;
  total: number;
  used: number;
  remaining: number;
}

export interface SubscriptionData {
  service_type_counts: ServiceUsage[];
}

export interface ActiveSubscription {
  id: number;
  package_id: number;
  package_name: string;
  subscribed_date: string;
  expiry_date: string;
  status: string;
  days_remaining: number;
  amount: number | null;
}

export interface PackageDetails {
  package_name: string;
  expiry_date: string;
  first_user_only: boolean;
  details: ServiceUsage[];
}

export interface UserDetails {
  user_id: number;
  user_name: string;
  mobile_number: string;
  email: string;
  is_registered: boolean;
}

export interface WalletDetailsResponse {
  name: string;
  user_details: UserDetails;
  wallet_balance: number;
  elite_coin_balance: number;
  active_subscription: ActiveSubscription[] | null;
  all_subscriptions: ActiveSubscription[];
  packages: PackageDetails[];
  subscription_data: SubscriptionData[];
}

const getwalletDetailsApi = async () => {
  const response = await apiClient({
    method: 'get',
    url: `${ENDPOINTS.QR_WALLET_DETAILS}`,
  });
  return response.data as WalletDetailsResponse;
};

export { getServiceListApi, getwalletDetailsApi, qrCheckApi };
