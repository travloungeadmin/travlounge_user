import { useMutation, useQuery } from '@tanstack/react-query';
import {
  generateOTPApi,
  refreshAccessApi,
  registerApi,
  updateDeviceTokenApi,
  verifyOTPApi,
} from '../api/auth';
import QUERIES_KEY from './query-keys';

const generateOTPMutation = () =>
  useMutation({
    mutationFn: generateOTPApi,
    mutationKey: [QUERIES_KEY.AUTH.GENERATE_OTP],
  });

const verifyOTPQuery = () =>
  useMutation({
    mutationFn: verifyOTPApi,
  });

const userRegisterQuery = () =>
  useMutation({
    mutationFn: registerApi,
  });

const useRefreshTokenQuery = (data: any) =>
  useQuery({
    queryFn: () => refreshAccessApi(data),
    queryKey: [QUERIES_KEY.REFRESH_TOKEN],
  });

const updateDeviceTokenMutation = () =>
  useMutation({
    mutationFn: updateDeviceTokenApi,
  });

export {
  generateOTPMutation,
  updateDeviceTokenMutation,
  useRefreshTokenQuery,
  userRegisterQuery,
  verifyOTPQuery,
};
