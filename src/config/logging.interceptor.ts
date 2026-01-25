import type { AxiosError, AxiosInstance, AxiosRequestConfig } from "axios";
import type {
  AxiosCacheInstance,
  CacheAxiosResponse,
} from "axios-cache-interceptor";

/**
 * Logger shape accepted by the logging helpers.
 * Any logger with compatible `info`/`error` methods is supported (e.g. console, pino, winston).
 */
export interface Logger {
  info: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
  debug?: (...args: unknown[]) => void;
  warn?: (...args: unknown[]) => void;
}

/** Options for logging interceptor attachment. */
export interface LoggingOptions {
  /** Custom logger instance (defaults to `console`) */
  logger?: Logger;
  /** If true, response bodies are logged (disabled by default) */
  logResponseData?: boolean;
  /** Max characters to log for response bodies (when enabled) */
  maxResponseDataLength?: number;
  /** If true, request/response headers are included in debug logs */
  includeHeaders?: boolean;
  /** If true, request params are logged in debug logs */
  logRequestParams?: boolean;
}

/** Default max length for serialised response data when `logResponseData` is enabled. */
export const DEFAULT_MAX_RESPONSE_DATA_LENGTH = 1000;

const safeSerialize = (
  v: unknown,
  maxLen = DEFAULT_MAX_RESPONSE_DATA_LENGTH,
): string => {
  try {
    const s = JSON.stringify(v);
    if (s.length > maxLen) {
      return `${s.slice(0, maxLen)}... (truncated ${s.length - maxLen} chars)`;
    }
    return s;
  } catch {
    try {
      return String(v);
    } catch {
      return "[unserializable]";
    }
  }
};

/**
 * Attach request/response logging interceptors to an axios instance.
 *
 * Returns a function that removes (ejects) the attached interceptors when invoked.
 *
 * Example:
 * const detach = attachLoggingInterceptors(api, { logResponseData: false })
 * ...
 * detach() // to remove interceptors
 */
export const attachLoggingInterceptors = (
  instance: AxiosInstance | AxiosCacheInstance,
  options: LoggingOptions = {},
): (() => void) => {
  const logger: Logger = options.logger ?? (console as unknown as Logger);
  const logResponseData = options.logResponseData ?? false;
  const maxResponseDataLength =
    options.maxResponseDataLength ?? DEFAULT_MAX_RESPONSE_DATA_LENGTH;
  const includeHeaders = options.includeHeaders ?? false;
  const logRequestParams = options.logRequestParams ?? false;

  const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    const method = (config.method ?? "").toUpperCase();
    logger.info(`[Jikan] Request: ${method} | ${config.url ?? ""}`);

    if (logRequestParams && config.params) {
      logger.debug?.(
        `[Jikan] Request Params: ${safeSerialize(config.params, maxResponseDataLength)}`,
      );
    }

    if (includeHeaders) {
      logger.debug?.("[Jikan] Request Headers:", config.headers);
    }

    return config;
  };

  const onRequestError = (error: AxiosError): Promise<AxiosError> => {
    logger.error(
      `[Jikan] Request Error: CODE ${error.code ?? "UNKNOWN"} | ${error.message}`,
    );
    return Promise.reject(error);
  };

  const onResponse = (response: CacheAxiosResponse): CacheAxiosResponse => {
    const cachedLabel = (response as CacheAxiosResponse).cached
      ? " (cached)"
      : "";
    logger.info(
      `[Jikan] Response: ${response.status} | ${response.config.url ?? ""}${cachedLabel}`,
    );

    if (logResponseData) {
      logger.debug?.(
        `[Jikan] Response Body: ${safeSerialize(response.data, maxResponseDataLength)}`,
      );
    }

    if (includeHeaders) {
      logger.debug?.("[Jikan] Response Headers:", response.headers);
    }

    return response;
  };

  const onResponseError = (error: AxiosError): Promise<AxiosError> => {
    const status = error.response?.status ?? "UNKNOWN";
    const url = (error.config as { url?: string } | undefined)?.url ?? "";
    logger.error(
      `[Jikan] Response Error: CODE ${error.code ?? "UNKNOWN"} | STATUS ${status} | ${url} | ${error.message}`,
    );
    return Promise.reject(error);
  };

  const reqId = (instance.interceptors.request as any).use(
    onRequest as any,
    onRequestError as any,
  );
  const resId = (instance.interceptors.response as any).use(
    onResponse as any,
    onResponseError as any,
  );

  // return eject function
  return () => {
    try {
      instance.interceptors.request.eject(reqId);
    } catch {
      // ignore
    }
    try {
      instance.interceptors.response.eject(resId);
    } catch {
      // ignore
    }
  };
};
