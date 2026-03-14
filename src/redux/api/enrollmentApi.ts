import { baseApi } from "./baseApi";

export const enrollmentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createEnrollment: build.mutation({
      query: ({ data, applicationId }) => {
        // Create URL with query params if applicationId exists
        let url = "/enrollments";
        if (applicationId) {
          url += `?applicationId=${applicationId}`;
        }

        return {
          url: url,
          method: "POST",
          data,
        };
      },
      invalidatesTags: ["enrollment", "admissionApplication"],
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
