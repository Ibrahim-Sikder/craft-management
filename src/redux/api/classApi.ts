import { baseApi } from "./baseApi";

export const classApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createClass: build.mutation({
      query: (data) => ({
        url: "/class",
        method: "POST",
        data,
      }),
      invalidatesTags: ["class"],
    }),

    getAllClasses: build.query({
      query: ({ limit, page, searchTerm }) => ({
        url: "/class",
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: ["class"],
    }),

    getSingleClass: build.query({
      query: ({ id }) => ({
        url: `/class/${id}`,
        method: "GET",
      }),
      providesTags: ["class"],
    }),

    updateClass: build.mutation({
      query: ({ id, data }) => ({
        url: `/class/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["class"],
    }),

    deleteClass: build.mutation({
      query: (id) => ({
        url: `/class/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["class"],
    }),
  }),
});

export const {
  useCreateClassMutation,
  useGetAllClassesQuery,
  useGetSingleClassQuery,
  useUpdateClassMutation,
  useDeleteClassMutation,
} = classApi;
