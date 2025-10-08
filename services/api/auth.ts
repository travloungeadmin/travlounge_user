import apiClient from '@/services/api';
import ENDPOINTS from '@/services/end-points';

const generateOTPApi = async (data: FormData) => {
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

const verifyOTPApi = async (data) => {
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
const registerApi = async (FormData) => {
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

const refreshAccessApi = async (data) => {
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

export { generateOTPApi, refreshAccessApi, registerApi, verifyOTPApi };
