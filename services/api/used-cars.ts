import { GetUsedCarsResponse } from '@/types/api/used-cars.types';
import apiClient from '.';
import ENDPOINTS from '../end-points';

export interface GetUsedCarsParams {
  min_price?: number;
  max_price?: number;
  fuel?: string;
  year_min?: number;
  transmission?: string;
  sort_by?: string;
  page?: number;
  page_size?: number;
  place?: string;
  ownership?: string;
  kms_min?: number;
  kms_max?: number;
  brand_model?: string;
}

const getUsedCarsListApi = async (params: GetUsedCarsParams): Promise<GetUsedCarsResponse> => {
  const response = await apiClient({
    method: 'get',
    url: ENDPOINTS.USED_CARS_LIST,
    params,
  });

  return response.data;
};

const toggleUsedCarsFavoriteApi = async (id: number | string): Promise<any> => {
  const response = await apiClient({
    method: 'post',
    url: `${ENDPOINTS.USED_CARS_LIST}${id}/toggle-favourite/`,
  });
  return response.data;
};

const getUsedCarDetailsApi = async (id: number | string): Promise<any> => {
  const response = await apiClient({
    method: 'get',
    url: `${ENDPOINTS.USED_CAR_DETAILS}${id}/`,
  });
  return response.data;
};

export { getUsedCarDetailsApi, getUsedCarsListApi, toggleUsedCarsFavoriteApi };
