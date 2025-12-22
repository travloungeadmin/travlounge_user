import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  getFilterOptionsApi,
  getUsedCarDetailsApi,
  getUsedCarsListApi,
  GetUsedCarsParams,
  toggleUsedCarsFavoriteApi,
} from '../api/used-cars';
import QUERIES_KEY from './query-keys';

const useUsedCarsListQuery = (params: Omit<GetUsedCarsParams, 'page'>) =>
  useInfiniteQuery({
    queryFn: ({ pageParam = 1 }) => getUsedCarsListApi({ ...params, page: pageParam }),
    queryKey: [QUERIES_KEY.USED_CARS_LIST, params],
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return lastPage.count > nextPage ? nextPage : undefined;
    },
    select: (data) => data?.pages?.flatMap((page) => page.results) || [],
  });

const useToggleUsedCarsFavoriteMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: toggleUsedCarsFavoriteApi,
    onSuccess: () => {
      queryClient.invalidateQueries([QUERIES_KEY.USED_CARS_LIST] as any);
    },
  });
};

const useUsedCarDetailsQuery = (id: number | string) =>
  useQuery({
    queryFn: () => getUsedCarDetailsApi(id),
    queryKey: [QUERIES_KEY.USED_CAR_DETAILS, id],
    enabled: !!id,
  });

const useFilterOptionsQuery = () =>
  useQuery({
    queryFn: getFilterOptionsApi,
    queryKey: [QUERIES_KEY.USED_CARS_FILTER_OPTIONS],
  });

export {
  useFilterOptionsQuery,
  useToggleUsedCarsFavoriteMutation,
  useUsedCarDetailsQuery,
  useUsedCarsListQuery,
};
