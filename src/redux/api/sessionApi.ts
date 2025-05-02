import { baseApi } from "./baseApi";

export const sessionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createSession: build.mutation({
      query: (data) => ({
        url: "/session",
        method: "POST",
        data,
      }),
      invalidatesTags: ["session"],
    }),

    getAllSessions: build.query({
      query: ({ limit, page, searchTerm }) => ({
        url: "/session",
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: ["session"],
    }),

    getSingleSession: build.query({
      query: ({ id }) => ({
        url: `/session/${id}`,
        method: "GET",
      }),
      providesTags: ["session"],
    }),

    updateSession: build.mutation({
      query: ({ id, data }) => ({
        url: `/session/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["session"],
    }),

    deleteSession: build.mutation({
      query: (id) => ({
        url: `/session/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["session"],
    }),
  }),
});

export const {
  useCreateSessionMutation,
  useGetAllSessionsQuery,
  useGetSingleSessionQuery,
  useUpdateSessionMutation,
  useDeleteSessionMutation,
} = sessionApi;
