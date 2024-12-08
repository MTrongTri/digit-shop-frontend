import httpClient from "@/utils/request";

const getAllBrand = async () => {
  try {
    const res = await httpClient.get("/brands");
    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response?.data;
    }

    return error;
  }
};

export { getAllBrand };
