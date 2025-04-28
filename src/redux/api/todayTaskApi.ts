import { baseApi } from "./baseApi";

export const todayTaskApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createTodayTask: build.mutation({
      query: (data) => ({
        url: "/today-task",
        method: "POST",
        data,
      }),
      invalidatesTags: ["todayTask"],
    }),
    getAllTodayTasks: build.query({
      query: ({ limit, page, searchTerm }) => ({
        url: "/today-task",
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: ["todayTask"],
    }),
    getSingleTodayTask: build.query({
      query: (id: string) => ({
        url: `/today-task/${id}`,
        method: "GET",
      }),
      providesTags: ["todayTask"],
    }),
    updateTodayTask: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/today-task/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["todayTask"],
    }),
    deleteTodayTask: build.mutation({
      query: (id: string) => ({
        url: `/today-task/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["todayTask"],
    }),
  }),
});

export const {
  useCreateTodayTaskMutation,
  useGetAllTodayTasksQuery,
  useGetSingleTodayTaskQuery,
  useUpdateTodayTaskMutation,
  useDeleteTodayTaskMutation,
} = todayTaskApi;
