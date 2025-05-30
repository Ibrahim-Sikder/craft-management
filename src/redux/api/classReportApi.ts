/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { baseApi } from "./baseApi"

// Define a type for the cache entry
interface CacheEntry {
  timestamp: number
  data: any
}

// Create a simple in-memory cache
const clientCache = new Map<string, CacheEntry>()
const CACHE_TTL = 60 * 1000 // 1 minute cache TTL

// Helper function to create a cache key from query parameters
const createCacheKey = (params: Record<string, any>): string => {
  return Object.entries(params)
    .sort(([keyA], [keyB]) => keyA.localeCompare(keyB))
    .map(([key, value]) => `${key}=${value}`)
    .join("&")
}

export const classReportApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createClassReport: build.mutation({
      query: (data) => ({
        url: "/class-report",
        method: "POST",
        data,
      }),
      invalidatesTags: ["class-report"],
     
    }),

    getAllClassReports: build.query({
      query: ({
        limit = 10, // Default to 10 to match backend limit
        page,
        searchTerm,
        className,
        subject,
        teacher,
        date,
        hour,
        lessonEvaluation,
        handwriting,
        endDate,
        startDate,
      }) => {
        // Ensure limit is always 10
        const fixedLimit = 10

        const params = {
          page,
          limit: fixedLimit,
          searchTerm,
          className,
          subject,
          teacher,
          date,
          hour,
          lessonEvaluation,
          handwriting,
          endDate,
          startDate,
        }

        const cacheKey = createCacheKey(params)
        const cachedResponse = clientCache.get(cacheKey)

        if (cachedResponse && Date.now() - cachedResponse.timestamp < CACHE_TTL) {
          console.log("✅ Client cache hit for class reports")
        } else {
          console.log("⏳ Client cache miss for class reports")
        }

        return {
          url: "/class-report",
          method: "GET",
          params,
        }
      },
      keepUnusedDataFor: 300,
      transformResponse: (response: any, meta, arg) => {
        const cacheKey = createCacheKey(arg)

        if (response && response.success) {
          clientCache.set(cacheKey, {
            timestamp: Date.now(),
            data: response,
          })
        }

        return response
      },
      serializeQueryArgs: ({ queryArgs }) => {
        return createCacheKey(queryArgs)
      },
      forceRefetch({ currentArg, previousArg }) {
        return JSON.stringify(currentArg) !== JSON.stringify(previousArg)
      },
      providesTags: (result) =>
        result?.data?.reports
          ? [
              ...result.data.reports.map(({ _id }: { _id: string }) => ({
                type: "class-report" as const,
                id: _id,
              })),
              { type: "class-report", id: "LIST" },
            ]
          : [{ type: "class-report", id: "LIST" }],
    }),

    getSingleClassReport: build.query({
      query: ({ id }) => ({
        url: `/class-report/${id}`,
        method: "GET",
      }),
      keepUnusedDataFor: 600,
      providesTags: (result, error, { id }) => [{ type: "class-report", id }],
    }),

    updateClassReport: build.mutation({
      query: ({ id, data }) => ({
        url: `/class-report/${id}`,
        method: "PATCH",
        data,
      }),
      providesTags:['class-report']
    }),

    deleteClassReport: build.mutation({
      query: (id) => ({
        url: `/class-report/${id}`,
        method: "DELETE",
      }),
   providesTags:['class-report']
    }),

    prefetchClassReports: build.query({
      query: (params) => ({
        url: "/class-report",
        method: "GET",
        params: {
          ...params,
          limit: 10, // Always use 10 for prefetching
        },
      }),
      keepUnusedDataFor: 300,
      transformResponse: (response: any, meta, arg) => {
        const cacheKey = createCacheKey(arg)

        if (response && response.success) {
          clientCache.set(cacheKey, {
            timestamp: Date.now(),
            data: response,
          })
        }

        return response
      },
      providesTags: ["class-report"],
    }),
  }),
})

export const {
  useCreateClassReportMutation,
  useGetAllClassReportsQuery,
  useGetSingleClassReportQuery,
  useUpdateClassReportMutation,
  useDeleteClassReportMutation,
  usePrefetchClassReportsQuery,
  util: { getRunningQueriesThunk },
} = classReportApi

export const { prefetchClassReports } = classReportApi.endpoints

export const clearClassReportCache = () => {
  clientCache.clear()
}

export const getCacheStats = () => {
  return {
    size: clientCache.size,
    keys: Array.from(clientCache.keys()),
  }
}
