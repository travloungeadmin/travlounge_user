import apiClient from "@/services/api";
import ENDPOINTS from "@/services/end-points";
import { Alert } from "react-native";

export type LoungesListApiParams = {
  latitude: number;
  longitude: number;
  radius: number;
  lat_from: number;
  lon_from: number;
  lat_to: number;
  lon_to: number;
};

export type DirectionProps = {
  fromLongitude: number;
  fromLatitude: number;
  toLongitude: number;
  toLatitude: number;
  alternatives?: boolean;
  geometries?: string;
  language?: string;
  overview?: string;
  steps?: boolean;
  access_token: string;
};

const getLoungesListApi = async (params: LoungesListApiParams) => {
  const response = await apiClient({
    method: "get",
    url: `${ENDPOINTS.MAKE_A_TRIP}`,
    params,
  });
  return response.data;
};

const getLoungesCoordinatesApi = async () => {
  const response = await apiClient({
    method: "get",
    url: `${ENDPOINTS.LOUNGES_COORDINATES_LIST}`,
  });
  return response.data;
};

const getLoungesCategoryApi = async () => {
  const response = await apiClient({
    method: "get",
    url: `${ENDPOINTS.LOUNGES_CATEGORY}`,
  });
  return response.data;
};
const getLoungeDetailsApi = async ({ id, latitude, longitude }) => {
  const response = await apiClient({
    method: "get",
    url: `${ENDPOINTS.LOUNGE_DETAILS}${id}`,
    params: {
      latitude,
      longitude,
    },
  });
  return response.data;
};

const getDirectionApi = async (props: DirectionProps) => {
  const {
    fromLongitude,
    fromLatitude,
    toLongitude,
    toLatitude,
    alternatives = true,
    geometries = "geojson",
    language = "en",
    overview = "full",
    steps = true,
    access_token,
  } = props;
  const response = await apiClient({
    method: "get",
    baseURL: "https://api.mapbox.com/directions/v5/mapbox/driving/",
    url: `${fromLongitude}%2C${fromLatitude}%3B${toLongitude}%2C${toLatitude}`,
    params: {
      alternatives,
      geometries,
      language,
      overview,
      steps,
      access_token,
    },
  });

  return response.data;
};

export type getRouteStationListApiProps = {
  lat_from: number;
  lon_from: number;
  lat_to: number;
  lon_to: number;
  radius: number;
  curr_lat: number;
  curr_lon: number;
};

const getRouteStationListApi = async (props: getRouteStationListApiProps) => {
  const { lat_from, lon_from, lat_to, lon_to, radius, curr_lat,
    curr_lon, } = props;

  const response = await apiClient({
    method: "get",
    url: ENDPOINTS.ROUTE_STATION_LIST,
    params: {
      lat_from,
      lon_from,
      lat_to,
      lon_to,
      radius,
      curr_lat,
      curr_lon,
    },
  });
  return response.data;
};

export {
  getLoungeDetailsApi,
  getLoungesListApi,
  getLoungesCoordinatesApi,
  getLoungesCategoryApi,
  getDirectionApi,
  getRouteStationListApi,
};
