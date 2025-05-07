import { baseApi } from "./baseApi";

export const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation({
      query: (data) => ({
        url: "/user",
        method: "POST",
       data,
      }),
      invalidatesTags: ["user"],
    }),

    getAllUsers: build.query({
      query: ({ limit, page, searchTerm }) => ({
        url: "/user",
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: ["user"],
    }),

    getSingleUser: build.query({
      query: ({ id }) => ({
        url: `/user/${id}`,
        method: "GET",
      }),
      providesTags: ["user"],
    }),

    updateUser: build.mutation({
      query: ({ id, data }) => ({
        url: `/user/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["user"],
    }),

    deleteUser: build.mutation({
      query: (id) => ({
        url: `/user/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useGetAllUsersQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
