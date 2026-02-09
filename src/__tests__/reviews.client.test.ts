import { beforeAll, beforeEach, describe, expect, it } from 'bun:test'
import { ReviewsClient } from '../clients/reviews.client'
import type { ReviewParams } from '../models'

describe('ReviewsClient', () => {
	let client: ReviewsClient

	beforeAll(() => {
		client = new ReviewsClient()
	})

	// Prevent rate-limit errors. See: https://docs.api.jikan.moe/#section/Information/Rate-Limiting
	// Jikan allows 3 requests per second, 60 per minute
	beforeEach(async () => {
		await new Promise(resolve => setTimeout(resolve, 1000))
	})

	it('should be instantiated correctly', () => {
		expect(client).toBeDefined()
		expect(client).toBeInstanceOf(ReviewsClient)
	})

	describe('getRecentAnimeReviews', () => {
		it('should get recent anime reviews without parameters', async () => {
			const { data } = await client.getRecentAnimeReviews()
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
			expect(data.length).toBeGreaterThan(0)
			if (data.length > 0) {
				expect(data[0].mal_id).toBeDefined()
				expect(data[0].url).toBeDefined()
				expect(data[0].type).toBeDefined()
				expect(data[0].reactions).toBeDefined()
				expect(data[0].date).toBeDefined()
				expect(data[0].review).toBeDefined()
				expect(data[0].score).toBeDefined()
			}
		})

		it('should get recent anime reviews with page', async () => {
			const params: ReviewParams = {
				page: 1
			}
			const { data } = await client.getRecentAnimeReviews(params)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
			expect(data.length).toBeGreaterThan(0)
		})

		it('should get recent anime reviews with preliminary flag', async () => {
			const params: ReviewParams = {
				page: 1,
				preliminary: true
			}
			const { data } = await client.getRecentAnimeReviews(params)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
		})

		it('should get recent anime reviews with spoilers flag', async () => {
			const params: ReviewParams = {
				page: 1,
				spoilers: true
			}
			const { data } = await client.getRecentAnimeReviews(params)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
		})

		it('should get recent anime reviews excluding preliminary', async () => {
			const params: ReviewParams = {
				page: 1,
				preliminary: false
			}
			const { data } = await client.getRecentAnimeReviews(params)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
			if (data.length > 0) {
				expect(data[0].is_preliminary).toBeDefined()
			}
		})

		it('should validate anime review structure', async () => {
			const { data } = await client.getRecentAnimeReviews({ page: 1 })
			if (data.length > 0) {
				const review = data[0]
				expect(review.reactions.overall).toBeDefined()
				expect(review.reactions.nice).toBeDefined()
				expect(review.reactions.love_it).toBeDefined()
				expect(review.reactions.funny).toBeDefined()
				expect(review.reactions.confusing).toBeDefined()
				expect(review.reactions.informative).toBeDefined()
				expect(review.reactions.well_written).toBeDefined()
				expect(review.reactions.creative).toBeDefined()
				expect(Array.isArray(review.tags)).toBe(true)
				expect(typeof review.is_spoiler).toBe('boolean')
				expect(typeof review.is_preliminary).toBe('boolean')
			}
		})
	})

	describe('getRecentMangaReviews', () => {
		it('should get recent manga reviews without parameters', async () => {
			const { data } = await client.getRecentMangaReviews()
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
			expect(data.length).toBeGreaterThan(0)
			if (data.length > 0) {
				expect(data[0].mal_id).toBeDefined()
				expect(data[0].url).toBeDefined()
				expect(data[0].type).toBeDefined()
				expect(data[0].reactions).toBeDefined()
				expect(data[0].date).toBeDefined()
				expect(data[0].review).toBeDefined()
				expect(data[0].score).toBeDefined()
			}
		})

		it('should get recent manga reviews with page', async () => {
			const params: ReviewParams = {
				page: 1
			}
			const { data } = await client.getRecentMangaReviews(params)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
			expect(data.length).toBeGreaterThan(0)
		})

		it('should get recent manga reviews with preliminary flag', async () => {
			const params: ReviewParams = {
				page: 1,
				preliminary: true
			}
			const { data } = await client.getRecentMangaReviews(params)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
		})

		it('should get recent manga reviews with spoilers flag', async () => {
			const params: ReviewParams = {
				page: 1,
				spoilers: true
			}
			const { data } = await client.getRecentMangaReviews(params)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
		})

		it('should get recent manga reviews excluding preliminary', async () => {
			const params: ReviewParams = {
				page: 1,
				preliminary: false
			}
			const { data } = await client.getRecentMangaReviews(params)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
			if (data.length > 0) {
				expect(data[0].is_preliminary).toBeDefined()
			}
		})

		it('should validate manga review structure', async () => {
			const { data } = await client.getRecentMangaReviews({ page: 1 })
			if (data.length > 0) {
				const review = data[0]
				expect(review.reactions.overall).toBeDefined()
				expect(review.reactions.nice).toBeDefined()
				expect(review.reactions.love_it).toBeDefined()
				expect(review.reactions.funny).toBeDefined()
				expect(review.reactions.confusing).toBeDefined()
				expect(review.reactions.informative).toBeDefined()
				expect(review.reactions.well_written).toBeDefined()
				expect(review.reactions.creative).toBeDefined()
				expect(Array.isArray(review.tags)).toBe(true)
				expect(typeof review.is_spoiler).toBe('boolean')
				expect(typeof review.is_preliminary).toBe('boolean')
			}
		})

		it('should get second page of manga reviews', async () => {
			const params: ReviewParams = {
				page: 2
			}
			const { data } = await client.getRecentMangaReviews(params)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
		})
	})
})
