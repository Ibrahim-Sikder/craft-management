import { baseApi } from "./baseApi";

export const incomeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createIncome: build.mutation({
      query: (data) => ({
        url: "/income",
        method: "POST",
        data,
      }),
      invalidatesTags: ["income"],
    }),

    getAllIncomes: build.query({
      query: ({ limit, page, searchTerm }) => ({
        url: "/income",
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: ["income"],
    }),

    getSingleIncome: build.query({
      query: (id) => ({
        url: `/income/${id}`,
        method: "GET",
      }),
      providesTags: ["income"],
    }),

    updateIncome: build.mutation({
      query: ({ id, data }) => ({
        url: `/income/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["income"],
    }),

    deleteIncome: build.mutation({
      query: (id) => ({
        url: `/income/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["income"],
    }),
  }),
});

export const {
  useCreateIncomeMutation,
  useGetAllIncomesQuery,
  useGetSingleIncomeQuery,
  useUpdateIncomeMutation,
  useDeleteIncomeMutation,
} = incomeApi;
