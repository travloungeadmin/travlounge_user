import { useQuery } from "@tanstack/react-query";
import { getAvalablePodsApi } from "../api/sleeping-pod";
import QUERIES_KEY from "./query-keys";

const getAvalablePodsQuery = (data) =>
    useQuery({
      queryFn: () => getAvalablePodsApi(data),
      queryKey: [QUERIES_KEY.AVALABLE_PODS],
    });

    export {getAvalablePodsQuery}