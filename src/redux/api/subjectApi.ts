import { baseApi } from "./baseApi";

export const subjectApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSubject: build.mutation({
      query: (data) => ({
        url: "/subject",
        method: "POST",
        data,
      }),
      invalidatesTags: ["subject"],
    }),

    getAllSubjects: build.query({
      query: ({ limit, page, searchTerm }) => ({
        url: "/subject",
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: ["subject"],
    }),

    getSingleSubject: build.query({
      query: ({ id }) => ({
        url: `/subject/${id}`,
        method: "GET",
      }),
      providesTags: ["subject"],
    }),

// In your API file
updateSubject: build.mutation({
  query: ({ id, body }) => ({
    url: `/subject/${id}`,
    method: "PATCH",
    data: body,
  }),
  invalidatesTags: ["subject"],
}),
    deleteSubject: build.mutation({
      query: (id) => ({
        url: `/subject/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["subject"],
    }),
  }),
});

export const {
  useCreateSubjectMutation,
  useGetAllSubjectsQuery,
  useGetSingleSubjectQuery,
  useUpdateSubjectMutation,
  useDeleteSubjectMutation,
} = subjectApi;
