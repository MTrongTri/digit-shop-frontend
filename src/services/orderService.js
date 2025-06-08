import httpClient from "@/utils/request";

const createOrder = async (data) => {
  try {
    const res = await httpClient.post("/orders", data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const getOrderById = async (orderId) => {
  try {
    const res = await httpClient.get(`/orders/${orderId}`);
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

const getOrderAdminWithFilter = async (params) => {
  try {
    const res = await httpClient.get(`/orders`, { params });
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

const getMonthlyRevenueByYear = async (year) => {
  try {
    const res = await httpClient.get(`/orders/monthly-revenue/${year}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const getMonthlyOrderStatsByYear = async (year) => {
  try {
    const res = await httpClient.get(`/orders/monthly-stats/${year}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export {
  createOrder,
  getOrderById,
  getOrderByUserFilter,
  getOrderAdminWithFilter,
  updateStatus,
  getMonthlyRevenueByYear,
  getMonthlyOrderStatsByYear,
};
