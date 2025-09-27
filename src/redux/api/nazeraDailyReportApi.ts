import { baseApi } from "./baseApi";

export const nazeraDailyReportApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Create report
    createNazeraReport: build.mutation({
      query: (data) => ({
        url: "/nazera-daily-report",
        method: "POST",
        data,
      }),
      invalidatesTags: ["nazera-daily-report"],
    }),

    // Get all reports
    getAllNazeraReports: build.query({
      query: ({ limit, page, searchTerm }) => ({
        url: "/nazera-daily-report",
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: ["nazera-daily-report"],
    }),

    // Get single report
    getSingleNazeraReport: build.query({
      query: (id) => ({
        url: `/nazera-daily-report/${id}`,
        method: "GET",
      }),
      providesTags: ["nazera-daily-report"],
    }),

    // Update report
    updateNazeraReport: build.mutation({
      query: ({ id, data }) => ({
        url: `/nazera-daily-report/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["nazera-daily-report"],
    }),

    // Delete report
    deleteNazeraReport: build.mutation({
      query: (id) => ({
        url: `/nazera-daily-report/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["nazera-daily-report"],
    }),
  }),
});

export const {
  useCreateNazeraReportMutation,
  useGetAllNazeraReportsQuery,
  useGetSingleNazeraReportQuery,
  useUpdateNazeraReportMutation,
  useDeleteNazeraReportMutation,
} = nazeraDailyReportApi;
