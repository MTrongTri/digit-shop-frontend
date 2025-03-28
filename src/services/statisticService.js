import httpClient from "@/utils/request";

const getStatistics = async () => {
  try {
    const res = await httpClient.get("/statistics/summary");
    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response?.data;
    }

    return error;
  }
};

export { getStatistics };
