import apiClient from '@/services/api';
import ENDPOINTS from '@/services/end-points';

export const refreshAccessApi = async (refreshToken: string) => {
  const formData = new FormData();
  formData.append('refresh', refreshToken);
  const response = await apiClient({
    method: 'post',
    url: ENDPOINTS.REFRESH,
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  console.log('🚀 ~ file: refresh.ts ~ line 10 ~ refreshAccessApi ~ response', response.data);

  return response.data;
};
