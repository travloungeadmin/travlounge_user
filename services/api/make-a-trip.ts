import apiClient from '.';
import ENDPOINTS from '../end-points';
import { MakeATripChatSuggestionsResponse } from './types';

export const getMakeATripChatApi = async (props: { prompt: string; session_id?: string }) => {
  const { prompt, session_id } = props;
  const response = await apiClient({
    method: 'post',
    url: ENDPOINTS.MAKE_A_TRIP_CHAT,
    data: {
      prompt,
      ...(session_id ? { session_id } : {}),
    },
  });
  return response.data;
};

export const getMakeATripChatSuggestionsApi =
  async (): Promise<MakeATripChatSuggestionsResponse> => {
    const response = await apiClient<MakeATripChatSuggestionsResponse>({
      method: 'get',
      url: ENDPOINTS.MAKE_A_TRIP_CHAT_SUGGESTIONS,
    });

    return response.data;
  };
