import { beforeAll, beforeEach, describe, expect, it } from 'bun:test'
import { MagazinesClient } from '../clients/magazines.client'
import type { MagazineSearchParams } from '../models'

describe('MagazinesClient', () => {
	let client: MagazinesClient

	beforeAll(() => {
		client = new MagazinesClient()
	})

	// Prevent rate-limit errors. See: https://docs.api.jikan.moe/#section/Information/Rate-Limiting
	// Jikan allows 3 requests per second, 60 per minute
	beforeEach(async () => {
		await new Promise(resolve => setTimeout(resolve, 1000))
	})

	it('should be instantiated correctly', () => {
		expect(client).toBeDefined()
		expect(client).toBeInstanceOf(MagazinesClient)
	})

	describe('getMagazines', () => {
		it('should get magazines without parameters', async () => {
			const { data } = await client.getMagazines()
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
			expect(data.length).toBeGreaterThan(0)
			if (data.length > 0) {
				expect(data[0].mal_id).toBeDefined()
				expect(data[0].name).toBeDefined()
				expect(data[0].url).toBeDefined()
				expect(data[0].count).toBeDefined()
			}
		})

		it('should get magazines with pagination', async () => {
			const params: MagazineSearchParams = {
				page: 1,
				limit: 10
			}
			const { data } = await client.getMagazines(params)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
			expect(data.length).toBeLessThanOrEqual(10)
		})

		it('should search magazines with query', async () => {
			const params: MagazineSearchParams = {
				q: 'Jump',
				limit: 10
			}
			const { data } = await client.getMagazines(params)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
		})

		it('should get magazines with order by', async () => {
			const params: MagazineSearchParams = {
				order_by: 'count',
				sort: 'desc',
				limit: 5
			}
			const { data } = await client.getMagazines(params)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
			expect(data.length).toBeLessThanOrEqual(5)
		})

		it('should get magazines starting with letter', async () => {
			const params: MagazineSearchParams = {
				letter: 'S',
				limit: 10
			}
			const { data } = await client.getMagazines(params)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
		})
	})
})
