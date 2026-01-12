import { baseApi } from "./baseApi";

export const sunaniDailyReportApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create report
    createSunaniReport: build.mutation({
      query: (data) => ({
        url: "/sunani-daily-report",
        method: "POST",
        data,
      }),
      invalidatesTags: ["sunani-daily-report"],
    }),

    // Get all reports
    getAllSunaniReports: build.query({
      query: ({ limit, page, searchTerm }) => ({
        url: "/sunani-daily-report",
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: ["sunani-daily-report"],
    }),

    // Get single report
    getSingleSunaniReport: build.query({
      query: (id) => ({
        url: `/sunani-daily-report/${id}`,
        method: "GET",
      }),
      providesTags: ["sunani-daily-report"],
    }),

    // Update report
    updateSunaniReport: build.mutation({
      query: ({ id, data }) => ({
        url: `/sunani-daily-report/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["sunani-daily-report"],
    }),

    // Delete report
    deleteSunaniReport: build.mutation({
      query: (id) => ({
        url: `/sunani-daily-report/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["sunani-daily-report"],
    }),
  }),
});

export const {
  useCreateSunaniReportMutation,
  useGetAllSunaniReportsQuery,
  useGetSingleSunaniReportQuery,
  useUpdateSunaniReportMutation,
  useDeleteSunaniReportMutation,
} = sunaniDailyReportApi;
