import { baseApi } from "./baseApi";

export const admissionApplicationApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createAdmissionApplication: build.mutation({
      query: (data) => ({
        url: "/admission-application/",
        method: "POST",
        data,
      }),
      invalidatesTags: ["admission-applications"],
    }),

    getAllAdmissionApplications: build.query({
      query: ({ limit, page, searchTerm, status }) => ({
        url: "/admission-application",
        method: "GET",
        params: { page, limit, searchTerm, status },
      }),
      providesTags: ["admission-applications"],
    }),

    getSingleAdmissionApplication: build.query({
      query: ({ id }) => ({
        url: `/admission-application/${id}`,
        method: "GET",
      }),
      providesTags: ["admission-applications"],
    }),
    getApplicationByApplicationId: build.query({
      query: ({ applicationId }) => ({
        url: `/admission-application`,
        method: "GET",
        params: { applicationId },
      }),
      providesTags: ["admission-applications"],
    }),
    updateAdmissionApplication: build.mutation({
      query: ({ id, data }) => ({
        url: `/admission-application/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: ["admission-applications"],
    }),

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
  useGetApplicationByApplicationIdQuery,
} = admissionApplicationApi;
