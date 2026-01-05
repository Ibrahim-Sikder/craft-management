import { baseApi } from "./baseApi";

const promotionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Promote single student
    promoteEnrollment: build.mutation({
      query: (data) => ({
        url: "/enrollments/promote",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Enrollment", "Student", "Promotion"],
    }),

    // Bulk promote students
    bulkPromoteEnrollments: build.mutation({
      query: (data) => ({
        url: "/enrollments/bulk-promote",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Enrollment", "Student", "Promotion"],
    }),

    // Get promotion history
    getPromotionHistory: build.query({
      query: (studentId) => ({
        url: `/enrollments/promotion/history/${studentId}`,
        method: "GET",
      }),
      providesTags: ["Promotion"],
    }),

    // Get eligible students for promotion
    getPromotionEligibleStudents: build.query({
      query: (session) => ({
        url: "/enrollments/promotion/eligible",
        method: "GET",
        params: { session },
      }),
      providesTags: ["Promotion"],
    }),

    // Get promotion summary
    getPromotionSummary: build.query({
      query: () => ({
        url: "/enrollments/promotion/summary",
        method: "GET",
      }),
      providesTags: ["Promotion"],
    }),

    // Get all promotions (enrollments with admissionType: 'promotion')
    getAllPromotions: build.query({
      query: (params) => ({
        url: "/enrollments",
        method: "GET",
        params: { ...params, admissionType: "promotion" },
      }),
      providesTags: ["Promotion"],
    }),
  }),
  overrideExisting: false,
});

export const {
  usePromoteEnrollmentMutation,
  useBulkPromoteEnrollmentsMutation,
  useGetPromotionHistoryQuery,
  useGetPromotionEligibleStudentsQuery,
  useGetPromotionSummaryQuery,
  useGetAllPromotionsQuery,
} = promotionApi;
