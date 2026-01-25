import axios, { type AxiosInstance } from "axios";
import {
  type AxiosCacheInstance,
  type CacheOptions,
  setupCache,
} from "axios-cache-interceptor";
import { BASE_URL } from "../constants/base.const";

/**
 * Default cache TTL: 24 hours (milliseconds)
 */
export const DEFAULT_CACHE_TTL = 1000 * 60 * 60 * 24;

/**
 * Type-guard to determine whether an axios instance has been augmented
 * by `axios-cache-interceptor`.
 */
export const isAxiosCacheInstance = (
  instance: AxiosInstance | AxiosCacheInstance,
): instance is AxiosCacheInstance => {
  // `axios-cache-interceptor` augments the instance with a `cache` helper.
  // Use a safe any-cast to avoid type errors coming from the upstream types.
  return typeof (instance as any).cache === "function";
};

/**
 * Create or return an axios instance augmented with axios-cache-interceptor.
 *
 * - If `axiosInstance` is already a cache instance, it is returned as-is.
 * - Otherwise a new cache wrapper is created with sensible defaults.
 *
 * @param axiosInstance Optional custom Axios instance or axios-cache-interceptor instance
 * @param cacheOptions  Partial cache options passed to `setupCache` (merged with defaults)
 * @returns AxiosCacheInstance ready for use
 */
export const createHttpCacheInstance = (
  axiosInstance?: AxiosInstance | AxiosCacheInstance,
  cacheOptions: Partial<CacheOptions> = {},
): AxiosCacheInstance => {
  const instance =
    axiosInstance ??
    axios.create({
      baseURL: BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

  if (isAxiosCacheInstance(instance)) {
    return instance;
  }

  return setupCache(instance, {
    ttl: DEFAULT_CACHE_TTL,
    methods: ["get"],
    cacheTakeover: false,
    ...cacheOptions,
  });
};
