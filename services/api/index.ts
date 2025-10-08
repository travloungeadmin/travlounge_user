import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

import { jwtDecode } from 'jwt-decode';

import useUserStore, { logout } from '@/modules/user';

function isTokenExpired(token: string) {
  if (!token) return true;

  try {
    const { exp } = jwtDecode(token); // exp is in seconds
    if (!exp) return true;

    return Date.now() >= exp * 1000;
  } catch (e) {
    return true; // invalid token
  }
}

const refreshAccessApi = async (refreshToken: string) => {
  const formData = new FormData();
  formData.append('refresh', refreshToken);
  const response = await axios({
    method: 'post',
    url: `${process.env.EXPO_PUBLIC_API_URL}customer/refresh-token-access/`,
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return response.data;
};

const apiClient = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL,
});

// Log only in development
const logOnDev = (
  message: string,
  log?: AxiosResponse | InternalAxiosRequestConfig | AxiosError
) => {
  if (__DEV__) {
    console.log(message, log);
  }
};

// Attach token to request headers
apiClient.interceptors.request.use(
  async (config) => {
    const session = useUserStore.getState().session;
    if (session) {
      if (isTokenExpired(session)) {
        const refresh = useUserStore.getState()?.refresh;
        if (refresh) {
          const res = await refreshAccessApi(refresh);
          useUserStore.getState()?.setSession(res.access);

          config.headers.Authorization = `Bearer ${res.access}`;
        }
      } else {
        config.headers.Authorization = `Bearer ${session}`;
      }
    }

    return config;
  },
  (error) => {
    console.log('Request error', error);
    return Promise.reject(error);
  }
);

// Handle responses & token expiration
apiClient.interceptors.response.use(
  (response) => {
    const { method, url } = response.config;
    const { status } = response;
    logOnDev(`✨ [${method?.toUpperCase()}] ${url} | Response ${status}`, response.data);
    return response;
  },
  async (error) => {
    const { message } = error;
    const { status } = error.response || {};
    const { method, url } = error.config;

    // Handle Token Expiry
    if (status === 401) {
      logout();
    }
    logOnDev(
      `🚨 [${method?.toUpperCase()}] ${url} | Error ${status} ${error.response} | ${message}`,
      error
    );

    return Promise.reject(error);
  }
);

export default apiClient;
