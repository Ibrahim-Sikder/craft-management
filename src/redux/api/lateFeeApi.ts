import { baseApi } from "./baseApi";

export const lateFeeApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getLateFeeConfig: build.query({
      query: () => ({
        url: "/late-fee/config",
        method: "GET",
      }),
      providesTags: ["lateFeeConfig"],
    }),
    updateLateFeeConfig: build.mutation({
      query: (data) => ({
        url: "/late-fee/config",
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["lateFeeConfig"],
    }),
    calculateDailyLateFees: build.mutation({
      query: () => ({
        url: "/late-fee/calculate-daily",
        method: "POST",
      }),
      invalidatesTags: ["fees", "lateFees"],
    }),
    customizeLateFee: build.mutation({
      query: ({ feeId, ...data }) => ({
        url: `/late-fee/customize/${feeId}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["fees", "lateFees"],
    }),
    bulkCustomizeStudentLateFees: build.mutation({
      query: ({ studentId, ...data }) => ({
        url: `/late-fee/bulk-customize/student/${studentId}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["fees", "lateFees", "students"],
    }),
    getCustomizationHistory: build.query({
      query: (feeId) => ({
        url: `/late-fee/history/${feeId}`,
        method: "GET",
      }),
      providesTags: ["lateFees"],
    }),
    getFeeDueSummary: build.query({
      query: (feeId) => ({
        url: `/late-fee/fee-summary/${feeId}`,
        method: "GET",
      }),
      providesTags: ["lateFees"],
    }),
    getStudentLateFees: build.query({
      query: (studentId) => ({
        url: `/late-fee/student/${studentId}/late-fees`,
        method: "GET",
      }),
      providesTags: ["lateFees", "students"],
    }),
  }),
});

export const {
  useGetLateFeeConfigQuery,
  useUpdateLateFeeConfigMutation,
  useCalculateDailyLateFeesMutation,
  useCustomizeLateFeeMutation,
  useBulkCustomizeStudentLateFeesMutation,
  useGetCustomizationHistoryQuery,
  useGetFeeDueSummaryQuery,
  useGetStudentLateFeesQuery,
} = lateFeeApi;
