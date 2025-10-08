import apiClient from '@/services/api';
import ENDPOINTS from '@/services/end-points';

const getProfileApi = async () => {
  const response = await apiClient({
    method: 'get',
    url: ENDPOINTS.PROFILE,
  });
  return response.data;
};
const subscribeApi = async (formData: FormData) => {
  const response = await apiClient({
    method: 'post',
    url: ENDPOINTS.SUBSCRIBE,
    data: formData,
  });
  return response.data;
};
const verifySubscribeApi = async (formData: FormData) => {
  const response = await apiClient({
    method: 'put',
    url: ENDPOINTS.SUBSCRIBE,
    data: formData,
  });
  return response.data;
};
const getUserDetailsApi = async () => {
  const response = await apiClient({
    method: 'get',
    url: ENDPOINTS.USER_DETAILS,
  });
  return response.data;
};
const deleteAccount = async () => {
  const response = await apiClient({
    method: 'post',
    url: ENDPOINTS.DELETE_ACCOUNT,
  });
  return response.data;
};
const updateProfileApi = async (FormData) => {
  const response = await apiClient({
    method: 'PUT',
    url: 'customer/update-profile/',
    data: FormData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export {
  deleteAccount,
  getProfileApi,
  getUserDetailsApi,
  subscribeApi,
  updateProfileApi,
  verifySubscribeApi,
};
