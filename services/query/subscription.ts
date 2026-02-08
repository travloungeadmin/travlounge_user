import {
  getPackagesSubscriptionApi,
  getSubscriptionApi,
  getSubscriptionHistoryApi,
} from '@/services/api/subscription';
import QUERIES_KEY from '@/services/query/query-keys';
import {
  SubscriptionHistoryResponse,
  SubscriptionPackagesResponse,
  SubscriptionResponse,
} from '@/types/api/subscription.types';
import { useQuery } from '@tanstack/react-query';

const useGetSubscriptionQuery = () =>
  useQuery<SubscriptionResponse>({
    queryFn: () => getSubscriptionApi(),
    queryKey: [QUERIES_KEY.SUBSCRIPTIONS],
  });

const useGetSubscriptionHistoryQuery = () =>
  useQuery<SubscriptionHistoryResponse>({
    queryFn: getSubscriptionHistoryApi,
    queryKey: [QUERIES_KEY.SUBSCRIPTION_HISTORY],
  });

const useGetPackagesSubscriptionQuery = (id?: string | number | undefined) =>
  useQuery<SubscriptionPackagesResponse>({
    queryFn: () => getPackagesSubscriptionApi(id),
    queryKey: [QUERIES_KEY.PACKAGES_LIST],
  });

export { useGetPackagesSubscriptionQuery, useGetSubscriptionHistoryQuery, useGetSubscriptionQuery };
