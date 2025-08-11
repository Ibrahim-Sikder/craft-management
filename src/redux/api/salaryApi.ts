import { baseApi } from "./baseApi";

export const salaryApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
  createSalary: build.mutation({
  query: (data) => ({
    url: "/salary",
    method: "POST",
    body: data,
  }),
  invalidatesTags: ["salary"],
}),


    getAllSalaries: build.query({
      query: ({ limit, page, searchTerm }) => ({
        url: "/salary",
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: ["salary"],
    }),

    getSingleSalary: build.query({
      query: ({ id }) => ({
        url: `/salary/${id}`,
        method: "GET",
      }),
      providesTags: ["salary"],
    }),

    updateSalary: build.mutation({
      query: ({ id, data }) => ({
        url: `/salary/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["salary"],
    }),

    deleteSalary: build.mutation({
      query: (id) => ({
        url: `/salary/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["salary"],
    }),
  }),
});

export const {
  useCreateSalaryMutation,
  useGetAllSalariesQuery,
  useGetSingleSalaryQuery,
  useUpdateSalaryMutation,
  useDeleteSalaryMutation,
} = salaryApi;
