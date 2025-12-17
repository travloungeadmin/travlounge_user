import { useQuery } from '@tanstack/react-query';

import { getHomeServices } from '@/home';
import { setServices } from '@/store/service';
import {
  getActiveSubscriptionsApi,
  getCategoryApi,
  getHomeApi,
  getPackagesListApi,
  getSingleServiceApi,
} from '../api/home';
import QUERIES_KEY from './query-keys';

const getHomeListQuery = () =>
  useQuery({
    queryFn: () => getHomeApi(),
    queryKey: [QUERIES_KEY.HOME],
  });

const getSingleServiceQuery = (id: number) =>
  useQuery({
    enabled: !!id,
    queryFn: () => getSingleServiceApi(id),
    queryKey: [QUERIES_KEY.SINGLE_SERVICE, { id }],
  });

const getPackagesListQuery = () =>
  useQuery({
    queryFn: () => getPackagesListApi(),
    queryKey: [QUERIES_KEY.PACKAGES_LIST],
  });

import { useEffect } from 'react';

const useGetCategoryQuery = () => {
  const query = useQuery({
    queryFn: () => getCategoryApi(),
    queryKey: [QUERIES_KEY.CATEGORY_LIST],
  });

  useEffect(() => {
    if (query.data) {
      const services = getHomeServices(query.data);
      setServices(services);
    }
  }, [query.data]);

  return query;
};

/**
 * Hook to fetch the customer's active subscriptions
 * @returns Query result containing the active subscriptions data
 */
const useActiveSubscriptionsQuery = () =>
  useQuery({
    queryFn: () => getActiveSubscriptionsApi(),
    queryKey: [QUERIES_KEY.ACTIVE_SUBSCRIPTIONS],
  });

export {
  getHomeListQuery,
  getPackagesListQuery,
  getSingleServiceQuery,
  useActiveSubscriptionsQuery,
  useGetCategoryQuery,
};
