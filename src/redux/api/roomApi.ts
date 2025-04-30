import { baseApi } from "./baseApi";

export const roomApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createRoom: build.mutation({
      query: (data) => ({
        url: "/room",
        method: "POST",
        data,
      }),
      invalidatesTags: ["room"],
    }),

    getAllRooms: build.query({
      query: ({ limit, page, searchTerm }) => ({
        url: "/room",
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: ["room"],
    }),

    getSingleRoom: build.query({
      query: ({ id }) => ({
        url: `/room/${id}`,
        method: "GET",
      }),
      providesTags: ["room"],
    }),

    updateRoom: build.mutation({
      query: ({ id, data }) => ({
        url: `/room/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["room"],
    }),

    deleteRoom: build.mutation({
      query: (id) => ({
        url: `/room/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["room"],
    }),
  }),
});

export const {
  useCreateRoomMutation,
  useGetAllRoomsQuery,
  useGetSingleRoomQuery,
  useUpdateRoomMutation,
  useDeleteRoomMutation,
} = roomApi;
