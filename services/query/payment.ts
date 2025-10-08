import { useMutation } from '@tanstack/react-query';
import { confirmTolooEventApi, createServicePaymentApi, verifyServicePaymentApi } from '../api/payment';
import QUERIES_KEY from './query-keys';

export const useCreateServicePayment = () =>
  useMutation({
    mutationFn: createServicePaymentApi,
    mutationKey: [QUERIES_KEY.CREATE_SERVICE_PAYMENT],
  });

export const useVerifyServicePayment = () =>
  useMutation({
    mutationFn: verifyServicePaymentApi,
    mutationKey: [QUERIES_KEY.VERIFY_SERVICE_PAYMENT],
  });

export const useConfirmTolooEvent = () =>
  useMutation({
    mutationFn: confirmTolooEventApi,
    mutationKey: [QUERIES_KEY.CONFIRM_TOLOO_EVENT],
  });