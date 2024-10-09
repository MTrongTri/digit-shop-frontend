import httpClient from "@/utils/request";

const login = async ({ email, password }) => {
  try {
    const res = await httpClient.post("/auth/login", { email, password });
    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response?.data;
    }

    return error;
  }
};

const signup = async ({ email, password }) => {
  try {
    const res = await httpClient.post("/auth/register", { email, password });
    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response?.data;
    }

    return error;
  }
};

export { login, signup };
