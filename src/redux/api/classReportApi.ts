import { baseApi } from "./baseApi";

export const classReportApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createClassReport: build.mutation({
      query: (data) => ({
        url: "/class-report",
        method: "POST",
        data,
      }),
      invalidatesTags: ["class-report"],
    }),

   getAllClassReports: build.query({
      query: ({
        limit = 5,
        page = 1,
        searchTerm,
        className,
        subject,
        teacher,
        date,
        hour,
        lessonEvaluation,
        handwriting,
        startDate,
        endDate,
      }) => ({
        url: "/class-report",
        method: "GET",
        params: {
          page,
          limit,
          searchTerm,
          className,
          subject,
          teacher,
          date,
          hour,
          lessonEvaluation,
          handwriting,
          startDate,
          endDate,
        },
      }),
      providesTags: ["class-report"],
    }),
    getSingleClassReport: build.query({
      query: ({ id }) => ({
        url: `/class-report/${id}`,
        method: "GET",
      }),
      providesTags: ["class-report"],
    }),

    updateClassReport: build.mutation({
      query: ({ id, data }) => ({
        url: `/class-report/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["class-report"],
    }),

    deleteClassReport: build.mutation({
      query: (id) => ({
        url: `/class-report/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["class-report"],
    }),
  }),
});

export const {
  useCreateClassReportMutation,
  useGetAllClassReportsQuery,
  useGetSingleClassReportQuery,
  useUpdateClassReportMutation,
  useDeleteClassReportMutation,
} = classReportApi;
