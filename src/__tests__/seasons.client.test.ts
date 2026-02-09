import { beforeAll, beforeEach, describe, expect, it } from 'bun:test'
import { SeasonsClient } from '../clients/seasons.client'
import type { AnimeSeason, SeasonParams } from '../models'

describe('SeasonsClient', () => {
	let client: SeasonsClient

	beforeAll(() => {
		client = new SeasonsClient()
	})

	// Prevent rate-limit errors. See: https://docs.api.jikan.moe/#section/Information/Rate-Limiting
	// Jikan allows 3 requests per second, 60 per minute
	beforeEach(async () => {
		await new Promise(resolve => setTimeout(resolve, 1000))
	})

	it('should be instantiated correctly', () => {
		expect(client).toBeDefined()
		expect(client).toBeInstanceOf(SeasonsClient)
	})

	describe('getSeason', () => {
		it('should get seasonal anime by year and season', async () => {
			const response = await client.getSeason(2023, 'fall')
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
			expect(response.data.length).toBeGreaterThan(0)
			expect(response.pagination).toBeDefined()
		})

		it('should get seasonal anime for all four seasons', async () => {
			const seasons: AnimeSeason[] = ['winter', 'spring', 'summer', 'fall']

			for (const season of seasons) {
				const response = await client.getSeason(2023, season)
				expect(response.data).toBeDefined()
				expect(Array.isArray(response.data)).toBe(true)
				expect(response.pagination).toBeDefined()

				// Wait to respect rate limits
				await new Promise(resolve => setTimeout(resolve, 1000))
			}
		}, 10000)

		it('should get seasonal anime with pagination', async () => {
			const params: SeasonParams = {
				page: 1,
				limit: 10
			}
			const response = await client.getSeason(2023, 'fall', params)
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
			expect(response.data.length).toBeLessThanOrEqual(10)
			expect(response.pagination).toBeDefined()
		})

		it('should get seasonal anime with filter', async () => {
			const params: SeasonParams = {
				filter: 'tv'
			}
			const response = await client.getSeason(2023, 'fall', params)
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
			if (response.data.length > 0) {
				expect(response.data[0].type).toBe('TV')
			}
		})

		it('should get seasonal anime with sfw filter', async () => {
			const params: SeasonParams = {
				sfw: true
			}
			const response = await client.getSeason(2023, 'fall', params)
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
		})

		it('should get seasonal anime with continuing flag', async () => {
			const params: SeasonParams = {
				continuing: true
			}
			const response = await client.getSeason(2023, 'fall', params)
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
		})

		it('should validate seasonal anime structure', async () => {
			const response = await client.getSeason(2023, 'fall', { limit: 5 })
			if (response.data.length > 0) {
				const anime = response.data[0]
				expect(anime.mal_id).toBeDefined()
				expect(anime.title).toBeDefined()
				expect(anime.url).toBeDefined()
				expect(anime.images).toBeDefined()
				expect(anime.type).toBeDefined()
				expect(anime.season).toBeDefined()
				expect(anime.year).toBeDefined()
			}
		})
	})

	describe('getSeasonNow', () => {
		it('should get current seasonal anime', async () => {
			const response = await client.getSeasonNow()
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
			expect(response.data.length).toBeGreaterThan(0)
			expect(response.pagination).toBeDefined()
		})

		it('should get current seasonal anime with pagination', async () => {
			const params: SeasonParams = {
				page: 1,
				limit: 10
			}
			const response = await client.getSeasonNow(params)
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
			expect(response.data.length).toBeLessThanOrEqual(10)
		})

		it('should get current seasonal anime with filter', async () => {
			const params: SeasonParams = {
				filter: 'tv'
			}
			const response = await client.getSeasonNow(params)
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
		})

		it('should get current seasonal anime with sfw filter', async () => {
			const params: SeasonParams = {
				sfw: true
			}
			const response = await client.getSeasonNow(params)
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
		})

		it('should validate current season anime structure', async () => {
			const response = await client.getSeasonNow({ limit: 5 })
			if (response.data.length > 0) {
				const anime = response.data[0]
				expect(anime.mal_id).toBeDefined()
				expect(anime.title).toBeDefined()
				expect(anime.season).toBeDefined()
				expect(anime.year).toBeDefined()
			}
		})
	})

	describe('getSeasonsList', () => {
		it('should get available list of seasons', async () => {
			const { data } = await client.getSeasonsList()
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
			expect(data.length).toBeGreaterThan(0)
			if (data.length > 0) {
				expect(data[0].year).toBeDefined()
				expect(data[0].seasons).toBeDefined()
				expect(Array.isArray(data[0].seasons)).toBe(true)
				expect(data[0].seasons.length).toBeGreaterThan(0)
			}
		})

		it('should validate seasons list structure', async () => {
			const { data } = await client.getSeasonsList()
			if (data.length > 0) {
				const seasonYear = data[0]
				expect(typeof seasonYear.year).toBe('number')
				expect(Array.isArray(seasonYear.seasons)).toBe(true)
				seasonYear.seasons.forEach((season: string) => {
					expect(['winter', 'spring', 'summer', 'fall']).toContain(season)
				})
			}
		})
	})

	describe('getSeasonUpcoming', () => {
		it('should get upcoming seasonal anime', async () => {
			const response = await client.getSeasonUpcoming()
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
			expect(response.data.length).toBeGreaterThan(0)
			expect(response.pagination).toBeDefined()
		})

		it('should get upcoming seasonal anime with pagination', async () => {
			const params: SeasonParams = {
				page: 1,
				limit: 10
			}
			const response = await client.getSeasonUpcoming(params)
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
			expect(response.data.length).toBeLessThanOrEqual(10)
		})

		it('should get upcoming seasonal anime with filter', async () => {
			const params: SeasonParams = {
				filter: 'tv'
			}
			const response = await client.getSeasonUpcoming(params)
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
		})

		it('should get upcoming seasonal anime with sfw filter', async () => {
			const params: SeasonParams = {
				sfw: true
			}
			const response = await client.getSeasonUpcoming(params)
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
		})

		it('should validate upcoming anime structure', async () => {
			const response = await client.getSeasonUpcoming({ limit: 5 })
			if (response.data.length > 0) {
				const anime = response.data[0]
				expect(anime.mal_id).toBeDefined()
				expect(anime.title).toBeDefined()
				expect(anime.url).toBeDefined()
				expect(anime.images).toBeDefined()
				expect(anime.status).toBe('Not yet aired')
			}
		})

		it('should get upcoming anime with combined filters', async () => {
			const params: SeasonParams = {
				filter: 'tv',
				sfw: true,
				page: 1,
				limit: 5
			}
			const response = await client.getSeasonUpcoming(params)
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
		})
	})
})
