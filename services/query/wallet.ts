import {
  addMoneyApi,
  getEliteWalletDashboardApi,
  getWalletApi,
  updateAddMoneyApi,
} from '@/services/api/wallet';
import QUERIES_KEY from '@/services/query/query-keys';
import { useMutation, useQuery } from '@tanstack/react-query';

const getWalletQuery = () =>
  useQuery({
    queryFn: getWalletApi,
    queryKey: [QUERIES_KEY.WALLET],
  });

const getEliteWalletDashboardQuery = () =>
  useQuery({
    queryFn: getEliteWalletDashboardApi,
    queryKey: [QUERIES_KEY.ELITE_WALLET_DASHBOARD],
  });

const addMoneyMutation = () =>
  useMutation({
    mutationFn: addMoneyApi,
  });
const updateAddMoneyMutation = () =>
  useMutation({
    mutationFn: updateAddMoneyApi,
  });

export { addMoneyMutation, getEliteWalletDashboardQuery, getWalletQuery, updateAddMoneyMutation };
