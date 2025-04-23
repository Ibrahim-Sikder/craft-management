import { baseApi } from "./baseApi";

export const mealReportApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Meal Report তৈরি করা
    createMealReport: build.mutation({
      query: (data) => ({
        url: "/meal-report",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["meal-report"],
    }),

    // সব Meal Report ফেচ করা
    getAllMealReports: build.query({
      query: ({ limit, page }) => ({
        url: "/meal-report",
        method: "GET",
        params: { limit, page },
      }),
      providesTags: ["meal-report"],
    }),

    // একক Meal Report দেখানো
    getSingleMealReport: build.query({
      query: (id) => ({
        url: `/meal-report/${id}`,
        method: "GET",
      }),
      providesTags: ["meal-report"],
    }),
  }),
});

export const {
  useCreateMealReportMutation,
  useGetAllMealReportsQuery,
  useGetSingleMealReportQuery,
} = mealReportApi;
