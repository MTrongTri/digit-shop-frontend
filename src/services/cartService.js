import httpClient from "@/utils/request";

const addToCart = async ({ productId, quantity }) => {
  try {
    const res = await httpClient.post(`/carts`, {
      productId,
      quantity,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

const countCartItem = async () => {
  try {
    const res = await httpClient.get(`/carts/items/count`);

    return res.data;
  } catch (error) {
    throw error;
  }
};

const getCartItems = async () => {
  try {
    const res = await httpClient.get(`/carts/items`);

    return res.data;
  } catch (error) {
    throw error;
  }
};

const updateQuantityCartItem = async ({ productId, quantity }) => {
  try {
    const res = await httpClient.put(`/carts/items/products/${productId}`, {
      quantity,
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

const deleteCartItemByProductId = async (productId) => {
  try {
    const res = await httpClient.delete(`/carts/items/products/${productId}`);

    return res.data;
  } catch (error) {
    throw error;
  }
};

const deleteCartItemsByProductIds = async (productIds = []) => {
  try {
    console.log(productIds);
    const res = await httpClient.delete(`/carts/items/product_ids`, {
      data: { productIds },
    });

    return res.data;
  } catch (error) {
    throw error;
  }
};

export {
  addToCart,
  countCartItem,
  getCartItems,
  updateQuantityCartItem,
  deleteCartItemByProductId,
  deleteCartItemsByProductIds,
};
