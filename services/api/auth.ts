import apiClient from '@/services/api';
import ENDPOINTS from '@/services/end-points';

const generateOTPApi = async (data: any) => {
  const response = await apiClient({
    method: 'post',
    url: `${ENDPOINTS.AUTH.LOGIN}`,
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

const verifyOTPApi = async (data: any) => {
  const response = await apiClient({
    method: 'post',
    url: `${ENDPOINTS.AUTH.VERIFY}`,
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
const registerApi = async (FormData: any) => {
  const response = await apiClient({
    method: 'put',
    url: 'customer/update-profile/',
    data: FormData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

const refreshAccessApi = async (data: any) => {
  const response = await apiClient({
    method: 'post',
    url: `${ENDPOINTS.AUTH.REFRESH}`,
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

const updateDeviceTokenApi = async (data: { device_token: string }) => {
  const response = await apiClient({
    method: 'patch',
    baseURL: process.env.EXPO_PUBLIC_API_URL_V2,
    url: 'api/v2/customer/update-device-token/',
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export { generateOTPApi, refreshAccessApi, registerApi, updateDeviceTokenApi, verifyOTPApi };
