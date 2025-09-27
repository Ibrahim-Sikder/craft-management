import { baseApi } from "./baseApi";

export const qaidaDailyReportApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createQaidaReport: build.mutation({
      query: (data) => ({
        url: "/qaida-daily-report",
        method: "POST",
        data,
      }),
      invalidatesTags: ["qaida-daily-report"],
    }),
    getAllQaidaReports: build.query({
      query: ({ limit, page, searchTerm }) => ({
        url: "/qaida-daily-report",
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: ["qaida-daily-report"],
    }),
    getSingleQaidaReport: build.query({
      query: (id) => ({
        url: `/qaida-daily-report/${id}`,
        method: "GET",
      }),
      providesTags: ["qaida-daily-report"],
    }),
    updateQaidaReport: build.mutation({
      query: ({ id, data }) => ({
        url: `/qaida-daily-report/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["qaida-daily-report"],
    }),

    deleteQaidaReport: build.mutation({
      query: (id) => ({
        url: `/qaida-daily-report/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["qaida-daily-report"],
    }),
  }),
});

export const {
  useCreateQaidaReportMutation,
  useGetAllQaidaReportsQuery,
  useGetSingleQaidaReportQuery,
  useUpdateQaidaReportMutation,
  useDeleteQaidaReportMutation,
} = qaidaDailyReportApi;
