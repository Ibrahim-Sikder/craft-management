/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import { useCallback, useRef } from "react"

interface CacheOptions {
  ttl?: number // Time to live in milliseconds
  maxSize?: number // Maximum number of items in cache
}

interface CacheItem<T> {
  data: T
  timestamp: number
}

export function useClientCache<T = any>(options: CacheOptions = {}) {
  const { ttl = 5 * 60 * 1000, maxSize = 100 } = options

  // Use ref to maintain cache between renders
  const cacheRef = useRef<Map<string, CacheItem<T>>>(new Map())

  // Get item from cache
  const get = useCallback(
    (key: string): T | undefined => {
      const item = cacheRef.current.get(key)

      if (!item) return undefined

      // Check if item is expired
      if (Date.now() - item.timestamp > ttl) {
        cacheRef.current.delete(key)
        return undefined
      }

      return item.data
    },
    [ttl],
  )

  // Set item in cache
  const set = useCallback(
    (key: string, data: T): void => {
      // If cache is at max size, remove oldest item
      if (cacheRef.current.size >= maxSize) {
        const oldestKey = Array.from(cacheRef.current.keys())[0]
        cacheRef.current.delete(oldestKey)
      }

      cacheRef.current.set(key, {
        data,
        timestamp: Date.now(),
      })
    },
    [maxSize],
  )

  // Clear entire cache or specific key
  const clear = useCallback((key?: string): void => {
    if (key) {
      cacheRef.current.delete(key)
    } else {
      cacheRef.current.clear()
    }
  }, [])

  // Check if key exists and is not expired
  const has = useCallback(
    (key: string): boolean => {
      const item = cacheRef.current.get(key)
      if (!item) return false

      if (Date.now() - item.timestamp > ttl) {
        cacheRef.current.delete(key)
        return false
      }

      return true
    },
    [ttl],
  )

  return { get, set, clear, has }
}
