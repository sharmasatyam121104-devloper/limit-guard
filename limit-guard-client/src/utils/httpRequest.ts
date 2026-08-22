import axios from "axios";
import { useAuthStore } from "../store/authStore";

const API_URL = import.meta.env.VITE_SERVER_URL;

const httpRequest = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

httpRequest.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    const status = error.response?.status;
    const errorCode = error.response?.data?.code;

    // Access token missing
    if (status === 401 && errorCode === "AUTH_TOKEN_MISSING") {
      useAuthStore.getState().setUser(null);

      window.location.href = "/login";

      return Promise.reject(error);
    }

    // Access token invalid/expired
    if (
      status === 401 &&
      errorCode === "AUTH_TOKEN_INVALID" &&
      !originalRequest?._retry
    ) {
      originalRequest._retry = true;

      try {
        // Refresh token HTTP-only cookie automatically jayegi
        await httpRequest.get("/user/rotate_token");

        // New access token ke baad original request retry
        return httpRequest(originalRequest);
      } catch (refreshError) {
        // Refresh token bhi invalid/expired
        useAuthStore.getState().setUser(null);

        window.location.href = "/login";

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default httpRequest;