import { baseApi } from "./baseApi";

export const hifzClassApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createHifzClass: build.mutation({
      query: (data) => ({
        url: "/hifz-class",
        method: "POST",
        data,
      }),
      invalidatesTags: ["hifz-class"],
    }),

    getAllHifzClasses: build.query({
      query: ({ limit, page, searchTerm }) => ({
        url: "/hifz-class",
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: ["hifz-class"],
    }),

    getSingleHifzClass: build.query({
      query: ({ id }) => ({
        url: `/hifz-class/${id}`,
        method: "GET",
      }),
      providesTags: ["hifz-class"],
    }),

    updateHifzClass: build.mutation({
      query: ({ id, data }) => ({
        url: `/hifz-class/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["hifz-class"],
    }),

    deleteHifzClass: build.mutation({
      query: (id) => ({
        url: `/hifz-class/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["hifz-class"],
    }),
  }),
});

export const {
  useCreateHifzClassMutation,
  useGetAllHifzClassesQuery,
  useGetSingleHifzClassQuery,
  useUpdateHifzClassMutation,
  useDeleteHifzClassMutation,
} = hifzClassApi;
