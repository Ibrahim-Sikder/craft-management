import { baseApi } from "./baseApi";

export const feeCategoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createFeeCategory: build.mutation({
      query: (data) => ({
        url: "/fee-category",
        method: "POST",
        data,
      }),
      invalidatesTags: ["feeCategory"],
    }),

    getAllFeeCategories: build.query({
      query: ({ limit, page, searchTerm }) => ({
        url: "/fee-category",
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: ["feeCategory"],
    }),

    getSingleFeeCategory: build.query({
      query: (id) => ({
        url: `/fee-category/${id}`,
        method: "GET",
      }),
      providesTags: ["feeCategory"],
    }),

    updateFeeCategory: build.mutation({
      query: ({ id, data }) => ({
        url: `/fee-category/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["feeCategory"],
    }),

    deleteFeeCategory: build.mutation({
      query: (id) => ({
        url: `/fee-category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["feeCategory"],
    }),
  }),
});

export const {
  useCreateFeeCategoryMutation,
  useGetAllFeeCategoriesQuery,
  useGetSingleFeeCategoryQuery,
  useUpdateFeeCategoryMutation,
  useDeleteFeeCategoryMutation,
} = feeCategoryApi;
