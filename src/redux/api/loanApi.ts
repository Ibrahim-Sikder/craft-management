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
      query: ({ limit, page, searchTerm, status, type }) => ({
        url: "/loan",
        method: "GET",
        params: { page, limit, searchTerm, status, type },
      }),
      providesTags: ["loan"],
    }),

    getSingleLoan: build.query({
      query: (id) => ({
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

    // New endpoints for loan management
    addRepayment: build.mutation({
      query: ({ id, data }) => ({
        url: `/loan/${id}/repayments`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["loan"],
    }),

    transferLoan: build.mutation({
      query: ({ id, data }) => ({
        url: `/loan/${id}/transfer`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["loan"],
    }),

    getLoanAmortization: build.query({
      query: (id) => ({
        url: `/loan/${id}/amortization`,
        method: "GET",
      }),
      providesTags: ["loan"],
    }),

    // Export loans
    exportLoans: build.mutation({
      query: (filters) => ({
        url: "/loan/export",
        method: "POST",
        data: filters,
        // responseHandler: (response) => response.blob(),
      }),
    }),
  }),
});

export const {
  useCreateLoanMutation,
  useGetAllLoansQuery,
  useGetSingleLoanQuery,
  useUpdateLoanMutation,
  useDeleteLoanMutation,
  useAddRepaymentMutation,
  useTransferLoanMutation,
  useGetLoanAmortizationQuery,
  useExportLoansMutation,
} = loanApi;