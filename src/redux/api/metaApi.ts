// staffApi.ts
import { baseApi } from "./baseApi";

export const metaApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllMeta: build.query({
      query: () => ({
        url: "/meta",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetAllMetaQuery } = metaApi;
