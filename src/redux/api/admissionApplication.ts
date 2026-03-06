import { baseApi } from "./baseApi";

export const admissionApplicationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // Public: Submit Application
    createAdmissionApplication: build.mutation({
      query: (data) => ({
        url: "/admission-application/",
        method: "POST",
        data,
      }),
      invalidatesTags: ["admission-applications"],
    }),

    // Admin: Get All Applications
    getAllAdmissionApplications: build.query({
      query: ({ limit, page, searchTerm, status }) => ({
        url: "/admission-application",
        method: "GET",
        params: { page, limit, searchTerm, status },
      }),
      providesTags: ["admission-applications"],
    }),

    // Admin: Get Single Application
    getSingleAdmissionApplication: build.query({
      query: ({ id }) => ({
        url: `/admission-application/${id}`,
        method: "GET",
      }),
      providesTags: ["admission-applications"],
    }),

    // Admin: Update (mainly status approve/reject)
    updateAdmissionApplication: build.mutation({
      query: ({ id, data }) => ({
        url: `/admission-application/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["admission-applications"],
    }),

    // Super Admin: Delete
    deleteAdmissionApplication: build.mutation({
      query: (id) => ({
        url: `/admission-application/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["admission-applications"],
    }),
  }),
});

export const {
  useCreateAdmissionApplicationMutation,
  useGetAllAdmissionApplicationsQuery,
  useGetSingleAdmissionApplicationQuery,
  useUpdateAdmissionApplicationMutation,
  useDeleteAdmissionApplicationMutation,
} = admissionApplicationApi;
