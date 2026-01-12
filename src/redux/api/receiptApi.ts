import { baseApi } from "./baseApi";

/* eslint-disable @typescript-eslint/no-explicit-any */
const receiptApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    // সকল রিসিট (summary সহ)
    getStudentReceipts: build.query({
      query: (studentId: string) => ({
        url: `/receipts/student/${studentId}`,
        method: "GET",
      }),
      providesTags: ["Receipts"],
    }),

    // সম্পূর্ণ রিসিট ডিটেইলস সহ
    getCompleteReceipts: build.query({
      query: (studentId: string) => ({
        url: `/receipts/student/${studentId}/complete`,
        method: "GET",
      }),
      providesTags: ["Receipts"],
    }),

    // রিসিট নং দিয়ে রিসিট ডাটা
    getReceiptByNumber: build.query({
      query: (receiptNo: string) => ({
        url: `/receipts/${receiptNo}`,
        method: "GET",
      }),
      providesTags: ["Receipt"],
    }),

    // প্রিন্টের জন্য ফরম্যাটেড রিসিট
    getReceiptForPrint: build.query({
      query: (receiptNo: string) => ({
        url: `/receipts/${receiptNo}/print`,
        method: "GET",
      }),
    }),

    // ম্যানুয়াল রিসিট তৈরি
    createManualReceipt: build.mutation({
      query: (receiptData: any) => ({
        url: "/receipts",
        method: "POST",
        data: receiptData,
      }),
      invalidatesTags: ["Receipts", "Receipt"],
    }),

    // রিসিট স্ট্যাটাস আপডেট
    updateReceiptStatus: build.mutation({
      query: ({
        receiptNo,
        status,
      }: {
        receiptNo: string;
        status: string;
      }) => ({
        url: `/receipts/${receiptNo}/status`,
        method: "PATCH",
        data: { status },
      }),
      invalidatesTags: ["Receipts", "Receipt"],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetStudentReceiptsQuery,
  useGetCompleteReceiptsQuery,
  useGetReceiptByNumberQuery,
  useGetReceiptForPrintQuery,
  useCreateManualReceiptMutation,
  useUpdateReceiptStatusMutation,
} = receiptApi;
