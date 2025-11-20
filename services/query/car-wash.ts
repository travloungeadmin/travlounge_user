import { useMutation, useQuery } from '@tanstack/react-query';

import {
  carWashBookingApi,
  carWashBookingVerifyApi,
  carWashPaymentOptionsApi,
  carWashServicesApi,
  carWashTimeSlotsApi,
} from '../api/car-wash';
import QUERIES_KEY from './query-keys';

import { CarWashServiceRequest, CarWashTimeSlotsRequest } from '@/types/api/car-wash.types';

export const useGetCarWashServices = ({ car_id, listing_id }: CarWashServiceRequest) =>
  useQuery({
    enabled: !!car_id && !!listing_id,
    queryFn: () => carWashServicesApi({ car_id, listing_id }),
    queryKey: [QUERIES_KEY.CAR_WASH_SERVICES, car_id, listing_id],
  });

export const useGetCarWashTimeSlots = ({ date, listing_id }: CarWashTimeSlotsRequest) => {
  return useQuery({
    enabled: !!date && !!listing_id,
    queryFn: () => carWashTimeSlotsApi({ date, listing_id }),
    queryKey: [QUERIES_KEY.CAR_WASH_TIME_SLOTS, date, listing_id],
  });
};

export const useCarWashBooking = () =>
  useMutation({
    mutationFn: carWashBookingApi,
  });
export const useCarWashBookingVerify = () =>
  useMutation({
    mutationFn: carWashBookingVerifyApi,
  });

export const useGetCarWashPaymentOptions = (listing_id: number) =>
  useQuery({
    enabled: !!listing_id,
    queryFn: () => carWashPaymentOptionsApi({ listing_id }),
    queryKey: [QUERIES_KEY.CAR_WASH_PAYMENT_OPTIONS, listing_id],
  });
