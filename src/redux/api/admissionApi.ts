import { baseApi } from "./baseApi";

export const admissionApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAdmission: build.mutation({
      query: (data) => ({
        url: "/admission",
        method: "POST",
       data,
      }),
      invalidatesTags: ["admission"],
    }),

    getAllAdmissions: build.query({
      query: ({ limit, page, searchTerm }) => ({
        url: "/admission",
        method: "GET",
        params: { page, limit, searchTerm },
      }),
      providesTags: ["admission"],
    }),

    getSingleAdmission: build.query({
      query: ({ id }) => ({
        url: `/admission/${id}`,
        method: "GET",
      }),
      providesTags: ["admission"],
    }),

    updateAdmission: build.mutation({
      query: ({ id, data }) => ({
        url: `/admission/${id}`,
        method: "PATCH",
      data,
      }),
      invalidatesTags: ["admission"],
    }),

    deleteAdmission: build.mutation({
      query: (id) => ({
        url: `/admission/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["admission"],
    }),
  }),
});

export const {
  useCreateAdmissionMutation,
  useGetAllAdmissionsQuery,
  useGetSingleAdmissionQuery,
  useUpdateAdmissionMutation,
  useDeleteAdmissionMutation,
} = admissionApi;
