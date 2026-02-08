import apiClient from '.';
import ENDPOINTS from '../end-points';
import { QrCheckResponse, ServiceListResponse, WalletDetailsResponse } from './types/qr';

const getServiceListApi = async (): Promise<ServiceListResponse> => {
  const response = await apiClient({
    method: 'get',
    url: `${ENDPOINTS.SERVICES}`,
  });
  return response.data;
};
const qrCheckApi = async (formData: any): Promise<QrCheckResponse> => {
  const response = await apiClient({
    method: 'post',
    url: `${ENDPOINTS.QR_CHECK}`,
    data: formData,
  });
  return response.data;
};

const getwalletDetailsApi = async (): Promise<WalletDetailsResponse> => {
  const response = await apiClient({
    method: 'get',
    baseURL: process.env.EXPO_PUBLIC_API_URL_V2,
    url: `${ENDPOINTS.QR_WALLET_DETAILS}`,
  });

  return response.data;
};

export { getServiceListApi, getwalletDetailsApi, qrCheckApi };
