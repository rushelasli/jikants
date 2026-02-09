import { beforeAll, beforeEach, describe, expect, it } from 'bun:test'
import { AnimeClient } from '../clients/anime.client'
import type { AnimeSearchParams } from '../models'

describe('AnimeClient', () => {
	let client: AnimeClient

	beforeAll(() => {
		client = new AnimeClient()
	})

	// Prevent rate-limit errors. See: https://docs.api.jikan.moe/#section/Information/Rate-Limiting
	// Jikan allows 3 requests per second, 60 per minute
	beforeEach(async () => {
		await new Promise(resolve => setTimeout(resolve, 1000))
	})

	it('should be instantiated correctly', () => {
		expect(client).toBeDefined()
		expect(client).toBeInstanceOf(AnimeClient)
	})

	describe('getAnimeFullById', () => {
		it('should get full anime data by id', async () => {
			const { data } = await client.getAnimeFullById(1)
			expect(data.mal_id).toBe(1)
			expect(data.title).toBeDefined()
			expect(data.relations).toBeDefined()
			expect(data.theme).toBeDefined()
			expect(data.external).toBeDefined()
			expect(data.streaming).toBeDefined()
		})
	})

	describe('getAnimeById', () => {
		it('should get anime by id', async () => {
			const { data } = await client.getAnimeById(1)
			expect(data.mal_id).toBe(1)
			expect(data.title).toBeDefined()
			expect(data.type).toBeDefined()
		})
	})

	describe('getAnimeCharacters', () => {
		it('should get anime characters', async () => {
			const { data } = await client.getAnimeCharacters(1)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
			expect(data.length).toBeGreaterThan(0)
			if (data.length > 0) {
				expect(data[0].character).toBeDefined()
				expect(data[0].role).toBeDefined()
			}
		})
	})

	describe('getAnimeStaff', () => {
		it('should get anime staff', async () => {
			const { data } = await client.getAnimeStaff(1)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
			expect(data.length).toBeGreaterThan(0)
			if (data.length > 0) {
				expect(data[0].person).toBeDefined()
				expect(data[0].positions).toBeDefined()
			}
		})
	})

	describe('getAnimeEpisodes', () => {
		it('should get anime episodes with pagination', async () => {
			const response = await client.getAnimeEpisodes(1, 1)
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
			expect(response.pagination).toBeDefined()
			expect(response.pagination.has_next_page).toBeDefined()
		})

		it('should get second page of episodes', async () => {
			const response = await client.getAnimeEpisodes(1, 2)
			expect(response.data).toBeDefined()
			expect(response.pagination).toBeDefined()
			// Note: current_page may be undefined in some API responses
			if (response.pagination.current_page !== undefined) {
				expect(response.pagination.current_page).toBe(2)
			}
		})
	})

	describe('getAnimeEpisodeById', () => {
		it('should get specific episode by id', async () => {
			const { data } = await client.getAnimeEpisodeById(1, 1)
			expect(data.mal_id).toBe(1)
			expect(data.title).toBeDefined()
		})
	})

	describe('getAnimeNews', () => {
		it('should get anime news with pagination', async () => {
			const response = await client.getAnimeNews(1, 1)
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
			expect(response.pagination).toBeDefined()
		})
	})

	describe('getAnimeForum', () => {
		it('should get anime forum topics without filter', async () => {
			const { data } = await client.getAnimeForum(1)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
			expect(data.length).toBeGreaterThan(0)
		})

		it('should get anime forum topics with episode filter', async () => {
			const { data } = await client.getAnimeForum(1, 'episode')
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
		})
	})

	describe('getAnimeVideos', () => {
		it('should get anime videos', async () => {
			const { data } = await client.getAnimeVideos(1)
			expect(data).toBeDefined()
			expect(data.promo).toBeDefined()
			expect(Array.isArray(data.promo)).toBe(true)
			expect(data.episodes).toBeDefined()
			expect(Array.isArray(data.episodes)).toBe(true)
			expect(data.music_videos).toBeDefined()
			expect(Array.isArray(data.music_videos)).toBe(true)
		})
	})

	describe('getAnimeVideosEpisodes', () => {
		it('should get anime episode videos with pagination', async () => {
			const response = await client.getAnimeVideosEpisodes(1, 1)
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
			expect(response.pagination).toBeDefined()
		})
	})

	describe('getAnimePictures', () => {
		it('should get anime pictures', async () => {
			const { data } = await client.getAnimePictures(1)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
			expect(data.length).toBeGreaterThan(0)
		})
	})

	describe('getAnimeStatistics', () => {
		it('should get anime statistics', async () => {
			const { data } = await client.getAnimeStatistics(1)
			expect(data).toBeDefined()
			expect(data.watching).toBeDefined()
			expect(data.completed).toBeDefined()
			expect(data.on_hold).toBeDefined()
			expect(data.dropped).toBeDefined()
			expect(data.total).toBeGreaterThan(1000)
			expect(data.scores).toBeDefined()
			expect(Array.isArray(data.scores)).toBe(true)
		})
	})

	describe('getAnimeMoreInfo', () => {
		it('should get anime more info', async () => {
			const { data } = await client.getAnimeMoreInfo(1)
			expect(data).toBeDefined()
			expect(data.moreinfo).toBeDefined()
		})
	})

	describe('getAnimeRecommendations', () => {
		it('should get anime recommendations', async () => {
			const { data } = await client.getAnimeRecommendations(1)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
			if (data.length > 0) {
				expect(data[0].entry).toBeDefined()
				expect(data[0].votes).toBeDefined()
			}
		})
	})

	describe('getAnimeUserUpdates', () => {
		it('should get anime user updates with pagination', async () => {
			const response = await client.getAnimeUserUpdates(1, 1)
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
			expect(response.pagination).toBeDefined()
		})
	})

	describe('getAnimeReviews', () => {
		it('should get anime reviews without filters', async () => {
			const response = await client.getAnimeReviews(1, 1)
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
			expect(response.pagination).toBeDefined()
		})

		it('should get anime reviews with preliminary filter', async () => {
			const response = await client.getAnimeReviews(1, 1, true)
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
		})

		it('should get anime reviews with spoilers filter', async () => {
			const response = await client.getAnimeReviews(1, 1, undefined, true)
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
		})
	})

	describe('getAnimeRelations', () => {
		it('should get anime relations', async () => {
			const { data } = await client.getAnimeRelations(1)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
			if (data.length > 0) {
				expect(data[0].relation).toBeDefined()
				expect(data[0].entry).toBeDefined()
			}
		})
	})

	describe('getAnimeThemes', () => {
		it('should get anime themes', async () => {
			const { data } = await client.getAnimeThemes(1)
			expect(data).toBeDefined()
			expect(data.openings).toBeDefined()
			expect(Array.isArray(data.openings)).toBe(true)
			expect(data.endings).toBeDefined()
			expect(Array.isArray(data.endings)).toBe(true)
		})
	})

	describe('getAnimeExternal', () => {
		it('should get anime external links', async () => {
			const { data } = await client.getAnimeExternal(1)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
			if (data.length > 0) {
				expect(data[0].name).toBeDefined()
				expect(data[0].url).toBeDefined()
			}
		})
	})

	describe('getAnimeStreaming', () => {
		it('should get anime streaming links', async () => {
			const { data } = await client.getAnimeStreaming(1)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
		})
	})

	describe('searchAnime', () => {
		it('should search anime without filters', async () => {
			const response = await client.searchAnime({ q: 'naruto', limit: 5 })
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
			expect(response.data.length).toBeLessThanOrEqual(5)
			expect(response.pagination).toBeDefined()
		})

		it('should search anime with score filter', async () => {
			const params: AnimeSearchParams = {
				q: 'naruto',
				min_score: 8,
				limit: 3
			}
			const response = await client.searchAnime(params)
			expect(response.data).toBeDefined()
			expect(response.data.length).toBeLessThanOrEqual(3)
			for (const anime of response.data) {
				if (anime.score !== null) {
					expect(anime.score).toBeGreaterThanOrEqual(8)
				}
			}
		})

		it('should search anime with type filter', async () => {
			const params: AnimeSearchParams = {
				type: 'TV',
				limit: 3
			}
			const response = await client.searchAnime(params)
			expect(response.data).toBeDefined()
			expect(response.data.length).toBeLessThanOrEqual(3)
			for (const anime of response.data) {
				expect(anime.type).toBe('TV')
			}
		})

		it('should search anime with status filter', async () => {
			const params: AnimeSearchParams = {
				status: 'complete',
				limit: 3
			}
			const response = await client.searchAnime(params)
			expect(response.data).toBeDefined()
			expect(response.data.length).toBeLessThanOrEqual(3)
			for (const anime of response.data) {
				expect(anime.status).toBe('Finished Airing')
			}
		})

		it('should search anime with order_by and sort', async () => {
			const params: AnimeSearchParams = {
				order_by: 'score',
				sort: 'desc',
				limit: 3
			}
			const response = await client.searchAnime(params)
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

		it('should search anime with pagination', async () => {
			const page1 = await client.searchAnime({ q: 'naruto', page: 1, limit: 3 })
			const page2 = await client.searchAnime({ q: 'naruto', page: 2, limit: 3 })

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

		it('should search anime with sfw filter', async () => {
			const params: AnimeSearchParams = {
				sfw: true,
				limit: 3
			}
			const response = await client.searchAnime(params)
			expect(response.data).toBeDefined()
			expect(response.data.length).toBeLessThanOrEqual(3)
		})
	})

	describe('error handling', () => {
		it('should throw error for non-existent anime id', async () => {
			try {
				await client.getAnimeById(999999999)
				expect(true).toBe(false) // Should not reach here
			} catch (error: any) {
				expect(error).toBeDefined()
				expect(error.response?.status).toBe(404)
			}
		})
	})
})
