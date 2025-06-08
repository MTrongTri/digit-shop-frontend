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

const getAllBrandPage = async () => {
  try {
    const res = await httpClient.get("/brands/page");
    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response?.data;
    }

    return error;
  }
};

const createBrand = async (data) => {
  try {
    const res = await httpClient.post("/brands", data);
    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response?.data;
    }

    return error;
  }
};

const updateBrand = async ({ id, data }) => {
  try {
    const res = await httpClient.put(`/brands/${id}`, data);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const getBrandById = async (id) => {
  try {
    const res = await httpClient.get(`/brands/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export { getAllBrand, getAllBrandPage, createBrand, updateBrand, getBrandById };
