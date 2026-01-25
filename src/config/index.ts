/**
 * Config public exports
 *
 * Centralized exports for HTTP & logging configuration helpers.
 */
export {
  createHttpCacheInstance,
  isAxiosCacheInstance,
  DEFAULT_CACHE_TTL,
} from "./http.client";
export {
  attachLoggingInterceptors,
  DEFAULT_MAX_RESPONSE_DATA_LENGTH,
} from "./logging.interceptor";
export type { Logger, LoggingOptions } from "./logging.interceptor";
export { BASE_URL } from "../constants/base.const";
