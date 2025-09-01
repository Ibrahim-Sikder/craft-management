import { baseApi } from "./baseApi";

export const investmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createInvestment: build.mutation({
      query: (data) => ({
        url: "/investment",
        method: "POST",
        data,
      }),
      invalidatesTags: ["investment"],
    }),

    getAllInvestments: build.query({
      query: ({ limit, page, searchTerm, status, category }) => ({
        url: "/investment",
        method: "GET",
        params: { page, limit, searchTerm, status, category },
      }),
      providesTags: ["investment"],
    }),

    getSingleInvestment: build.query({
      query: (id) => ({
        url: `/investment/${id}`,
        method: "GET",
      }),
      providesTags: ["investment"],
    }),

    updateInvestment: build.mutation({
      query: ({ id, data }) => ({
        url: `/investment/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["investment"],
    }),

    deleteInvestment: build.mutation({
      query: (id) => ({
        url: `/investment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["investment"],
    }),

    // New endpoints for investment returns
    addInvestmentReturn: build.mutation({
      query: ({ id, data }) => ({
        url: `/investment/${id}/returns`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["investment"],
    }),

    closeInvestment: build.mutation({
      query: ({ id, data }) => ({
        url: `/investment/${id}/close`,
        method: "POST",
        data,
      }),
      invalidatesTags: ["investment"],
    }),

    getInvestmentPerformance: build.query({
      query: (id) => ({
        url: `/investment/${id}/performance`,
        method: "GET",
      }),
      providesTags: ["investment"],
    }),

    // Export investments
    exportInvestments: build.mutation({
      query: (filters) => ({
        url: "/investment/export",
        method: "POST",
        data: filters,
        // responseHandler: (response) => response.blob(),
      }),
    }),
  }),
});

export const {
  useCreateInvestmentMutation,
  useGetAllInvestmentsQuery,
  useGetSingleInvestmentQuery,
  useUpdateInvestmentMutation,
  useDeleteInvestmentMutation,
  useAddInvestmentReturnMutation,
  useCloseInvestmentMutation,
  useGetInvestmentPerformanceQuery,
  useExportInvestmentsMutation,
} = investmentApi;