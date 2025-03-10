import httpClient from "@/utils/request";

const paymentVNPIPN = async (params) => {
  try {
    const res = await httpClient.get("/payments/vnpay_ipn", { params });
    return res.data;
  } catch (error) {
    throw error;
  }
};

export { paymentVNPIPN };
