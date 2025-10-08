import { useMutation, useQuery } from '@tanstack/react-query';
import { getServiceListApi, getwalletDetailsApi, qrCheckApi } from '../api/qr';
import QUERIES_KEY from './query-keys';

const getServiceListQuery = () =>
  useQuery({
    queryFn: getServiceListApi,
    queryKey: [QUERIES_KEY.SERVICE_LIST],
  });
const getWalletDetails = () =>
  useQuery({
    queryFn: getwalletDetailsApi,
    queryKey: [QUERIES_KEY.WALLET_DETAILS],
  });
const qrCheckMutation = () =>
  useMutation({
    mutationFn: qrCheckApi,
  });

export { getServiceListQuery, getWalletDetails, qrCheckMutation };
