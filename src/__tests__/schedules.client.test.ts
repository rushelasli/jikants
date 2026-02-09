import { beforeAll, beforeEach, describe, expect, it } from 'bun:test'
import { SchedulesClient } from '../clients/schedules.client'
import type { ScheduleParams } from '../models'

describe('SchedulesClient', () => {
	let client: SchedulesClient

	beforeAll(() => {
		client = new SchedulesClient()
	})

	// Prevent rate-limit errors. See: https://docs.api.jikan.moe/#section/Information/Rate-Limiting
	// Jikan allows 3 requests per second, 60 per minute
	beforeEach(async () => {
		await new Promise(resolve => setTimeout(resolve, 1000))
	})

	it('should be instantiated correctly', () => {
		expect(client).toBeDefined()
		expect(client).toBeInstanceOf(SchedulesClient)
	})

	describe('getSchedules', () => {
		it('should get weekly schedule without parameters', async () => {
			const { data } = await client.getSchedules()
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
			expect(data.length).toBeGreaterThan(0)
			if (data.length > 0) {
				expect(data[0].mal_id).toBeDefined()
				expect(data[0].title).toBeDefined()
				expect(data[0].url).toBeDefined()
				expect(data[0].images).toBeDefined()
				expect(data[0].type).toBeDefined()
			}
		})

		it('should get schedule filtered by day', async () => {
			const params: ScheduleParams = {
				filter: 'monday'
			}
			const { data } = await client.getSchedules(params)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
		})

		it('should get schedule for each day of the week', async () => {
			const days = [
				'monday',
				'tuesday',
				'wednesday',
				'thursday',
				'friday',
				'saturday',
				'sunday'
			] as const

			for (const day of days) {
				const params: ScheduleParams = { filter: day }
				const { data } = await client.getSchedules(params)
				expect(data).toBeDefined()
				expect(Array.isArray(data)).toBe(true)

				// Wait to respect rate limits
				await new Promise(resolve => setTimeout(resolve, 1000))
			}
		}, 15000)

		it('should get schedule with sfw filter', async () => {
			const params: ScheduleParams = {
				sfw: true
			}
			const { data } = await client.getSchedules(params)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
		})

		it('should get schedule with kids filter', async () => {
			const params: ScheduleParams = {
				kids: false
			}
			const { data } = await client.getSchedules(params)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
		})

		it('should get schedule with pagination', async () => {
			const params: ScheduleParams = {
				page: 1,
				limit: 10
			}
			const { data } = await client.getSchedules(params)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
			expect(data.length).toBeLessThanOrEqual(10)
		})

		it('should get schedule with unapproved entries', async () => {
			const params: ScheduleParams = {
				unapproved: true
			}
			const { data } = await client.getSchedules(params)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
		})

		it('should get schedule for unknown/other day', async () => {
			const params: ScheduleParams = {
				filter: 'unknown'
			}
			const { data } = await client.getSchedules(params)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
		})

		it('should validate schedule anime structure', async () => {
			const { data } = await client.getSchedules({ limit: 5 })
			if (data.length > 0) {
				const anime = data[0]
				expect(anime.mal_id).toBeDefined()
				expect(anime.title).toBeDefined()
				expect(anime.url).toBeDefined()
				expect(anime.images).toBeDefined()
				expect(anime.type).toBeDefined()
				expect(anime.episodes).toBeDefined()
				expect(anime.status).toBeDefined()
				expect(anime.airing).toBeDefined()
			}
		})

		it('should get schedule with combined filters', async () => {
			const params: ScheduleParams = {
				filter: 'monday',
				sfw: true,
				page: 1,
				limit: 5
			}
			const { data } = await client.getSchedules(params)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
		})
	})
})
