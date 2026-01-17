import apiClient from '@/services/api';
import ENDPOINTS from '@/services/end-points';
import { SubscriptionPackagesResponse, SubscriptionResponse } from '@/types/api/subscription.types';

const getSubscriptionApi = async (): Promise<SubscriptionResponse> => {
  const response = await apiClient({
    method: 'get',
    baseURL: process.env.EXPO_PUBLIC_API_URL_V2,
    url: ENDPOINTS.SUBSCRIPTIONS,
  });
  return response.data;
};
const getSubscriptionHistoryApi = async (): Promise<any> => {
  const response = await apiClient({
    method: 'get',
    baseURL: process.env.EXPO_PUBLIC_API_URL_V2,
    url: `${ENDPOINTS.SUBSCRIPTIONS}history/`,
  });
  return response.data;
};

const getPackagesSubscriptionApi = async (
  id?: string | number | undefined
): Promise<SubscriptionPackagesResponse> => {
  const url = id ? `${ENDPOINTS.PACKAGES_LIST}${id}/` : ENDPOINTS.PACKAGES_LIST;

  const response = await apiClient({
    method: 'get',
    baseURL: process.env.EXPO_PUBLIC_API_URL_V2,
    url,
  });
  return response.data;
};

export { getPackagesSubscriptionApi, getSubscriptionApi, getSubscriptionHistoryApi };
