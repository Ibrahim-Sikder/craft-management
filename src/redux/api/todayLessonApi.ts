import { baseApi } from "./baseApi";

export const todayLessonApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createTodayLesson: build.mutation({
      query: (data) => ({
        url: "/today-lesson",
        method: "POST",
         data,
      }),
      invalidatesTags: ["todayLesson"],
    }),
    getAllTodayLessons: build.query({
      query: ({ limit, page, searchTerm }) => ({
        url: "/today-lesson",
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: ["todayLesson"],
    }),
    getSingleTodayLesson: build.query({
      query: (id: string) => ({
        url: `/today-lesson/${id}`,
        method: "GET",
      }),
      providesTags: ["todayLesson"],
    }),
    updateTodayLesson: build.mutation({
      query: ({ id, data }) => ({
        url: `/today-lesson/${id}`,
        method: "PATCH",
         data,
      }),
      invalidatesTags: ["todayLesson"],
    }),
    deleteTodayLesson: build.mutation({
      query: (id: string) => ({
        url: `/today-lesson/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["todayLesson"],
    }),
  }),
});

export const {
  useCreateTodayLessonMutation,
  useGetAllTodayLessonsQuery,
  useGetSingleTodayLessonQuery,
  useUpdateTodayLessonMutation,
  useDeleteTodayLessonMutation,
} = todayLessonApi;
