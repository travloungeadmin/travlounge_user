import apiClient from '.';
import ENDPOINTS from '../end-points';
import { GeneralApiResponse } from './types/general';

/**
 * Fetches general app configuration including force update settings
 * @returns {Promise<GeneralApiResponse>} General configuration data
 */
const getGeneralApi = async (): Promise<GeneralApiResponse> => {
  const response = await apiClient({
    method: 'get',
    url: ENDPOINTS.GENERAL,
  });

  return response.data;
};

export { getGeneralApi };
