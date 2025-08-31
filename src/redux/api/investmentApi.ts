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
      query: ({ limit, page, searchTerm }) => ({
        url: "/investment",
        method: "GET",
        params: { page, limit, searchTerm },
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
  }),
});

export const {
  useCreateInvestmentMutation,
  useGetAllInvestmentsQuery,
  useGetSingleInvestmentQuery,
  useUpdateInvestmentMutation,
  useDeleteInvestmentMutation,
} = investmentApi;
