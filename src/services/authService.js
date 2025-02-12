import httpClient from "@/utils/request";

const login = async ({ email, password }) => {
  try {
    const res = await httpClient.post("/auth/login", { email, password });
    return res.data;
  } catch (error) {
    throw error;
  }
};

const signup = async ({ email, password }) => {
  try {
    const res = await httpClient.post("/auth/register", { email, password });
    return res.data;
  } catch (error) {
    throw error;
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
    throw error;
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
    console.log("a");

    return res.data;
  } catch (error) {
    console.log("b");

    throw error;
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
    throw error;
  }
};

export { login, signup, logout, handleRefreshToken, introspect };
