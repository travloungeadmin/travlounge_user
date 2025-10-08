//api.mapbox.com/search/searchbox/v1/suggest?q=thootha&language=en&country=in&session_token=0a2d42dd-0d04-4be1-8912-abb107c08894&access_token=pk.eyJ1Ijoic3VoYWlsa2siLCJhIjoiY2x5dnEzZXV0MWsxcjJrb2R1NXB1cmVmbCJ9.5ywOthxjBbAVQEiYOtrtAQ

import apiClient from '.';

type getLocationPropsType = {
  longitude: number;
  latitude: number;
  access_token?: string;
};

const getSearchSuggestionApi = async (params) => {
  //   const response = await apiClient({
  //     method: "get",
  //     const apiKey = "YOUR_API_KEY";
  // const query = "restaurants in Sydney";
  //     baseURL: `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(query)}&key=${apiKey}`,
  //   });
  //   return response.data;
};
const getCoordinateApi = async ({ id, params }) => {
  const response = await apiClient({
    method: 'get',
    baseURL: 'https://api.mapbox.com/search/searchbox/v1/retrieve/',
    url: `${id}`,
    params,
  });
  return response.data;
};

const getLocationApi = async (props: getLocationPropsType) => {
  const { longitude, latitude, access_token = process.env.EXPO_PUBLIC_MAPBOX_ACCESS_TOKEN } = props;
  const response = await apiClient({
    method: 'get',
    baseURL: 'https://api.mapbox.com/search/geocode/v6/reverse',
    params: {
      longitude,
      latitude,
      access_token,
    },
  });
  return response.data;
};

export { getCoordinateApi, getLocationApi, getSearchSuggestionApi };
