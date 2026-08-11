import axios from "axios";

const API_URL = import.meta.env.VITE_SERVER_URL;

const httpRequest = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

httpRequest.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    // Access token missing/expired
    if (
      error.response?.status === 404 &&
      error.response?.data?.message === "access_token not found." &&
      !originalRequest?._retry
    ) {
      originalRequest._retry = true;

      try {
        // Refresh token API
        // Refresh token HTTP-only cookie automatically jayegi
        await httpRequest.get("/user/rotate_token");

        // Original request dobara bhejo
        return httpRequest(originalRequest);
      } catch (refreshError) {
        // Refresh token bhi invalid/expired
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default httpRequest;