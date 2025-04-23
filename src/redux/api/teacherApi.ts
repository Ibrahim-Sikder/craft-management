import { baseApi } from "./baseApi";

export const teacherApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createTeacher: build.mutation({
      query: (data) => ({
        url: "/teacher",
        method: "POST",
        data,
      }),
      invalidatesTags: ["teacher"],
    }),

    getAllTeachers: build.query({
      query: ({ limit, page, searchTerm }) => ({
        url: "/teacher",
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: ["teacher"],
    }),

    getSingleTeacher: build.query({
      query: ({ id }) => ({
        url: `/teacher/${id}`,
        method: "GET",
      }),
      providesTags: ["teacher"],
    }),

    updateTeacher: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/teacher/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["teacher"],
    }),

    deleteTeacher: build.mutation({
      query: (id) => ({
        url: `/teacher/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["teacher"],
    }),
  }),
});

export const {
  useCreateTeacherMutation,
  useGetAllTeachersQuery,
  useGetSingleTeacherQuery,
  useUpdateTeacherMutation,
  useDeleteTeacherMutation,
} = teacherApi;
