/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "@/redux/api/baseApi";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        data,
      }),
      // Add this to handle the response properly
      transformResponse: (response: any) => {
        console.log("Login response:", response);
        return response;
      },
    }),
  }),
});

export const { useLoginMutation } = authApi;
