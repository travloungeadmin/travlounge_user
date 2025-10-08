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
const getwalletDetailsApi = async (formData) => {
  const response = await apiClient({
    method: 'get',
    url: `${ENDPOINTS.QR_WALLET_DETAILS}`,
  });
  return response.data;
};

export { getServiceListApi, getwalletDetailsApi, qrCheckApi };
