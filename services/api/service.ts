import apiClient from '.';
import ENDPOINTS from '../end-points';
import { GetServiceListApiProps, ServiceListResponse } from './types';

export const getServiceListApi = async (
  props: GetServiceListApiProps
): Promise<ServiceListResponse> => {
  console.log({ props });

  const response = await apiClient({
    method: 'get',
    url: `${ENDPOINTS.SERVICE_LIST}`,
    params: props,
  });

  return response.data;
};

export const getServiceDetailApi = async (props) => {
  const { id, longitude, latitude } = props;
  const response = await apiClient({
    method: 'get',
    url: `${ENDPOINTS.SERVICE_DETAIL}${id}/`,
    params: {
      latitude,
      longitude,
    },
  });

  return response.data;
};
export const getCouponApi = async (props) => {
  const { id } = props;
  const response = await apiClient({
    method: 'get',
    url: ENDPOINTS.COUPON,
    params: {
      listing: id,
    },
  });

  return response.data;
};

type propsType = {
  id: number;
  title?: string;
  review: string;
  image?: string;
  rating?: number;
};
export const addReviewApi = async (props: propsType) => {
  const { id, title, review, image, rating } = props;
  const response = await apiClient({
    method: 'post',
    url: ENDPOINTS.ADD_REVIEW,
    data: {
      listing: id,
      title,
      review,
      rating,
      image,
    },
  });

  return response.data;
};
export const getSleepingPodListsApi = async (data) => {
  const response = await apiClient({
    method: 'post',
    url: ENDPOINTS.SLEEPING_POD_LIST,
    data,
  });

  return response.data;
};
export const getSleepingPodDetailApi = async ({
  listing_id,
  page,
}: {
  listing_id: string;
  page: number;
}) => {
  const response = await apiClient({
    method: 'get',
    url: ENDPOINTS.SLEEPING_POD_DETAIL,
    params: {
      listing_id,
      page,
    },
  });

  return response.data;
};
export const getSleepingPodPriceApi = async (props: {
  date: string;
  listing_id: string;
  pod_info: string;
}) => {
  const { date, listing_id, pod_info } = props;

  const response = await apiClient({
    method: 'get',
    url: ENDPOINTS.SLEEPING_POD_PRICE,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    params: {
      date,
      listing_id,
      pod_info,
    },
  });

  return response.data;
};

type createSleepingPodOrderApiPropsType = {
  user_id: string;
  listing_id: string;
  amount: number;
  date: string;
  time: string;
  pod_info: string;
  duration: number;
};
export const createSleepingPodOrderApi = async (props: createSleepingPodOrderApiPropsType) => {
  const response = await apiClient({
    method: 'post',
    url: ENDPOINTS.CREATE_ORDER_SLEEPING_POD,
    data: props,
  });

  return response.data;
};

type getAvailabilitySleepingPodApiPropsType = {
  listing_id: string;
  date: string;
  pod_info: any;
  time: string;
  add_ons?: {
    no_of_bath: number;
  };
};
export const getAvailabilitySleepingPodApi = async (
  props: getAvailabilitySleepingPodApiPropsType
) => {
  const { listing_id, date, pod_info, time, add_ons } = props;

  const response = await apiClient({
    method: 'post',
    url: ENDPOINTS.SLEEPING_POD_PRICE,
    data: {
      listing_id,
      date,
      pod_info,
      time,
      add_ons,
    },
  });

  return response.data;
};

type verifySleepingPodOrderApiPropsType = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};
export const verifySleepingPodOrderApi = async (props: verifySleepingPodOrderApiPropsType) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = props;

  const response = await apiClient({
    method: 'put',
    url: ENDPOINTS.CREATE_ORDER_SLEEPING_POD,
    data: {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    },
  });

  return response.data;
};
