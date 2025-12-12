import apiClient from '.';
import ENDPOINTS from '../end-points';
import { GetCategoryApiResponce } from './types';

const getHomeApi = async () => {
  const response = await apiClient({
    method: 'get',
    url: `${ENDPOINTS.HOME}`,
  });

  return response.data;
};
const getSingleServiceApi = async (id: number) => {
  const response = await apiClient({
    method: 'get',
    url: `${ENDPOINTS.SINGLE_SERVICE + id}/`,
  });

  return response.data;
};
const getPackagesListApi = async () => {
  const response = await apiClient({
    method: 'get',
    url: ENDPOINTS.PACKAGES_LIST,
  });
  return response.data;
};

const getCategoryApi = async (): Promise<GetCategoryApiResponce> => {
  const response = await apiClient({
    method: 'get',
    url: ENDPOINTS.CATEGORY_LIST,
  });
  return response.data;
};

/**
 * Fetches the active subscriptions for the currently logged-in customer
 * @returns {Promise<any>} The active subscriptions data
 */
const getActiveSubscriptionsApi = async () => {
  const response = await apiClient({
    method: 'get',
    url: ENDPOINTS.ACTIVE_SUBSCRIPTIONS,
  });

  return response.data;
};

export {
  getActiveSubscriptionsApi,
  getCategoryApi,
  getHomeApi,
  getPackagesListApi,
  getSingleServiceApi,
};
