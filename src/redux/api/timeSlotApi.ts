import { baseApi } from "./baseApi";

export const timeSlotApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createTimeSlot: build.mutation({
      query: (data) => ({
        url: "/timeslot",
        method: "POST",
        data,
      }),
      invalidatesTags: ["time-slot"],
    }),

    getAllTimeSlots: build.query({
      query: ({ limit, page, searchTerm }) => ({
        url: "/timeslot",
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: ["time-slot"],
    }),

    getSingleTimeSlot: build.query({
      query: ({ id }) => ({
        url: `/timeslot/${id}`,
        method: "GET",
      }),
      providesTags: ["time-slot"],
    }),

    updateTimeSlot: build.mutation({
      query: ({ id, data }) => ({
        url: `/timeslot/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["time-slot"],
    }),

    deleteTimeSlot: build.mutation({
      query: (id) => ({
        url: `/timeslot/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["time-slot"],
    }),
  }),
});

export const {
  useCreateTimeSlotMutation,
  useGetAllTimeSlotsQuery,
  useGetSingleTimeSlotQuery,
  useUpdateTimeSlotMutation,
  useDeleteTimeSlotMutation,
} = timeSlotApi;
