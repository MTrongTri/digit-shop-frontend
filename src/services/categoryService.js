import httpClient from "@/utils/request";

const getAllCategory = async () => {
  try {
    const res = await httpClient.get("/categories");
    return res.data;
  } catch (error) {
    throw error;
  }
};

const getCategoryById = async (id) => {
  try {
    const res = await httpClient.get(`/categories/${id}`);
    return res.data;
  } catch (error) {
    throw error;
  }
};

const getCategoriesPage = async (pageNo = 0, pageSize = 12) => {
  try {
    const res = await httpClient.get(
      `/categories/page?pageNo=${pageNo}&pageSize=${pageSize}`,
    );
    return res.data;
  } catch (error) {
    throw error;
  }
};

const createCategory = async (data) => {
  try {
    const res = await httpClient.post("/categories", data);

    return res.data;
  } catch (error) {
    throw error;
  }
};

const updateCategory = async ({ id, data }) => {
  try {
    const res = await httpClient.put(`/categories/${id}`, data);

    return res.data;
  } catch (error) {
    throw error;
  }
};

export {
  getAllCategory,
  getCategoryById,
  getCategoriesPage,
  createCategory,
  updateCategory,
};
