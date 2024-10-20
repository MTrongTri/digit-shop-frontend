import httpClient from "@/utils/request";

const getAllCategory = async () => {
  try {
    const res = await httpClient.get("/categories");
    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response?.data;
    }

    return error;
  }
};

export { getAllCategory };
