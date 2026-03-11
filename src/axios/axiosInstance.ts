/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IGenericErrorResponse } from "@/types";
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  withCredentials: true, // THIS IS CRUCIAL
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // Log the request for debugging
    console.log("Making request to:", config.url);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    console.log("Response received:", response.status);

    // Check if cookies are being set
    const cookies = response.headers["set-cookie"];
    if (cookies) {
      console.log("Cookies set:", cookies);
    }

    const responseObject: any = {
      data: response?.data || response?.data,
      meta: response?.data?.meta,
      success: response?.data?.success,
      message: response?.data?.message,
    };
    return responseObject;
  },
  async function (error) {
    console.error("Response error:", error.response?.status);

    const originalRequest = error.config;

    // Handle 401 errors (token expired)
    if (error?.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Try to refresh token
        const response = await axios.post(
          `${process.env.NEXT_PUBLIC_BASE_API_URL}/auth/refresh-token`,
          {},
          { withCredentials: true },
        );

        if (response.data.success) {
          return instance(originalRequest);
        }
      } catch (refreshError: any) {
        // Redirect to login if refresh fails
        if (typeof window !== "undefined") {
          window.location.href = "/";
        }
      }
    }

    // Return error response
    const responseObject: IGenericErrorResponse = {
      statusCode: error?.response?.data?.statusCode || 500,
      message: error?.response?.data?.message || "Something went wrong!!!",
      errorMessages: error?.response?.data?.message,
    };
    return Promise.reject(responseObject);
  },
);

export { instance };
