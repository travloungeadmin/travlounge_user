import apiClient from ".";
import ENDPOINTS from "../end-points";

const getAvalablePodsApi = async (data) => {
    const response = await apiClient({
      method: "post",
      url: ENDPOINTS.AVALABLE_SLEEPINGPOD,
      data,
    });
    return response.data;
  };

  export {getAvalablePodsApi}