import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

import {
  addReviewApi,
  createCoinOrderApi,
  createSleepingPodOrderApi,
  getAvailabilitySleepingPodApi,
  getCouponApi,
  getServiceDetailApi,
  getServiceListApi,
  getSleepingPodDetailApi,
  getSleepingPodListsApi,
  verifyCoinOrderApi,
  verifyPaymentRequestApi,
  verifySleepingPodOrderApi,
} from '../api/service';

import { GetServiceListApiProps } from '../api/types/listings';
import QUERIES_KEY from './query-keys';

export const getServiceListQuery = (props: GetServiceListApiProps) => {
  return useInfiniteQuery({
    enabled: !!props.latitude && !!props.longitude && !!props.category,
    getNextPageParam: (lastPage: any, pages) => {
      if (lastPage.next) {
        return lastPage.count + 1;
      }
    },
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getServiceListApi({
        ...props,
        page: pageParam,
      }),
    queryKey: [QUERIES_KEY.SERVICE_LIST, { ...props }],
    select: (data) => data?.pages.flatMap((page) => page.results),
  });
};

export const getServiceDetailsQuery = ({ id, longitude, latitude }) =>
  useQuery({
    enabled: !!id,
    queryFn: () => getServiceDetailApi({ id, longitude, latitude }),
    queryKey: [QUERIES_KEY.SERVICE, { id }],
    refetchOnWindowFocus: true,
  });
export const getCouponQuery = ({ id }) =>
  useQuery({
    enabled: false,
    queryFn: () => getCouponApi({ id }),
    queryKey: [QUERIES_KEY.COUPON, { id }],
  });
export const addReviewMutation = () =>
  useMutation({
    mutationFn: addReviewApi,
  });
export const getSleepingPodLists = () =>
  useMutation({
    mutationFn: getSleepingPodListsApi,
  });

export const getSleepingPodDetailQuery = ({ isSleepingPod, id }) =>
  useInfiniteQuery({
    enabled: !!id && !!isSleepingPod,
    getNextPageParam: (lastPage: any, pages) => {
      if (lastPage.next) {
        return lastPage.count + 1;
      }
    },
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getSleepingPodDetailApi({ listing_id: id, page: pageParam }),
    queryKey: [QUERIES_KEY.SLEEPING_POD, { id }],
    select: (data) => data?.pages.flatMap((page) => page.results),
  });

export const getAvailabilitySleepingPod = ({
  isSleepingPod,
  date,
  listing_id,
  pod_info,
  time,
  add_ons,
}) => {
  return useQuery({
    enabled: !!date && !!listing_id && !!pod_info && !!time && !!isSleepingPod,
    queryFn: () => getAvailabilitySleepingPodApi({ date, listing_id, pod_info, time, add_ons }),
    queryKey: [QUERIES_KEY.SLEEPING_POD_PRICE, { date, listing_id, pod_info, time, add_ons }],
  });
};
export const createSleepingPodOrder = () =>
  useMutation({
    mutationFn: createSleepingPodOrderApi,
  });
export const verifySleepingPodOrder = () =>
  useMutation({
    mutationFn: verifySleepingPodOrderApi,
  });

export const useCreateCoinOrder = () =>
  useMutation({
    mutationFn: createCoinOrderApi,
  });

export const useVerifyCoinOrder = () =>
  useMutation({
    mutationFn: verifyCoinOrderApi,
  });
export const useVerifyPaymentRequest = () =>
  useMutation({
    mutationFn: verifyPaymentRequestApi,
  });
