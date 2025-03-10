import httpClient from "@/utils/request";

const createOrder = async (data) => {
  try {
    const res = await httpClient.post("/orders", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export { createOrder };
