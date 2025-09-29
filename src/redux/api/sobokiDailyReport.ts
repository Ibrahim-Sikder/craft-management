import { baseApi } from "./baseApi";

export const sobokiDailyReportApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSobokiReport: build.mutation({
      query: (data) => ({
        url: "/soboki-daily-report",
        method: "POST",
        data,
      }),
      invalidatesTags: ["soboki-daily-report"],
    }),

    getAllSobokiReports: build.query({
      query: ({ limit, page, searchTerm }) => ({
        url: "/soboki-daily-report",
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: ["soboki-daily-report"],
    }),

    getSingleSobokiReport: build.query({
      query: (id) => ({
        url: `/soboki-daily-report/${id}`,
        method: "GET",
      }),
      providesTags: ["soboki-daily-report"],
    }),

    updateSobokiReport: build.mutation({
      query: ({ id, data }) => ({
        url: `/soboki-daily-report/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["soboki-daily-report"],
    }),

    deleteSobokiReport: build.mutation({
      query: (id) => ({
        url: `/soboki-daily-report/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["soboki-daily-report"],
    }),
  }),
});

export const {
  useCreateSobokiReportMutation,
  useGetAllSobokiReportsQuery,
  useGetSingleSobokiReportQuery,
  useUpdateSobokiReportMutation,
  useDeleteSobokiReportMutation,
} = sobokiDailyReportApi;
