import httpClient from "@/utils/request";

const getReviewsPage = async (pageNo = 0, pageSize = 12, productId) => {
  try {
    const res = await httpClient.get(
      `/product_reviews?pageNo=${pageNo}&&pageSize=${pageSize}&&productId=${productId}`,
    );
    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response?.data;
    }

    return error;
  }
};

const getReviewsStar = async (productId) => {
  try {
    const res = await httpClient.get(
      `/product_reviews/products/${productId}/stars`,
    );
    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response?.data;
    }

    return error;
  }
};

const createReview = async ({ productId, rating, comment }) => {
  try {
    const res = await httpClient.post(`/product_reviews`, {
      productId,
      rating,
      comment,
    });
    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response?.data;
    }

    return error;
  }
};

const deleteReview = async (id) => {
  try {
    const res = await httpClient.delete(`/product_reviews/${id}`);
    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response?.data;
    }

    return error;
  }
};

export { getReviewsPage, getReviewsStar, createReview, deleteReview };
