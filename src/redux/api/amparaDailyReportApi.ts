import { baseApi } from "./baseApi";

export const amparaDailyReportApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAmparaReport: build.mutation({
      query: (data) => ({
        url: "/ampara-daily-report",
        method: "POST",
        data,
      }),
      invalidatesTags: ["ampara-daily-report"],
    }),

    getAllAmparaReports: build.query({
      query: ({ limit, page, searchTerm }) => ({
        url: "/ampara-daily-report",
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: ["ampara-daily-report"],
    }),

    getSingleAmparaReport: build.query({
      query: (id) => ({
        url: `/ampara-daily-report/${id}`,
        method: "GET",
      }),
      providesTags: ["ampara-daily-report"],
    }),

    updateAmparaReport: build.mutation({
      query: ({ id, data }) => ({
        url: `/ampara-daily-report/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["ampara-daily-report"],
    }),

    deleteAmparaReport: build.mutation({
      query: (id) => ({
        url: `/ampara-daily-report/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["ampara-daily-report"],
    }),
  }),
});

export const {
  useCreateAmparaReportMutation,
  useGetAllAmparaReportsQuery,
  useGetSingleAmparaReportQuery,
  useUpdateAmparaReportMutation,
  useDeleteAmparaReportMutation,
} = amparaDailyReportApi;
