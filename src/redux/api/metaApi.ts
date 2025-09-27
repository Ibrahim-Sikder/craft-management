// metaApi.ts
import { baseApi } from "./baseApi";

export const metaApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getAllMeta: build.query({
      query: () => ({
        url: "/meta",
        method: "GET",
      }),
    }),

    getFinancialDashboard: build.query({
      query: () => ({
        url: "/financial-dashboard",
        method: "GET",
      }),
    }),

    getAccountingReport: build.query({
      query: () => ({
        url: "/meta/accounting-report",
        method: "GET",
      }),
    }),
  }),
});

// ✅ Hooks
export const {
  useGetAllMetaQuery,
  useGetFinancialDashboardQuery,
  useGetAccountingReportQuery,
} = metaApi;
