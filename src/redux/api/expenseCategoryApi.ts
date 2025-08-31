import { baseApi } from "./baseApi";

export const expenseCategoryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createExpenseCategory: build.mutation({
      query: (data) => ({
        url: "/expense-category",
        method: "POST",
        data,
      }),
      invalidatesTags: ["expense-category"],
    }),

    getAllExpenseCategories: build.query({
      query: ({ limit, page, searchTerm }) => ({
        url: "/expense-category",
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: ["expense-category"],
    }),

    getSingleExpenseCategory: build.query({
      query: ({ id }) => ({
        url: `/expense-category/${id}`,
        method: "GET",
      }),
      providesTags: ["expense-category"],
    }),

    updateExpenseCategory: build.mutation({
      query: ({ id, data }) => ({
        url: `/expense-category/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["expense-category"],
    }),

    deleteExpenseCategory: build.mutation({
      query: (id) => ({
        url: `/expense-category/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["expense-category"],
    }),
  }),
});

export const {
  useCreateExpenseCategoryMutation,
  useGetAllExpenseCategoriesQuery,
  useGetSingleExpenseCategoryQuery,
  useUpdateExpenseCategoryMutation,
  useDeleteExpenseCategoryMutation,
} = expenseCategoryApi;
