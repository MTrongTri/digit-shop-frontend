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
    if (error.response) {
      return error.response?.data;
    }

    return error;
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
    if (error.response) {
      return error.response?.data;
    }

    return error;
  }
};

const createProduct = async (data) => {
  try {
    const res = await httpClient.post(`/products`, data);

    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response?.data;
    }

    return error;
  }
};

export { getProductPaginate, getProductAdminPage, createProduct };
