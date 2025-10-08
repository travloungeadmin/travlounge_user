import { addMoneyApi, getWalletApi, updateAddMoneyApi } from '@/services/api/wallet';
import QUERIES_KEY from '@/services/query/query-keys';
import { useMutation, useQuery } from '@tanstack/react-query';

const getWalletQuery = () =>
  useQuery({
    queryFn: getWalletApi,
    queryKey: [QUERIES_KEY.WALLET],
  });
const addMoneyMutation = () =>
  useMutation({
    mutationFn: addMoneyApi,
  });
const updateAddMoneyMutation = () =>
  useMutation({
    mutationFn: updateAddMoneyApi,
  });

export { addMoneyMutation, getWalletQuery, updateAddMoneyMutation };
