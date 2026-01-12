import { baseApi } from "./baseApi";

export const enrollmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createEnrollment: build.mutation({
      query: (data) => ({
        url: "/enrollments",
        method: "POST",
        data,
      }),
      invalidatesTags: ["enrollment"],
    }),

    getAllEnrollments: build.query({
      query: ({ limit, page, searchTerm }) => ({
        url: "/enrollments",
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: ["enrollment"],
    }),

    getSingleEnrollment: build.query({
      query: ({ id }) => ({
        url: `/enrollments/${id}`,
        method: "GET",
      }),
      providesTags: ["enrollment"],
    }),

    updateEnrollment: build.mutation({
      query: ({ id, data }) => ({
        url: `/enrollments/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["enrollment"],
    }),

    deleteEnrollment: build.mutation({
      query: (id) => ({
        url: `/enrollments/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["enrollment"],
    }),
  }),
});

export const {
  useCreateEnrollmentMutation,
  useGetAllEnrollmentsQuery,
  useGetSingleEnrollmentQuery,
  useUpdateEnrollmentMutation,
  useDeleteEnrollmentMutation,
} = enrollmentApi;
