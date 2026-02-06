import type { ClientOptions } from './base.client'
import { AnimeClient } from './anime.client'
import { MangaClient } from './manga.client'
import { createHttpCacheInstance } from '../config/http.client'
import type { AxiosCacheInstance } from 'axios-cache-interceptor'

/**
 * Main Jikan API client that provides access to all resource endpoints.
 * 
 * This is the primary entry point for interacting with the Jikan API.
 * It aggregates all resource-specific clients (anime, manga, characters, etc.)
 * and manages a shared HTTP client instance with caching.
 * 
 * @example
 * ```typescript
 * // Basic usage
 * const jikan = new JikanClient();
 * const anime = await jikan.anime.getAnimeById(1);
 * 
 * // With custom configuration
 * const jikan = new JikanClient({
 *   enableLogging: true,
 *   cacheOptions: {
 *     ttl: 1000 * 60 * 30 // 30 minutes
 *   }
 * });
 * ```
 */
export class JikanClient {
	/**
	 * Client for anime-related endpoints.
	 * Access anime data, characters, staff, episodes, reviews, etc.
	 */
	public readonly anime: AnimeClient

	/**
	 * Client for manga-related endpoints.
	 * Access manga data, characters, news, reviews, etc.
	 */
	public readonly manga: MangaClient

	/**
	 * Shared axios cache instance used by all resource clients.
	 */
	private readonly axiosCacheInstance: AxiosCacheInstance

	/**
	 * Create a new Jikan API client.
	 * 
	 * @param options - Client configuration options
	 * @param options.axiosInstance - Custom axios instance (optional)
	 * @param options.cacheOptions - Cache configuration (optional)
	 * @param options.enableLogging - Enable request/response logging (optional)
	 * 
	 * @example
	 * ```typescript
	 * // Default configuration
	 * const client = new JikanClient();
	 * 
	 * // With logging enabled
	 * const client = new JikanClient({ enableLogging: true });
	 * 
	 * // With custom cache settings
	 * const client = new JikanClient({
	 *   cacheOptions: {
	 *     ttl: 1000 * 60 * 60 * 12, // 12 hours
	 *     methods: ['get'],
	 *     cacheTakeover: false
	 *   }
	 * });
	 * 
	 * // With custom axios instance
	 * import axios from 'axios';
	 * const customAxios = axios.create({
	 *   timeout: 10000,
	 *   headers: { 'User-Agent': 'MyApp/1.0' }
	 * });
	 * const client = new JikanClient({ axiosInstance: customAxios });
	 * ```
	 */
	constructor(options: ClientOptions = {}) {
		// Create a shared axios cache instance
		this.axiosCacheInstance = createHttpCacheInstance(
			options.axiosInstance,
			options.cacheOptions
		)

		// Initialize all resource clients with the shared instance
		const clientConfig: ClientOptions = {
			...options,
			axiosInstance: this.axiosCacheInstance
		}

		this.anime = new AnimeClient(clientConfig)
		this.manga = new MangaClient(clientConfig)

		// TODO: Initialize other resource clients as they are implemented
		// this.characters = new CharactersClient(clientConfig)
		// this.people = new PeopleClient(clientConfig)
		// this.clubs = new ClubsClient(clientConfig)
		// this.genres = new GenresClient(clientConfig)
		// this.magazines = new MagazinesClient(clientConfig)
		// this.producers = new ProducersClient(clientConfig)
		// this.random = new RandomClient(clientConfig)
		// this.recommendations = new RecommendationsClient(clientConfig)
		// this.reviews = new ReviewsClient(clientConfig)
		// this.schedules = new SchedulesClient(clientConfig)
		// this.seasons = new SeasonsClient(clientConfig)
		// this.top = new TopClient(clientConfig)
		// this.users = new UsersClient(clientConfig)
		// this.watch = new WatchClient(clientConfig)
	}

	/**
	 * Get the underlying axios cache instance.
	 * Useful for advanced cache management or adding custom interceptors.
	 * 
	 * @returns The axios cache instance used by this client
	 * 
	 * @example
	 * ```typescript
	 * const client = new JikanClient();
	 * const axiosInstance = client.getAxiosInstance();
	 * 
	 * // Add custom interceptor
	 * axiosInstance.interceptors.request.use(config => {
	 *   config.headers['X-Custom-Header'] = 'value';
	 *   return config;
	 * });
	 * ```
	 */
	public getAxiosInstance(): AxiosCacheInstance {
		return this.axiosCacheInstance
	}

	/**
	 * Clear all cached responses.
	 * Useful when you want to force fresh data from the API.
	 * 
	 * @returns Promise that resolves when cache is cleared
	 * 
	 * @example
	 * ```typescript
	 * const client = new JikanClient();
	 * 
	 * // Fetch data (will be cached)
	 * await client.anime.getAnimeById(1);
	 * 
	 * // Clear cache
	 * await client.clearCache();
	 * 
	 * // Fetch again (will hit API, not cache)
	 * await client.anime.getAnimeById(1);
	 * ```
	 */
	public async clearCache(): Promise<void> {
		if (this.axiosCacheInstance.storage?.clear) {
			await this.axiosCacheInstance.storage.clear()
		}
	}

	/**
	 * Clear cached response for a specific key or pattern.
	 * 
	 * @param key - Cache key or pattern to clear
	 * @returns Promise that resolves when cache entry is removed
	 * 
	 * @example
	 * ```typescript
	 * const client = new JikanClient();
	 * 
	 * // Clear specific endpoint cache
	 * await client.clearCacheEntry('/anime/1');
	 * ```
	 */
	public async clearCacheEntry(key: string): Promise<void> {
		if (this.axiosCacheInstance.storage?.remove) {
			await this.axiosCacheInstance.storage.remove(key)
		}
	}
}