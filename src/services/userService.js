import httpClient from "@/utils/request";

const getAllUser = async () => {
  try {
    const res = await httpClient.get("/users");
    return res.data;
  } catch (error) {
    throw error;
  }
};

export { getAllUser };
