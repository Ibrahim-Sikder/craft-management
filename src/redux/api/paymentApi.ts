import { baseApi } from "./baseApi";

const paymentApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createBulkPayment: build.mutation({
      query: (data) => ({
        url: "/payments/bulk",
        method: "POST",
        data,
      }),
      invalidatesTags: ["Payment", "Student", "fees"],
    }),
    generateReceipt: build.query({
      query: (paymentId) => ({
        url: `/payments/receipt/${paymentId}`,
        method: "GET",
      }),
    }),
    getPayment: build.query({
      query: (id) => ({
        url: `/payments/${id}`,
        method: "GET",
      }),
    }),
  }),
  overrideExisting: false,
});

export const {
  useCreateBulkPaymentMutation,
  useGenerateReceiptQuery,
  useGetPaymentQuery,
} = paymentApi;
