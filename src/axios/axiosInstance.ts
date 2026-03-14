/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { IGenericErrorResponse } from "@/types";
import axios from "axios";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  withCredentials: true,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// ── Refresh queue state ──────────────────────────────────────────────────────
let isRefreshing = false;
let failedQueue: Array<{
  resolve: (value?: unknown) => void;
  reject: (reason?: unknown) => void;
}> = [];

const processQueue = (error: unknown) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve();
    }
  });
  failedQueue = [];
};
// ────────────────────────────────────────────────────────────────────────────

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
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
      // If already refreshing, queue this request
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then(() => instance(originalRequest))
          .catch((err) => Promise.reject(err));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        // Use instance (not bare axios) so withCredentials is always consistent
        await instance.post("/auth/refresh-token", {});
        processQueue(null);
        return instance(originalRequest);
      } catch (refreshError: any) {
        processQueue(refreshError);
        if (typeof window !== "undefined") {
          window.location.href = "/";
        }
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
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
