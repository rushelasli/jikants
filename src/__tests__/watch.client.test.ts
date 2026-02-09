import { beforeAll, beforeEach, describe, expect, it } from 'bun:test'
import { WatchClient } from '../clients/watch.client'
import type { WatchPromosParams } from '../models'

describe('WatchClient', () => {
	let client: WatchClient

	beforeAll(() => {
		client = new WatchClient()
	})

	// Prevent rate-limit errors. See: https://docs.api.jikan.moe/#section/Information/Rate-Limiting
	// Jikan allows 3 requests per second, 60 per minute
	beforeEach(async () => {
		await new Promise(resolve => setTimeout(resolve, 1000))
	})

	it('should be instantiated correctly', () => {
		expect(client).toBeDefined()
		expect(client).toBeInstanceOf(WatchClient)
	})

	describe('getWatchRecentEpisodes', () => {
		it('should get recently added episodes', async () => {
			const { data } = await client.getWatchRecentEpisodes()
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
			expect(data.length).toBeGreaterThan(0)
			if (data.length > 0) {
				expect(data[0].entry).toBeDefined()
				expect(data[0].entry.mal_id).toBeDefined()
				expect(data[0].entry.title).toBeDefined()
				expect(data[0].entry.url).toBeDefined()
				expect(data[0].entry.images).toBeDefined()
				expect(data[0].episodes).toBeDefined()
				expect(Array.isArray(data[0].episodes)).toBe(true)
				expect(data[0].region_locked).toBeDefined()
				expect(typeof data[0].region_locked).toBe('boolean')
			}
		})

		it('should validate recent episodes structure', async () => {
			const { data } = await client.getWatchRecentEpisodes()
			if (data.length > 0) {
				const item = data[0]
				expect(item.entry.mal_id).toBeDefined()
				expect(item.entry.title).toBeDefined()
				expect(item.entry.images).toBeDefined()

				if (item.episodes.length > 0) {
					const episode = item.episodes[0]
					expect(episode.mal_id).toBeDefined()
					expect(episode.url).toBeDefined()
					expect(episode.title).toBeDefined()
					expect(episode.premium).toBeDefined()
					expect(typeof episode.premium).toBe('boolean')
				}
			}
		})

		it('should return max 2 episodes per entry', async () => {
			const { data } = await client.getWatchRecentEpisodes()
			if (data.length > 0) {
				data.forEach(item => {
					expect(item.episodes.length).toBeLessThanOrEqual(2)
				})
			}
		})
	})

	describe('getWatchPopularEpisodes', () => {
		it('should get popular episodes', async () => {
			const { data } = await client.getWatchPopularEpisodes()
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
			expect(data.length).toBeGreaterThan(0)
			if (data.length > 0) {
				expect(data[0].entry).toBeDefined()
				expect(data[0].entry.mal_id).toBeDefined()
				expect(data[0].entry.title).toBeDefined()
				expect(data[0].entry.url).toBeDefined()
				expect(data[0].entry.images).toBeDefined()
				expect(data[0].episodes).toBeDefined()
				expect(Array.isArray(data[0].episodes)).toBe(true)
				expect(data[0].region_locked).toBeDefined()
			}
		})

		it('should validate popular episodes structure', async () => {
			const { data } = await client.getWatchPopularEpisodes()
			if (data.length > 0) {
				const item = data[0]
				expect(item.entry.mal_id).toBeDefined()
				expect(item.entry.title).toBeDefined()
				expect(item.entry.images).toBeDefined()

				if (item.episodes.length > 0) {
					const episode = item.episodes[0]
					expect(episode.mal_id).toBeDefined()
					expect(episode.url).toBeDefined()
					expect(episode.title).toBeDefined()
					expect(episode.premium).toBeDefined()
				}
			}
		})

		it('should return max 2 episodes per entry', async () => {
			const { data } = await client.getWatchPopularEpisodes()
			if (data.length > 0) {
				data.forEach(item => {
					expect(item.episodes.length).toBeLessThanOrEqual(2)
				})
			}
		})
	})

	describe('getWatchRecentPromos', () => {
		it('should get recent promotional videos without parameters', async () => {
			const response = await client.getWatchRecentPromos()
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
			expect(response.pagination).toBeDefined()
			expect(response.data.length).toBeGreaterThan(0)
			if (response.data.length > 0) {
				expect(response.data[0].title).toBeDefined()
				expect(response.data[0].entry).toBeDefined()
				expect(response.data[0].entry.mal_id).toBeDefined()
				expect(response.data[0].entry.title).toBeDefined()
				expect(response.data[0].entry.url).toBeDefined()
				expect(response.data[0].trailer).toBeDefined()
			}
		})

		it('should get recent promos with page parameter', async () => {
			const params: WatchPromosParams = {
				page: 1
			}
			const response = await client.getWatchRecentPromos(params)
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
			expect(response.pagination).toBeDefined()
		})

		it('should get second page of recent promos', async () => {
			const params: WatchPromosParams = {
				page: 2
			}
			const response = await client.getWatchRecentPromos(params)
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
			expect(response.pagination).toBeDefined()
		})

		it('should validate recent promo structure', async () => {
			const response = await client.getWatchRecentPromos({ page: 1 })
			if (response.data.length > 0) {
				const promo = response.data[0]
				expect(promo.title).toBeDefined()
				expect(promo.entry).toBeDefined()
				expect(promo.entry.mal_id).toBeDefined()
				expect(promo.entry.title).toBeDefined()
				expect(promo.entry.images).toBeDefined()
				expect(promo.trailer).toBeDefined()
				expect(promo.trailer.youtube_id).toBeDefined()
				expect(promo.trailer.url).toBeDefined()
				expect(promo.trailer.embed_url).toBeDefined()
			}
		})
	})

	describe('getWatchPopularPromos', () => {
		it('should get popular promotional videos', async () => {
			const { data } = await client.getWatchPopularPromos()
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
			expect(data.length).toBeGreaterThan(0)
			if (data.length > 0) {
				expect(data[0].title).toBeDefined()
				expect(data[0].entry).toBeDefined()
				expect(data[0].entry.mal_id).toBeDefined()
				expect(data[0].entry.title).toBeDefined()
				expect(data[0].entry.url).toBeDefined()
				expect(data[0].trailer).toBeDefined()
			}
		})

		it('should validate popular promo structure', async () => {
			const { data } = await client.getWatchPopularPromos()
			if (data.length > 0) {
				const promo = data[0]
				expect(promo.title).toBeDefined()
				expect(promo.entry).toBeDefined()
				expect(promo.entry.mal_id).toBeDefined()
				expect(promo.entry.title).toBeDefined()
				expect(promo.entry.images).toBeDefined()
				expect(promo.trailer).toBeDefined()
				expect(promo.trailer.youtube_id).toBeDefined()
				expect(promo.trailer.url).toBeDefined()
				expect(promo.trailer.embed_url).toBeDefined()
			}
		})

		it('should validate trailer images', async () => {
			const { data } = await client.getWatchPopularPromos()
			if (data.length > 0) {
				const promo = data[0]
				if (promo.trailer.images) {
					expect(promo.trailer.images.image_url).toBeDefined()
					expect(promo.trailer.images.small_image_url).toBeDefined()
					expect(promo.trailer.images.medium_image_url).toBeDefined()
					expect(promo.trailer.images.large_image_url).toBeDefined()
					expect(promo.trailer.images.maximum_image_url).toBeDefined()
				}
			}
		})
	})
})
