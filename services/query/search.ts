// import { useQuery } from "@tanstack/react-query";
// import { getCoordinateApi, getSearchSuggestionApi } from "../api/search";
// import QUERIES_KEY from "./query-keys";

// interface SearchSuggestionParams {
//   place: string;
// }

// const getSearchSuggestionQuery = (params: SearchSuggestionParams) =>
//   useQuery({
//     enabled: !!params.place,
//     queryFn: () => getSearchSuggestionApi(params),
//     queryKey: [QUERIES_KEY.SEARCH_SUGGESTION],
//     select: (data) => data.suggestions,
//   });
// const getCoordinateQuery = (id, params) =>
//   useQuery({
//     queryFn: () => getCoordinateApi(id, params),
//     queryKey: [QUERIES_KEY.SEARCH_COORDINATE],
//     select: (data) => data,
//   });

// export { getSearchSuggestionQuery, getCoordinateQuery };
