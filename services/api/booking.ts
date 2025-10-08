import apiClient from '.';
import ENDPOINTS from '../end-points';

const getBookingsApi = async (page) => {
  const response = await apiClient({
    method: 'get',
    url: `${ENDPOINTS.BOOKINGS}`,
    params: {
      limit: 10,
      page: page,
    },
  });

  return response.data;
};
const getBookingDetailApi = async (id: string, isSleepingPod: boolean) => {
  const url = isSleepingPod
    ? `${ENDPOINTS.SLEEPING_POD_BOOKINGS}${id}/`
    : `${ENDPOINTS.BOOKING_DETAIL}${id}/`;
  const response = await apiClient({
    method: 'get',
    url: url,
  });

  return response.data;
};
const cancelBookingApi = async ({ id }) => {
  const response = await apiClient({
    method: 'post',
    url: `${ENDPOINTS.SLEEPING_POD_BOOKING_CANCEL}`,
    data: {
      booking_id: id,
    },
  });

  return response.data;
};
const cancelCarwashBookingApi = async ({ id }) => {
  const response = await apiClient({
    method: 'patch',
    url: `${ENDPOINTS.CAR_WASH_BOOKING_CANCEL}${id}`,
  });

  return response.data;
};
const rePayPodApi = async ({ id }) => {
  const response = await apiClient({
    method: 'get',
    url: `${ENDPOINTS.SLEEPING_POD_RE_PAYMENT}${id}/`,
  });

  return response.data;
};

export {
  cancelBookingApi,
  cancelCarwashBookingApi,
  getBookingDetailApi,
  getBookingsApi,
  rePayPodApi,
};
