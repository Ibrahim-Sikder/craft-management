import { baseApi } from "./baseApi";

export const loanApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createLoan: build.mutation({
      query: (data) => ({
        url: "/loan",
        method: "POST",
        data,
      }),
      invalidatesTags: ["loan"],
    }),

    getAllLoans: build.query({
      query: ({ limit, page, searchTerm }) => ({
        url: "/loan",
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: ["loan"],
    }),

    getSingleLoan: build.query({
      query: ( id ) => ({
        url: `/loan/${id}`,
        method: "GET",
      }),
      providesTags: ["loan"],
    }),

    updateLoan: build.mutation({
      query: ({ id, data }) => ({
        url: `/loan/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["loan"],
    }),

    deleteLoan: build.mutation({
      query: (id) => ({
        url: `/loan/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["loan"],
    }),
  }),
});

export const {
  useCreateLoanMutation,
  useGetAllLoansQuery,
  useGetSingleLoanQuery,
  useUpdateLoanMutation,
  useDeleteLoanMutation,
} = loanApi;
