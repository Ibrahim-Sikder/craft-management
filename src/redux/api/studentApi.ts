import { baseApi } from "./baseApi";

export const studentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createStudents: build.mutation({
      query: (data) => ({
        url: "/student",
        method: "POST",
        data,
      }),
      invalidatesTags: ["student"],
    }),
    getAllStudents: build.query({
      query: ({ limit, page, searchTerm, className, studentDepartment }) => ({
        url: "/student",
        method: "GET",
        params: { page, limit, searchTerm, className, studentDepartment },
      }),
      providesTags: ["student"],
    }),

    getSingleStudent: build.query({
      query: ({ id }) => ({
        url: `/student/${id}`,
        method: "GET",
      }),
      providesTags: ["student"],
    }),

    updateStudent: build.mutation({
      query: ({ id, data }) => ({
        url: `/student/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["student"],
    }),

    deleteStudent: build.mutation({
      query: (id) => ({
        url: `/student/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["student"],
    }),
  }),
});

export const {
  useCreateStudentsMutation,
  useGetAllStudentsQuery,
  useGetSingleStudentQuery,
  useUpdateStudentMutation,
  useDeleteStudentMutation,
} = studentApi;
