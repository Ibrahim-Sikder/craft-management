import { baseApi } from "./baseApi";

export const expenseApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createExpense: build.mutation({
      query: (data) => ({
        url: "/expense",
        method: "POST",
        data,
      }),
      invalidatesTags: ["expense"],
    }),

    getAllExpenses: build.query({
      query: ({ limit, page, searchTerm }) => ({
        url: "/expense",
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: ["expense"],
    }),
    getTotalExpenseCategory: build.query({
      query: ({ limit, page, searchTerm }) => ({
        url: "/expense/total-expense-category",
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: ["expense"],
    }),

    getSingleExpense: build.query({
      query: (id) => ({
        url: `/expense/${id}`,
        method: "GET",
      }),
      providesTags: ["expense"],
    }),

    updateExpense: build.mutation({
      query: ({ id, data }) => ({
        url: `/expense/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["expense"],
    }),

    deleteExpense: build.mutation({
      query: (id) => ({
        url: `/expense/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["expense"],
    }),
  }),
});

export const {
  useCreateExpenseMutation,
  useGetAllExpensesQuery,
  useGetSingleExpenseQuery,
  useUpdateExpenseMutation,
  useDeleteExpenseMutation,
  useGetTotalExpenseCategoryQuery
} = expenseApi;
