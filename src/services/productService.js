import httpClient from "@/utils/request";

const getProductPaginate = async ({
  currentPage,
  pageSize = 12,
  keySearch,
  sortBy,
}) => {
  try {
    const res = await httpClient.get(`/products`, {
      params: {
        pageNo: currentPage,
        pageSize,
        keySearch,
        sortBy,
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

const getProductById = async (id) => {
  try {
    const res = await httpClient.get(`/products/${id}`);

    return res.data;
  } catch (error) {
    throw error;
  }
};

const getProductAdminPage = async ({
  currentPage,
  pageSize = 12,
  keySearch,
  sortBy,
}) => {
  try {
    const res = await httpClient.get(`/products/all`, {
      params: {
        pageNo: currentPage,
        pageSize,
        keySearch,
        sortBy,
      },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

const createProduct = async (data) => {
  try {
    const res = await httpClient.post(`/products`, data);

    return res.data;
  } catch (error) {
    throw error;
  }
};

const updateProduct = async ({ id, data }) => {
  try {
    const res = await httpClient.put(`/products/${id}`, data);

    return res.data;
  } catch (error) {
    throw error;
  }
};

export {
  getProductPaginate,
  getProductAdminPage,
  createProduct,
  getProductById,
  updateProduct,
};
