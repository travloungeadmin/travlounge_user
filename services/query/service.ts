import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';

import {
  addReviewApi,
  createSleepingPodOrderApi,
  getAvailabilitySleepingPodApi,
  getCouponApi,
  getServiceDetailApi,
  getServiceListApi,
  getSleepingPodDetailApi,
  getSleepingPodListsApi,
  verifySleepingPodOrderApi,
} from '../api/service';
import QUERIES_KEY from './query-keys';

export const getServiceListQuery = ({
  latitude,
  longitude,
  category,
  is_travlounge,
  isPartner,
  isAvailable,
}) => {
  return useInfiniteQuery({
    enabled: !!latitude && !!longitude && isAvailable,
    getNextPageParam: (lastPage: any, pages) => {
      if (lastPage.next) {
        return lastPage.count + 1;
      }
    },
    initialPageParam: 1,
    queryFn: ({ pageParam }) =>
      getServiceListApi({
        latitude,
        longitude,
        category,
        page: pageParam,
        is_travlounge,
        isPartner,
      }),
    queryKey: [
      QUERIES_KEY.SERVICE_LIST,
      { latitude, longitude, category, is_travlounge, isPartner },
    ],
    select: (data) => data?.pages.flatMap((page) => page.results),
  });
};
// useQuery({
//   enabled: !!latitude && !!longitude && !!category,
//   queryFn: () => getServiceListApi({ latitude, longitude, category }),
//   queryKey: [QUERIES_KEY.SERVICE_LIST, { latitude, longitude, category }],
// });

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
