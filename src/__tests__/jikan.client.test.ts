import { beforeAll, describe, expect, it } from 'bun:test'
import { AnimeClient } from '../clients/anime.client'
import { JikanClient } from '../clients/jikan.client'
import { MangaClient } from '../clients/manga.client'

describe('JikanClient', () => {
	let client: JikanClient

	beforeAll(() => {
		client = new JikanClient()
	})

	it('should be instantiated correctly', () => {
		expect(client).toBeDefined()
		expect(client).toBeInstanceOf(JikanClient)
	})

	it('should have anime client', () => {
		expect(client.anime).toBeDefined()
		expect(client.anime).toBeInstanceOf(AnimeClient)
	})

	it('should have manga client', () => {
		expect(client.manga).toBeDefined()
		expect(client.manga).toBeInstanceOf(MangaClient)
	})

	it('should accept custom configuration', () => {
		const customClient = new JikanClient({
			enableLogging: false,
			cacheOptions: {
				ttl: 1000 * 60 * 30 // 30 minutes
			}
		})
		expect(customClient).toBeDefined()
		expect(customClient.anime).toBeDefined()
		expect(customClient.manga).toBeDefined()
	})

	it('should provide access to axios instance', () => {
		const axiosInstance = client.getAxiosInstance()
		expect(axiosInstance).toBeDefined()
		expect(axiosInstance.get).toBeDefined()
		expect(axiosInstance.defaults).toBeDefined()
	})

	describe('cache management', () => {
		it('should clear all cache', async () => {
			await expect(client.clearCache()).resolves.toBeUndefined()
		})

		it('should clear specific cache entry', async () => {
			await expect(client.clearCacheEntry('/anime/1')).resolves.toBeUndefined()
		})
	})

	describe('integration tests', () => {
		it('should fetch anime through main client', async () => {
			const { data } = await client.anime.getAnimeById(1)
			expect(data.mal_id).toBe(1)
			expect(data.title).toBeDefined()
		})

		it('should fetch manga through main client', async () => {
			await new Promise(resolve => setTimeout(resolve, 1000))
			const { data } = await client.manga.getMangaById(1)
			expect(data.mal_id).toBe(1)
			expect(data.title).toBeDefined()
		})

		it('should use shared cache across clients', async () => {
			await new Promise(resolve => setTimeout(resolve, 1000))

			// First call - not cached
			const anime1 = await client.anime.getAnimeById(1)
			expect(anime1.data.mal_id).toBe(1)

			await new Promise(resolve => setTimeout(resolve, 100))

			// Second call - should be cached (faster)
			const anime2 = await client.anime.getAnimeById(1)
			expect(anime2.data.mal_id).toBe(1)
			expect(anime2.data.title).toBe(anime1.data.title)
		})
	})

	describe('with logging enabled', () => {
		it('should create client with logging', () => {
			const loggingClient = new JikanClient({
				enableLogging: true
			})
			expect(loggingClient).toBeDefined()
			expect(loggingClient.anime).toBeDefined()
		})
	})

	describe('with custom cache options', () => {
		it('should create client with custom cache TTL', () => {
			const customCacheClient = new JikanClient({
				cacheOptions: {
					ttl: 1000 * 60 * 10, // 10 minutes
					methods: ['get']
				}
			})
			expect(customCacheClient).toBeDefined()
			expect(customCacheClient.anime).toBeDefined()
		})
	})
})
