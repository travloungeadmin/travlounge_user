import { useMutation, useQuery } from '@tanstack/react-query';
import { getMakeATripChatApi, getMakeATripChatSuggestionsApi } from '../api/make-a-trip';
import QUERIES_KEY from './query-keys';

export const getMakeATripChatMutation = () =>
  useMutation({
    mutationFn: getMakeATripChatApi,
  });

export const getMakeATripChatSuggestionsQuery = () =>
  useQuery({
    queryFn: () => getMakeATripChatSuggestionsApi(),
    queryKey: [QUERIES_KEY.MAKE_A_TRIP_CHAT_SUGGESTIONS],
  });
