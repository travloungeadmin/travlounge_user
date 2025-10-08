import apiClient from '.';
import ENDPOINTS from '../end-points';

import {
  PaymentSuccessResponse,
  ServicePaymentResponse,
  TolooEventResponse,
} from '@/types/api/payment.types';

type CreateServicePaymentProps = {
  amount: number;
  event_payload?: {
    user: string;
    service: number;
    service_name: string;
    serviceType: number;
    number: number;
    source: string;
    listing: number;
    gender?: string;
    serviceType_name?: string;
    original_request?: {
      qrtype: string;
      types: string;
      user_id: string;
      source: string;
      count: string;
      room_number?: string;
      listing?: string;
    };
  };
};

type VerifyServicePaymentProps = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
  amount: string;
  event_payload?: {
    user: string;
    service: number;
    listing: number;
    source: string;
    number: number;
    original_request?: {
      qrtype: string;
      types: string;
      source: string;
      count: string;
      user_id?: string;
    };
  };
};

type ConfirmTolooEventProps = {
  user_id: string;
  qrtype: string;
  types: string;
  source: string;
  count: number;
  room_number: string;
  listing: string;
};

export const createServicePaymentApi = async (
  data: CreateServicePaymentProps
): Promise<ServicePaymentResponse> => {
  const formData = new FormData();
  formData.append('amount', data.amount.toString());

  // Add event_payload as JSON string if provided
  if (data.event_payload) {
    formData.append('event_payload', JSON.stringify(data.event_payload));
  }

  const response = await apiClient({
    method: 'post',
    url: ENDPOINTS.CREATE_SERVICE_PAYMENT,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const verifyServicePaymentApi = async (
  data: VerifyServicePaymentProps
): Promise<PaymentSuccessResponse> => {
  const formData = new FormData();
  formData.append('razorpay_order_id', data.razorpay_order_id);
  formData.append('razorpay_payment_id', data.razorpay_payment_id);
  formData.append('razorpay_signature', data.razorpay_signature);
  formData.append('amount', data.amount);
  formData.append('booking_id', data.booking_id);

  // Add event_payload as JSON string if provided
  if (data.event_payload) {
    formData.append('event_payload', JSON.stringify(data.event_payload));
  }

  const response = await apiClient({
    method: 'post', // Changed from 'put' to 'post' to match the API spec
    url: ENDPOINTS.VERIFY_SERVICE_PAYMENT,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};

export const confirmTolooEventApi = async (
  data: ConfirmTolooEventProps
): Promise<TolooEventResponse> => {
  const formData = new FormData();
  formData.append('user_id', data.user_id);
  formData.append('qrtype', data.qrtype);
  formData.append('types', data.types);
  formData.append('source', data.source);
  formData.append('count', data.count.toString());
  formData.append('room_number', data.room_number);
  formData.append('listing', data.listing);

  const response = await apiClient({
    method: 'post',
    url: ENDPOINTS.CONFIRM_TOLOO_EVENT,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return response.data;
};
