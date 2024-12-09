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

const getCategoryById = async (id) => {
  try {
    const res = await httpClient.get(`/categories/${id}`);
    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response?.data;
    }

    return error;
  }
};

const getCategoriesPage = async (pageNo = 0, pageSize = 12) => {
  try {
    const res = await httpClient.get(
      `/categories/page?pageNo=${pageNo}&pageSize=${pageSize}`,
    );
    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response?.data;
    }

    return error;
  }
};

const createCategory = async (data) => {
  try {
    const res = await httpClient.post("/categories", data);

    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response?.data;
    }

    return error;
  }
};

const updateCategory = async ({ id, data }) => {
  try {
    const res = await httpClient.put(`/categories/${id}`, data);

    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response?.data;
    }

    return error;
  }
};

export {
  getAllCategory,
  getCategoryById,
  getCategoriesPage,
  createCategory,
  updateCategory,
};
