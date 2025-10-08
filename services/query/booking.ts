import { useInfiniteQuery, useMutation, useQuery } from '@tanstack/react-query';
import {
  cancelBookingApi,
  cancelCarwashBookingApi,
  getBookingDetailApi,
  getBookingsApi,
  rePayPodApi,
} from '../api/booking';
import QUERIES_KEY from './query-keys';

export const getBookings = () =>
  useInfiniteQuery({
    getNextPageParam: (lastPage: any, pages) => {
      if (!!lastPage.next) {
        return pages?.length + 1;
      }
      return;
    },
    initialPageParam: 1,
    queryFn: ({ pageParam }) => getBookingsApi(pageParam),
    queryKey: [QUERIES_KEY.BOOKINGS],
    select: (data) => {
      return data?.pages.flatMap((page) => page.results) || [];
    },
  });

export const getBookingDetail = ({ id, isSleepingPod }: { id: string; isSleepingPod: boolean }) =>
  useQuery({
    queryFn: () => getBookingDetailApi(id, isSleepingPod),
    queryKey: [QUERIES_KEY.BOOKINGS, { id }],
  });

export const cancelBooking = () =>
  useMutation({
    mutationFn: cancelBookingApi,
  });
export const cancelCarwashBookingMutation = () =>
  useMutation({
    mutationFn: cancelCarwashBookingApi,
  });
export const rePayPod = () =>
  useMutation({
    mutationFn: rePayPodApi,
  });
