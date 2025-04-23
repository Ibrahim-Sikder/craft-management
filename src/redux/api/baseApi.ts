import { axiosBaseQuery } from "@/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "./tag-types";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_API_URL as string,
  }),
  endpoints: () => ({}),
  tagTypes: tagTypesList,
});

export const {} = baseApi;
