import httpClient from "@/utils/request";

const getAllUser = async () => {
  try {
    const res = await httpClient.get("/users");
    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response?.data;
    }

    return error;
  }
};

export { getAllUser };
