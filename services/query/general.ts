import { useQuery } from '@tanstack/react-query';

import { getGeneralApi } from '../api/general';
import QUERIES_KEY from './query-keys';

/**
 * Hook to fetch general app configuration including force update settings
 * @returns Query result containing general configuration data
 */
const useGeneralQuery = () =>
  useQuery({
    queryFn: () => getGeneralApi(),
    queryKey: [QUERIES_KEY.GENERAL],
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 3,
  });

export { useGeneralQuery };
