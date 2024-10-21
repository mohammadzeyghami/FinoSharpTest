// src/api/axios.js
import { AuthContext } from "@/components/molecules/providers/AuthContext";
import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

// Custom hook to use axios instance with interceptors
const useAxios = () => {
  // @ts-ignore
  const { logout } = useContext(AuthContext); // Access AuthContext
  const navigate = useNavigate(); // React Router hook for navigation

  // Create an Axios instance
  const axiosInstance = axios.create({
    baseURL: "https://api.yourdomain.com", // Replace with your API base URL
  });

  // Request interceptor to add JWT token to the headers
  axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // Response interceptor to handle errors, including token refresh
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;

      // Check if the error is a 401 and hasn't been retried yet
      if (
        error.response &&
        error.response.status === 401 &&
        !originalRequest._retry
      ) {
        originalRequest._retry = true;

        try {
          const refreshToken = localStorage.getItem("refreshToken");

          // Attempt to get a new access token using the refresh token
          const response = await axios.post(
            "https://api.yourdomain.com/auth/refresh",
            { token: refreshToken }
          );

          const newAccessToken = response.data.accessToken;

          // Store the new access token
          localStorage.setItem("accessToken", newAccessToken);

          // Update the Authorization header in the original request and retry it
          originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${newAccessToken}`;

          return axiosInstance(originalRequest);
        } catch (refreshError) {
          // If refresh token fails (e.g., it is expired), log out the user
          logout();
          navigate("/login");
          return Promise.reject(refreshError);
        }
      }

      // If the error is not related to token expiration, or if retry failed
      return Promise.reject(error);
    }
  );

  return axiosInstance;
};

export default useAxios;
