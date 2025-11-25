import apiClient from '.';
import ENDPOINTS from '../end-points';

import {
  CarWashBookingRequest,
  CarWashBookingVerifyRequest,
  CarWashServiceRequest,
  CarWashServicesResponse,
  CarWashTimeSlotsRequest,
  CarWashTimeSlotsResponse,
} from '@/types/api/car-wash.types';

/**
 * Fetches available car wash services for a specific listing and car type
 * @param params - Object containing listing_id and car_id
 * @returns Promise with car wash services data
 */
export const carWashServicesApi = async (
  params: CarWashServiceRequest
): Promise<CarWashServicesResponse> => {
  const { listing_id, car_id } = params;
  const response = await apiClient({
    method: 'get',
    url: ENDPOINTS.CAR_WASH_SERVICES,
    params: { listing_id, car_id },
  });

  return response.data;
};

/**
 * Fetches available time slots for car wash booking
 * @param params - Object containing date, service_id, and car_id
 * @returns Promise with available time slots data
 */
export const carWashTimeSlotsApi = async (
  params: CarWashTimeSlotsRequest
): Promise<CarWashTimeSlotsResponse> => {
  const { date, listing_id } = params;

  console.log('Fetching car wash time slots', { date, listing_id });

  const response = await apiClient({
    method: 'get',
    url: ENDPOINTS.CAR_WASH_TIME_SLOTS,
    params: { date, listing_id },
  });

  return response.data;
};

/**
 * Creates a new car wash booking
 * @param params - Object containing booking details
 * @returns Promise with booking confirmation data
 */
export const carWashBookingApi = async (params: CarWashBookingRequest) => {
  const response = await apiClient({
    method: 'post',
    url: ENDPOINTS.CAR_WASH_BOOKING,
    data: params,
  });

  return response.data;
};
export const carWashBookingVerifyApi = async (params: CarWashBookingVerifyRequest) => {
  const response = await apiClient({
    method: 'put',
    url: ENDPOINTS.CAR_WASH_BOOKING,
    data: params,
  });

  return response.data;
};
