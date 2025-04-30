import { baseApi } from "./baseApi";

export const sectionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSection: build.mutation({
      query: (data) => ({
        url: "/section",
        method: "POST",
        data,
      }),
      invalidatesTags: ["section"],
    }),

    getAllSections: build.query({
      query: ({ limit, page, searchTerm }) => ({
        url: "/section",
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: ["section"],
    }),

    getSingleSection: build.query({
      query: ({ id }) => ({
        url: `/section/${id}`,
        method: "GET",
      }),
      providesTags: ["section"],
    }),

    updateSection: build.mutation({
      query: ({ id, data }) => ({
        url: `/section/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["section"],
    }),

    deleteSection: build.mutation({
      query: (id) => ({
        url: `/section/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["section"],
    }),
  }),
});

export const {
  useCreateSectionMutation,
  useGetAllSectionsQuery,
  useGetSingleSectionQuery,
  useUpdateSectionMutation,
  useDeleteSectionMutation,
} = sectionApi;
