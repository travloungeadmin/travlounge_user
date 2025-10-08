import type { DirectionProps, LoungesListApiParams } from '@/services/api/make-a-trip';
import {
  getDirectionApi,
  getLoungeDetailsApi,
  getLoungesCategoryApi,
  getLoungesCoordinatesApi,
  getLoungesListApi,
  getRouteStationListApi,
} from '@/services/api/make-a-trip';
import { useMutation, useQuery } from '@tanstack/react-query';
import QUERIES_KEY from './query-keys';

const getLoungesListQuery = (loungesListProps: LoungesListApiParams) => {
  return useQuery({
    enabled:
      !!loungesListProps.latitude && !!loungesListProps.lat_from && !!loungesListProps.lat_to,
    queryFn: () => getLoungesListApi(loungesListProps),
    queryKey: [QUERIES_KEY.LOUNGES_LIST],
  });
};
const getLoungesCoordinatesListQuery = () =>
  useQuery({
    queryFn: getLoungesCoordinatesApi,
    queryKey: [QUERIES_KEY.LOUNGES_COORDINATES_LIST],
  });

const getLoungesCategoryQuery = () =>
  useQuery({
    queryFn: getLoungesCategoryApi,
    queryKey: [QUERIES_KEY.LOUNGES_CATEGORY],
  });

const getLoungeDetailsQuery = () =>
  useMutation({
    mutationFn: getLoungeDetailsApi,
    // enabled: !!latitude && !!longitude,
    // queryFn:()=> getLoungeDetailsApi(
    //  latitude,
    //  longitude
    // ),
    // queryKey: [QUERIES_KEY.LOUNGE_DETAILS],
  });
const getRouteStationListMutation = () =>
  useMutation({
    mutationFn: getRouteStationListApi,
    // mutationKey: [QUERIES_KEY.AUTH.GENERATE_OTP],
  });
// useQuery({
//   enabled: false,
//   queryFn:()=> getRouteStationListApi(data),
//   queryKey: [QUERIES_KEY.LOUNGE_DETAILS],
// });

const getDirectionQuery = (props: DirectionProps) =>
  useQuery({
    enabled: !!(props.fromLongitude && props.fromLatitude && props.toLongitude && props.toLatitude),
    queryFn: () => getDirectionApi(props),
    queryKey: [QUERIES_KEY.DIRECTION],
  });

export {
  getDirectionQuery,
  getLoungeDetailsQuery,
  getLoungesCategoryQuery,
  getLoungesCoordinatesListQuery,
  getLoungesListQuery,
  getRouteStationListMutation,
};
