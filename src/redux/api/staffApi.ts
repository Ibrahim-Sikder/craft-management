// staffApi.ts
import { baseApi } from "./baseApi";

export const staffApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createStaff: build.mutation({
      query: (data) => ({
        url: "/staff",
        method: "POST",
        data,
      }),
      invalidatesTags: ["staff"],
    }),

    getAllStaff: build.query({
      query: ({ limit, page, searchTerm }) => ({
        url: "/staff",
        method: "GET", 
        params: { page, limit, searchTerm },
      }),
      providesTags: ["staff"],
    }),

    getSingleStaff: build.query({
      query: ({ id }) => ({
        url: `/staff/${id}`,
        method: "GET",
      }),
      providesTags: ["staff"],
    }),

    updateStaff: build.mutation({
      query: ({ id, data }) => ({
        url: `/staff/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["staff"],
    }),

    deleteStaff: build.mutation({
      query: (id) => ({
        url: `/staff/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["staff"],
    }),
  }),
});

export const {
  useCreateStaffMutation,
  useGetAllStaffQuery,
  useGetSingleStaffQuery,
  useUpdateStaffMutation,
  useDeleteStaffMutation,
} = staffApi;
