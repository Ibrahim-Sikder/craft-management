/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "./baseApi";


export enum MealType {
  BREAKFAST = "BREAKFAST",
  LUNCH = "LUNCH",
  DINNER = "DINNER",
}

export interface CreateMealReportRequest {
  date: string
  mealType: MealType
  students: string[]
  teachers: string[]
}

export interface MealReportResponse {
  success: boolean
  statusCode: number
  message: string
  data: any
}

export const mealReportApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createMealReport: build.mutation<MealReportResponse, CreateMealReportRequest>({
      query: (data) => ({
        url: "/meal-report", 
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["meal-report"],
    }),

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
    updateMealReport: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/meal-report/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["meal-report"],
    }),

    deleteMealReport: build.mutation({
      query: (id) => ({
        url: `/meal-report/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["meal-report"],
    }),
  }),
});

export const {
  useCreateMealReportMutation,
  useGetAllMealReportsQuery,
  useGetSingleMealReportQuery,
  useUpdateMealReportMutation,
  useDeleteMealReportMutation,
} = mealReportApi;
