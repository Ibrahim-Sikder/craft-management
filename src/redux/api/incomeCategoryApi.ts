import { baseApi } from "./baseApi";

export const incomeCategoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createIncomeCategory: build.mutation({
      query: (data) => ({
        url: "/income-category",
        method: "POST",
        data,
      }),
      invalidatesTags: ["income-category"],
    }),

    getAllIncomeCategories: build.query({
      query: ({ limit, page, searchTerm }) => ({
        url: "/income-category",
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: ["income-category"],
    }),

    getSingleIncomeCategory: build.query({
      query: ({ id }) => ({
        url: `/income-category/${id}`,
        method: "GET",
      }),
      providesTags: ["income-category"],
    }),

    updateIncomeCategory: build.mutation({
      query: ({ id, data }) => ({
        url: `/income-category/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["income-category"],
    }),

    deleteIncomeCategory: build.mutation({
      query: (id) => ({
        url: `/income-category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["income-category"],
    }),
  }),
});

export const {
  useCreateIncomeCategoryMutation,
  useGetAllIncomeCategoriesQuery,
  useGetSingleIncomeCategoryQuery,
  useUpdateIncomeCategoryMutation,
  useDeleteIncomeCategoryMutation,
} = incomeCategoryApi;
