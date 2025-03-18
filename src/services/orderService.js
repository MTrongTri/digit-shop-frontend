import httpClient from "@/utils/request";

const createOrder = async (data) => {
  try {
    const res = await httpClient.post("/orders", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const getOrderByUserFilter = async (userId, params) => {
  try {
    const res = await httpClient.get(`/orders/users/${userId}`, { params });
    return res.data;
  } catch (error) {
    throw error;
  }
};

const updateStatus = async (id, status) => {
  try {
    const res = await httpClient.put(`/orders/status/${id}`, {
      orderStatus: status,
    });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export { createOrder, getOrderByUserFilter, updateStatus };
