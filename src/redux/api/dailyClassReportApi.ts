import { baseApi } from "./baseApi";

export const dailyClassReportApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create a daily class report
    createDailyClassReport: build.mutation({
      query: (data) => ({
        url: "/daily-class-report",
        method: "POST",
        data,
      }),
      invalidatesTags: ["daily-class-report"],
    }),

    // Get all daily class reports
    getAllDailyClassReports: build.query({
      query: ({ limit, page, searchTerm }) => ({
        url: "/daily-class-report",
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: ["daily-class-report"],
    }),

    // Get single daily class report by ID
    getSingleDailyClassReport: build.query({
      query: ({ id }) => ({
        url: `/daily-class-report/${id}`,
        method: "GET",
      }),
      providesTags: ["daily-class-report"],
    }),

    // Update a daily class report
    updateDailyClassReport: build.mutation({
      query: ({ id, data }) => ({
        url: `/daily-class-report/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["daily-class-report"],
    }),

    // Delete a daily class report
    deleteDailyClassReport: build.mutation({
      query: (id) => ({
        url: `/daily-class-report/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["daily-class-report"],
    }),
  }),
});

export const {
  useCreateDailyClassReportMutation,
  useGetAllDailyClassReportsQuery,
  useGetSingleDailyClassReportQuery,
  useUpdateDailyClassReportMutation,
  useDeleteDailyClassReportMutation,
} = dailyClassReportApi;
