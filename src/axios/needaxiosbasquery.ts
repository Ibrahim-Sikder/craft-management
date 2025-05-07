// /* eslint-disable @typescript-eslint/no-unused-vars */
// import type { BaseQueryFn } from "@reduxjs/toolkit/query";
// import type { AxiosError, AxiosRequestConfig } from "axios";
// import { IMeta } from "@/types";
// import { instance } from "./axiosInstance";

// export const axiosBaseQuery =
//   (
//     { baseUrl }: { baseUrl: string } = { baseUrl: "" }
//   ): BaseQueryFn<
//     {
//       url: string;
//       method?: AxiosRequestConfig["method"];
//       data?: AxiosRequestConfig["data"];
//       params?: AxiosRequestConfig["params"];
//       headers?: AxiosRequestConfig["headers"];
//       meta?: IMeta;
//       contentType?: string;
//     },
//     unknown,
//     unknown
//   > =>
//   async ({ url, method, data, params, headers, contentType }) => {
//     try {
//       const result = await instance({
//         url: baseUrl + url,
//         method,
//         data,
//         params,
//         headers: {
//           "Content-type": contentType || "application/json",
//           ...headers,
//         },
//       });

//       // ✅ result already has `data` and `meta` from interceptor
//       return result;
//     } catch (axiosError) {
//       const err = axiosError as AxiosError;

//       return {
//         error: {
//           status: err.response?.status || 500,
//           data: err.response?.data || err.message,
//         },
//       };
//     }
//   };
