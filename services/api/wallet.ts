import apiClient from '@/services/api';
import ENDPOINTS from '@/services/end-points';

const getWalletApi = async () => {
  const response = await apiClient({
    method: 'get',
    url: ENDPOINTS.WALLET,
  });
  return response.data;
};

const getEliteWalletDashboardApi = async () => {
  const response = await apiClient({
    method: 'get',
    url: ENDPOINTS.ELITE_DASHBOARD,
  });
  return response.data;
};

const getWalletTransactionHistoryApi = async () => {
  const response = await apiClient({
    method: 'get',
    url: ENDPOINTS.ELITE_TRANSACTION_HISTORY,
  });
  return response.data;
};

const addMoneyApi = async (data: FormData) => {
  const response = await apiClient({
    method: 'post',
    url: ENDPOINTS.WALLET,
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
const updateAddMoneyApi = async (props: any) => {
  const { id, amount, requested_by, pk } = props;

  const response = await apiClient({
    method: 'put',
    url: `${ENDPOINTS.WALLET_UPDATE}`,
    data: {
      amount,
      requested_by,
      id,
      order_id: pk,
    },
  });
  return response.data;
};

export {
  addMoneyApi,
  getEliteWalletDashboardApi,
  getWalletApi,
  getWalletTransactionHistoryApi,
  updateAddMoneyApi,
};
