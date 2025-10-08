import { useMutation, useQuery } from '@tanstack/react-query';

import {
  deleteAccount,
  getProfileApi,
  getUserDetailsApi,
  subscribeApi,
  updateProfileApi,
  verifySubscribeApi,
} from '@/services/api/profile';
import QUERIES_KEY from '@/services/query/query-keys';

const getProfileQuery = () =>
  useQuery({
    queryFn: getProfileApi,
    queryKey: [QUERIES_KEY.PROFILE],
  });
const getUserDetails = () =>
  useQuery({
    enabled: false,
    queryFn: getUserDetailsApi,
    queryKey: [QUERIES_KEY.USER_DETAILS],
  });

const subscribeMutation = () =>
  useMutation({
    mutationFn: subscribeApi,
  });
const verifySubscribeMutation = () =>
  useMutation({
    mutationFn: verifySubscribeApi,
  });
const deleteAccountMutation = () =>
  useMutation({
    mutationFn: deleteAccount,
  });

const useEditProfile = () =>
  useMutation({
    mutationFn: updateProfileApi,
  });

export {
  deleteAccountMutation,
  getProfileQuery,
  getUserDetails,
  subscribeMutation,
  useEditProfile,
  verifySubscribeMutation,
};
