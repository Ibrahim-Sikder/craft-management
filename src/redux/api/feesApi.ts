import { baseApi } from "./baseApi";

export const feesApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createFee: build.mutation({
      query: ({ studentId, ...data }) => ({
        url: `/fees/students/${studentId}/fees`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["fees", "students"],
    }),
    payFee: build.mutation({
      query: (data) => ({
        url: "/fees/pay",
        method: "POST",
        data,
      }),
      invalidatesTags: ["fees"],
    }),

    getAllFees: build.query({
      query: ({ limit, page, searchTerm }) => ({
        url: "/fees",
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: ["fees"],
    }),
    getDueFees: build.query({
      query: ({ limit, page, searchTerm }) => ({
        url: "/fees/due",
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: ["fees"],
    }),

    getSingleFee: build.query({
      query: ({ id }) => ({
        url: `/fees/${id}`,
        method: "GET",
      }),
      providesTags: ["fees"],
    }),

    updateFee: build.mutation({
      query: ({ id, data }) => ({
        url: `/fees/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["fees"],
    }),

    deleteFee: build.mutation({
      query: (id) => ({
        url: `/fees/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["fees"],
    }),
  }),
});

export const {
  useCreateFeeMutation,
  useGetAllFeesQuery,
  useGetSingleFeeQuery,
  useUpdateFeeMutation,
  useDeleteFeeMutation,
  useGetDueFeesQuery,
  usePayFeeMutation,
} = feesApi;
