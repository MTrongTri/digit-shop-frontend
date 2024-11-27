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

const logout = async ({ accessToken, refreshToken }) => {
  try {
    const res = await httpClient.post(
      "/auth/logout",
      {},
      {
        headers: {
          "access-token": accessToken,
          "refresh-token": refreshToken,
        },
      },
    );

    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response?.data;
    }

    return error;
  }
};

const handleRefreshToken = async ({ refreshToken }) => {
  try {
    const res = await httpClient.post(
      "/auth/refresh-token",
      {},
      {
        headers: { "x-token": refreshToken },
      },
    );

    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response?.data;
    }

    return error;
  }
};

const introspect = async () => {
  try {
    const token = localStorage.getItem("accessToken");

    const res = await httpClient.post(
      "/auth/introspect",
      {},
      {
        headers: { token: token },
      },
    );

    return res.data;
  } catch (error) {
    if (error.response) {
      return error.response?.data;
    }

    return error;
  }
};

export { login, signup, logout, handleRefreshToken, introspect };
