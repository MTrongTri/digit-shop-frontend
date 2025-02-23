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

export { addToCart };
