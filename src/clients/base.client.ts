import type { AxiosInstance } from 'axios'
import type { AxiosCacheInstance, CacheOptions } from 'axios-cache-interceptor'
import { createHttpCacheInstance } from '../config/http.client'
import type { JikanResponse, JikanResponseWithPagination } from '../models'

/**
 * Client configuration options
 */
export interface ClientOptions {
	/**
	 * Custom axios instance or axios-cache-interceptor instance.
	 * If not provided, a default instance will be created.
	 */
	axiosInstance?: AxiosInstance | AxiosCacheInstance

	/**
	 * Cache configuration options.
	 * Merged with default cache settings.
	 */
	cacheOptions?: Partial<CacheOptions>

	/**
	 * Enable request/response logging for debugging.
	 * Default: false
	 */
	enableLogging?: boolean
}

/**
 * Base client class that provides core HTTP functionality for all resource clients.
 * Handles path parameter replacement, request execution, and response unwrapping.
 */
export abstract class BaseClient {
	protected readonly api: AxiosCacheInstance

	constructor(options: ClientOptions = {}) {
		// Use provided instance if it's already a cache instance, otherwise create one
		if (options.axiosInstance) {
			// If it's already an AxiosCacheInstance, use it directly
			this.api = options.axiosInstance as AxiosCacheInstance
		} else {
			// Create a new cache instance
			this.api = createHttpCacheInstance(
				options.axiosInstance,
				options.cacheOptions
			)
		}

		if (options.enableLogging) {
			this.setupLoggingInterceptors()
		}
	}

	/**
	 * Execute GET request and return the data payload.
	 * Automatically replaces path parameters and unwraps the response.
	 *
	 * @param endpoint - API endpoint path (may contain {param} placeholders)
	 * @param pathParams - Object mapping parameter names to values
	 * @param queryParams - Query string parameters
	 * @returns Promise resolving to the response data
	 */
	protected async getResource<T>(
		endpoint: string,
		pathParams: Record<string, unknown> = {},
		queryParams: Record<string, unknown> = {}
	): Promise<JikanResponse<T>> {
		const url = this.replacePathParams(endpoint, pathParams)
		const response = await this.api.get<JikanResponse<T>>(url, {
			params: queryParams
		})
		return response.data
	}

	/**
	 * Execute GET request and return data with pagination info.
	 * Similar to getResource but for paginated endpoints.
	 *
	 * @param endpoint - API endpoint path
	 * @param pathParams - Object mapping parameter names to values
	 * @param queryParams - Query string parameters
	 * @returns Promise resolving to the response data with pagination
	 */
	protected async getResourceWithPagination<T>(
		endpoint: string,
		pathParams: Record<string, unknown> = {},
		queryParams: Record<string, unknown> = {}
	): Promise<JikanResponseWithPagination<T>> {
		const url = this.replacePathParams(endpoint, pathParams)
		const response = await this.api.get<JikanResponseWithPagination<T>>(url, {
			params: queryParams
		})
		return response.data
	}

	/**
	 * Replace path parameters in endpoint URLs.
	 * Converts "/anime/{id}" + {id: 1} => "/anime/1"
	 *
	 * @param path - Endpoint path with {param} placeholders
	 * @param params - Object with parameter values
	 * @returns Path with parameters replaced
	 * @throws Error if a required parameter is missing
	 */
	private replacePathParams(
		path: string,
		params: Record<string, unknown>
	): string {
		let result = path

		for (const [key, value] of Object.entries(params)) {
			const placeholder = `{${key}}`
			if (!result.includes(placeholder)) {
				throw new Error(
					`Path "${path}" does not contain parameter placeholder "${placeholder}"`
				)
			}
			result = result.replace(placeholder, String(value))
		}

		// Check for unreplaced parameters
		const unreplaced = result.match(/\{[^}]+\}/g)
		if (unreplaced) {
			throw new Error(
				`Missing required path parameters: ${unreplaced.join(', ')}`
			)
		}

		return result
	}

	/**
	 * Setup request/response logging interceptors for debugging.
	 * Logs all requests and responses when enableLogging is true.
	 */
	private setupLoggingInterceptors(): void {
		// Request interceptor
		this.api.interceptors.request.use(
			(config) => {
				console.log('[Jikan Request]', {
					method: config.method?.toUpperCase(),
					url: config.url,
					params: config.params,
					baseURL: config.baseURL
				})
				return config
			},
			(error) => {
				console.error('[Jikan Request Error]', error)
				return Promise.reject(error)
			}
		)

		// Response interceptor
		this.api.interceptors.response.use(
			(response) => {
				console.log('[Jikan Response]', {
					status: response.status,
					url: response.config.url,
					cached: response.cached,
					data: response.data
				})
				return response
			},
			(error) => {
				console.error('[Jikan Response Error]', {
					status: error.response?.status,
					url: error.config?.url,
					message: error.message,
					data: error.response?.data
				})
				return Promise.reject(error)
			}
		)
	}
}