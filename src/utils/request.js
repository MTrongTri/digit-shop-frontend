import axios from "axios";
import { handleRefreshToken } from "@/services/authService";
import toast from "react-hot-toast";
import { removeInfoLogout } from "./localStorage";

const httpClient = axios.create({
  baseURL: "http://localhost:8080/api/v1",
  //headers: { "Content-Type": "application/json" },
});

httpClient.interceptors.request.use(
  (request) => {
    if (request.url.includes("/auth/refresh-token")) {
      return request;
    }

    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      request.headers["Authorization"] = `Bearer ${accessToken}`;
    }

    return request;
  },
  (error) => Promise.reject(error),
);

let isRefreshing = false;
let failedQueue = [];

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (!error.response || error.response.status !== 401) {
      return Promise.reject(error);
    }

    const errorCode = error.response?.data?.errorCode;
    if (errorCode !== 2004 || originalRequest._retry) {
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    const refreshToken = localStorage.getItem("refreshToken");
    if (!refreshToken) {
      removeInfoLogout();
      alert("Phiên đã hết hạn");
      window.location.href = "/login";
      return Promise.reject(new Error("No refresh token available"));
    }

    if (isRefreshing) {
      return new Promise((resolve) => {
        failedQueue.push((accessToken) => {
          originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;
          resolve(httpClient(originalRequest));
        });
      });
    }

    isRefreshing = true;

    try {
      const response = await handleRefreshToken({ refreshToken });
      const { accessToken, refreshToken: newRefreshToken } = response.data;

      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }
      if (newRefreshToken) {
        localStorage.setItem("refreshToken", newRefreshToken);
      }

      failedQueue.forEach((callback) => callback(accessToken));
      failedQueue = [];

      originalRequest.headers["Authorization"] = `Bearer ${accessToken}`;

      return httpClient(originalRequest);
    } catch (refreshError) {
      alert("Phiên đã hết hạn");
      removeInfoLogout();
      window.location.href = "/login";

      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  },
);

export default httpClient;
