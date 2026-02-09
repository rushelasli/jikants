import { beforeAll, beforeEach, describe, expect, it } from 'bun:test'
import { RecommendationsClient } from '../clients/recommendations.client'

describe('RecommendationsClient', () => {
	let client: RecommendationsClient

	beforeAll(() => {
		client = new RecommendationsClient()
	})

	// Prevent rate-limit errors. See: https://docs.api.jikan.moe/#section/Information/Rate-Limiting
	// Jikan allows 3 requests per second, 60 per minute
	beforeEach(async () => {
		await new Promise(resolve => setTimeout(resolve, 1000))
	})

	it('should be instantiated correctly', () => {
		expect(client).toBeDefined()
		expect(client).toBeInstanceOf(RecommendationsClient)
	})

	describe('getRecentAnimeRecommendations', () => {
		it('should get recent anime recommendations without page', async () => {
			const { data } = await client.getRecentAnimeRecommendations()
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
			expect(data.length).toBeGreaterThan(0)
			if (data.length > 0) {
				expect(data[0].mal_id).toBeDefined()
				expect(data[0].entry).toBeDefined()
				expect(Array.isArray(data[0].entry)).toBe(true)
				expect(data[0].entry.length).toBe(2)
				expect(data[0].content).toBeDefined()
				expect(data[0].user).toBeDefined()
			}
		})

		it('should get recent anime recommendations with page', async () => {
			const { data } = await client.getRecentAnimeRecommendations(1)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
			expect(data.length).toBeGreaterThan(0)
		})

		it('should get second page of anime recommendations', async () => {
			const { data } = await client.getRecentAnimeRecommendations(2)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
		})

		it('should validate anime recommendation structure', async () => {
			const { data } = await client.getRecentAnimeRecommendations(1)
			if (data.length > 0) {
				const rec = data[0]
				expect(rec.entry[0].mal_id).toBeDefined()
				expect(rec.entry[0].title).toBeDefined()
				expect(rec.entry[0].url).toBeDefined()
				expect(rec.entry[0].images).toBeDefined()
				expect(rec.user.username).toBeDefined()
				expect(rec.user.url).toBeDefined()
			}
		}, 10000)
	})

	describe('getRecentMangaRecommendations', () => {
		it('should get recent manga recommendations without page', async () => {
			const { data } = await client.getRecentMangaRecommendations()
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
			expect(data.length).toBeGreaterThan(0)
			if (data.length > 0) {
				expect(data[0].mal_id).toBeDefined()
				expect(data[0].entry).toBeDefined()
				expect(Array.isArray(data[0].entry)).toBe(true)
				expect(data[0].entry.length).toBe(2)
				expect(data[0].content).toBeDefined()
				expect(data[0].user).toBeDefined()
			}
		})

		it('should get recent manga recommendations with page', async () => {
			const { data } = await client.getRecentMangaRecommendations(1)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
			expect(data.length).toBeGreaterThan(0)
		})

		it('should get second page of manga recommendations', async () => {
			const { data } = await client.getRecentMangaRecommendations(2)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
		})

		it('should validate manga recommendation structure', async () => {
			const { data } = await client.getRecentMangaRecommendations(1)
			if (data.length > 0) {
				const rec = data[0]
				expect(rec.entry[0].mal_id).toBeDefined()
				expect(rec.entry[0].title).toBeDefined()
				expect(rec.entry[0].url).toBeDefined()
				expect(rec.entry[0].images).toBeDefined()
				expect(rec.user.username).toBeDefined()
				expect(rec.user.url).toBeDefined()
			}
		})
	})
})
