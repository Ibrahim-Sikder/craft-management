import { baseApi } from "./baseApi";

export const promotionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getPromotionEligibleStudents: build.query({
      query: (classId) => ({
        url: "/enrollments/eligible-for-promotion",
        method: "GET",
        params: { classId },
      }),
      providesTags: ["enrollment"],
    }),
    bulkPromoteEnrollments: build.mutation({
      query: (promotionsData) => ({
        url: "/enrollments/bulk-promote",
        method: "POST",
        data: { promotions: promotionsData },
      }),
      invalidatesTags: ["enrollment", "student"],
    }),

    getPromotionHistory: build.query({
      query: (studentId) => ({
        url: `/enrollments/promotion-history/${studentId}`,
        method: "GET",
      }),
      providesTags: (result, error, id) => [{ type: "enrollment", id }],
    }),

    bulkRetainEnrollments: build.mutation({
      query: (data) => ({
        url: "/enrollments/bulk-retain",
        method: "POST",
        data: data,
      }),
      invalidatesTags: ["enrollment"],
    }),
  }),
});

export const {
  useGetPromotionEligibleStudentsQuery,
  useBulkPromoteEnrollmentsMutation,
  useGetPromotionHistoryQuery,
  useBulkRetainEnrollmentsMutation,
} = promotionApi;
