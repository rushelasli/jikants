import { beforeAll, beforeEach, describe, expect, it } from 'bun:test'
import { MangaClient } from '../clients/manga.client'
import type { MangaSearchParams } from '../models'

describe('MangaClient', () => {
	let client: MangaClient

	beforeAll(() => {
		client = new MangaClient()
	})

	// Prevent rate-limit errors. See: https://docs.api.jikan.moe/#section/Information/Rate-Limiting
	// Jikan allows 3 requests per second, 60 per minute
	beforeEach(async () => {
		await new Promise((resolve) => setTimeout(resolve, 1000))
	})

	it('should be instantiated correctly', () => {
		expect(client).toBeDefined()
		expect(client).toBeInstanceOf(MangaClient)
	})

	describe('getMangaFullById', () => {
		it('should get full manga data by id', async () => {
			const { data } = await client.getMangaFullById(1)
			expect(data.mal_id).toBe(1)
			expect(data.title).toBeDefined()
			expect(data.relations).toBeDefined()
			expect(data.external).toBeDefined()
		})
	})

	describe('getMangaById', () => {
		it('should get manga by id', async () => {
			const { data } = await client.getMangaById(1)
			expect(data.mal_id).toBe(1)
			expect(data.title).toBeDefined()
			expect(data.type).toBeDefined()
			expect(data.chapters).toBeDefined()
			expect(data.volumes).toBeDefined()
		})
	})

	describe('getMangaCharacters', () => {
		it('should get manga characters', async () => {
			const { data } = await client.getMangaCharacters(1)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
			expect(data.length).toBeGreaterThan(0)
			if (data.length > 0) {
				expect(data[0].character).toBeDefined()
				expect(data[0].role).toBeDefined()
			}
		})
	})

	describe('getMangaNews', () => {
		it('should get manga news with pagination', async () => {
			const response = await client.getMangaNews(1, 1)
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
			expect(response.pagination).toBeDefined()
		})

		it('should get second page of news', async () => {
			const response = await client.getMangaNews(1, 2)
			expect(response.data).toBeDefined()
			expect(response.pagination).toBeDefined()
			// Note: current_page may be undefined in some API responses
			if (response.pagination.current_page !== undefined) {
				expect(response.pagination.current_page).toBe(2)
			}
		})
	})

	describe('getMangaForum', () => {
		it('should get manga forum topics without filter', async () => {
			const { data } = await client.getMangaForum(1)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
		})

		it('should get manga forum topics with filter', async () => {
			const { data } = await client.getMangaForum(1, 'all')
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
		})
	})

	describe('getMangaPictures', () => {
		it('should get manga pictures', async () => {
			const { data } = await client.getMangaPictures(1)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
			expect(data.length).toBeGreaterThan(0)
		})
	})

	describe('getMangaStatistics', () => {
		it('should get manga statistics', async () => {
			const { data } = await client.getMangaStatistics(1)
			expect(data).toBeDefined()
			expect(data.reading).toBeDefined()
			expect(data.completed).toBeDefined()
			expect(data.on_hold).toBeDefined()
			expect(data.dropped).toBeDefined()
			expect(data.total).toBeGreaterThan(1000)
			expect(data.scores).toBeDefined()
			expect(Array.isArray(data.scores)).toBe(true)
		})
	})

	describe('getMangaMoreInfo', () => {
		it('should get manga more info', async () => {
			const { data } = await client.getMangaMoreInfo(1)
			expect(data).toBeDefined()
			expect(data.moreinfo).toBeDefined()
		})
	})

	describe('getMangaRecommendations', () => {
		it('should get manga recommendations', async () => {
			const { data } = await client.getMangaRecommendations(1)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
			if (data.length > 0) {
				expect(data[0].entry).toBeDefined()
				expect(data[0].votes).toBeDefined()
			}
		})
	})

	describe('getMangaUserUpdates', () => {
		it('should get manga user updates with pagination', async () => {
			const response = await client.getMangaUserUpdates(1, 1)
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
			expect(response.pagination).toBeDefined()
		})
	})

	describe('getMangaReviews', () => {
		it('should get manga reviews without filters', async () => {
			const response = await client.getMangaReviews(1, 1)
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
			expect(response.pagination).toBeDefined()
		})

		it('should get manga reviews with preliminary filter', async () => {
			const response = await client.getMangaReviews(1, 1, true)
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
		})

		it('should get manga reviews with spoilers filter', async () => {
			const response = await client.getMangaReviews(1, 1, undefined, true)
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
		})
	})

	describe('getMangaRelations', () => {
		it('should get manga relations', async () => {
			const { data } = await client.getMangaRelations(1)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
			if (data.length > 0) {
				expect(data[0].relation).toBeDefined()
				expect(data[0].entry).toBeDefined()
			}
		})
	})

	describe('getMangaExternal', () => {
		it('should get manga external links', async () => {
			const { data } = await client.getMangaExternal(1)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
			if (data.length > 0) {
				expect(data[0].name).toBeDefined()
				expect(data[0].url).toBeDefined()
			}
		})
	})

	describe('searchManga', () => {
		it('should search manga without filters', async () => {
			const response = await client.searchManga({ q: 'one piece', limit: 5 })
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
			expect(response.data.length).toBeLessThanOrEqual(5)
			expect(response.pagination).toBeDefined()
		})

		it('should search manga with score filter', async () => {
			const params: MangaSearchParams = {
				q: 'naruto',
				min_score: 8,
				limit: 3
			}
			const response = await client.searchManga(params)
			expect(response.data).toBeDefined()
			expect(response.data.length).toBeLessThanOrEqual(3)
			for (const manga of response.data) {
				if (manga.score !== null) {
					expect(manga.score).toBeGreaterThanOrEqual(8)
				}
			}
		})

		it('should search manga with type filter', async () => {
			const params: MangaSearchParams = {
				type: 'manga',
				limit: 3
			}
			const response = await client.searchManga(params)
			expect(response.data).toBeDefined()
			expect(response.data.length).toBeLessThanOrEqual(3)
			for (const manga of response.data) {
				expect(manga.type).toBe('Manga')
			}
		})

		it('should search manga with status filter', async () => {
			const params: MangaSearchParams = {
				status: 'publishing',
				limit: 3
			}
			const response = await client.searchManga(params)
			expect(response.data).toBeDefined()
			expect(response.data.length).toBeLessThanOrEqual(3)
			for (const manga of response.data) {
				expect(manga.status).toBe('Publishing')
			}
		})

		it('should search manga with order_by and sort', async () => {
			const params: MangaSearchParams = {
				order_by: 'score',
				sort: 'desc',
				limit: 3
			}
			const response = await client.searchManga(params)
			expect(response.data).toBeDefined()
			expect(response.data.length).toBeLessThanOrEqual(3)
			// Check if scores are in descending order
			if (response.data.length > 1) {
				for (let i = 0; i < response.data.length - 1; i++) {
					const current = response.data[i].score
					const next = response.data[i + 1].score
					if (current !== null && next !== null) {
						expect(current).toBeGreaterThanOrEqual(next)
					}
				}
			}
		})

		it('should search manga with pagination', async () => {
			const page1 = await client.searchManga({ q: 'naruto', page: 1, limit: 3 })
			const page2 = await client.searchManga({ q: 'naruto', page: 2, limit: 3 })

			expect(page1.data).toBeDefined()
			expect(page2.data).toBeDefined()
			expect(page1.pagination).toBeDefined()
			expect(page2.pagination).toBeDefined()
			// Note: current_page may be undefined in some API responses
			if (page1.pagination.current_page !== undefined) {
				expect(page1.pagination.current_page).toBe(1)
			}
			if (page2.pagination.current_page !== undefined) {
				expect(page2.pagination.current_page).toBe(2)
			}
		})

		it('should search manga with sfw filter', async () => {
			const params: MangaSearchParams = {
				sfw: true,
				limit: 3
			}
			const response = await client.searchManga(params)
			expect(response.data).toBeDefined()
			expect(response.data.length).toBeLessThanOrEqual(3)
		})
	})

	describe('error handling', () => {
		it('should throw error for non-existent manga id', async () => {
			try {
				await client.getMangaById(999999999)
				expect(true).toBe(false) // Should not reach here
			} catch (error: any) {
				expect(error).toBeDefined()
				expect(error.response?.status).toBe(404)
			}
		})
	})
})