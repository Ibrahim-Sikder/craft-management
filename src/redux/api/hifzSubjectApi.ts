import { baseApi } from "./baseApi";

export const hifzSubjectApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createHifzSubject: build.mutation({
      query: (data) => ({
        url: "/hifz-subject",
        method: "POST",
        data,
      }),
      invalidatesTags: ["hifz-subject"],
    }),

    getAllHifzSubjects: build.query({
      query: ({ limit, page, searchTerm }) => ({
        url: "/hifz-subject",
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: ["hifz-subject"],
    }),

    getSingleHifzSubject: build.query({
      query: ({ id }) => ({
        url: `/hifz-subject/${id}`,
        method: "GET",
      }),
      providesTags: ["hifz-subject"],
    }),

    updateHifzSubject: build.mutation({
      query: ({ id, body }) => ({
        url: `/hifz-subject/${id}`,
        method: "PATCH",
        data: body,
      }),
      invalidatesTags: ["hifz-subject"],
    }),

    deleteHifzSubject: build.mutation({
      query: (id) => ({
        url: `/hifz-subject/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["hifz-subject"],
    }),
  }),
});

export const {
  useCreateHifzSubjectMutation,
  useGetAllHifzSubjectsQuery,
  useGetSingleHifzSubjectQuery,
  useUpdateHifzSubjectMutation,
  useDeleteHifzSubjectMutation,
} = hifzSubjectApi;
