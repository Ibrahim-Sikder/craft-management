import { baseApi } from "./baseApi";

export const weeklyReportApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createWeeklyReport: build.mutation({
            query: (data) => ({
                url: "/weekly-report",
                method: "POST",
                data,
            }),
            invalidatesTags: ["weeklyReport"],
        }),
        getAllWeeklyReports: build.query({
            query: ({ limit, page, searchTerm, reportType }) => ({
                url: "/weekly-report",
                method: "GET",
                params: { page, limit, searchTerm, reportType },
            }),
            providesTags: ["weeklyReport"],
        }),
        getSingleWeeklyReport: build.query({
            query: (id) => ({
                url: `/weekly-report/${id}`,
                method: "GET",
            }),
            providesTags: ["weeklyReport"],
        }),
        updateWeeklyReport: build.mutation({
            query: ({ id, data }) => ({
                url: `/weekly-report/${id}`,
                method: "PATCH",
                data,
            }),
            invalidatesTags: ["weeklyReport"],
        }),
        deleteWeeklyReport: build.mutation({
            query: (id) => ({
                url: `/weekly-report/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["weeklyReport"],
        }),
    }),
});

export const {
    useCreateWeeklyReportMutation,
    useGetAllWeeklyReportsQuery,
    useGetSingleWeeklyReportQuery,
    useUpdateWeeklyReportMutation,
    useDeleteWeeklyReportMutation,
} = weeklyReportApi;
