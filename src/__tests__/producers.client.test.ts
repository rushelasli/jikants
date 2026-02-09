import { beforeAll, beforeEach, describe, expect, it } from 'bun:test'
import { ProducersClient } from '../clients/producers.client'
import type { ProducerSearchParams } from '../models'

describe('ProducersClient', () => {
	let client: ProducersClient

	beforeAll(() => {
		client = new ProducersClient()
	})

	// Prevent rate-limit errors. See: https://docs.api.jikan.moe/#section/Information/Rate-Limiting
	// Jikan allows 3 requests per second, 60 per minute
	beforeEach(async () => {
		await new Promise(resolve => setTimeout(resolve, 1000))
	})

	it('should be instantiated correctly', () => {
		expect(client).toBeDefined()
		expect(client).toBeInstanceOf(ProducersClient)
	})

	describe('getProducerById', () => {
		it('should get producer by id', async () => {
			const { data } = await client.getProducerById(1)
			expect(data.mal_id).toBe(1)
			expect(data.titles).toBeDefined()
			expect(data.images).toBeDefined()
			expect(data.favorites).toBeDefined()
			expect(data.count).toBeDefined()
			expect(data.url).toBeDefined()
		})
	})

	describe('getProducerFullById', () => {
		it('should get complete producer data by id', async () => {
			const { data } = await client.getProducerFullById(1)
			expect(data.mal_id).toBe(1)
			expect(data.titles).toBeDefined()
			expect(data.images).toBeDefined()
			expect(data.favorites).toBeDefined()
			expect(data.count).toBeDefined()
			expect(data.established).toBeDefined()
			expect(data.about).toBeDefined()
			expect(data.external).toBeDefined()
			expect(Array.isArray(data.external)).toBe(true)
		})
	})

	describe('getProducerExternal', () => {
		it('should get producer external links', async () => {
			const { data } = await client.getProducerExternal(1)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
			if (data.length > 0) {
				expect(data[0].name).toBeDefined()
				expect(data[0].url).toBeDefined()
			}
		})
	})

	describe('getProducersSearch', () => {
		it('should search producers without parameters', async () => {
			const response = await client.getProducersSearch()
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
			expect(response.pagination).toBeDefined()
		})

		it('should search producers with query', async () => {
			const params: ProducerSearchParams = {
				q: 'Kyoto',
				page: 1,
				limit: 10
			}
			const response = await client.getProducersSearch(params)
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
			expect(response.pagination).toBeDefined()
		})

		it('should search producers with order by count', async () => {
			const params: ProducerSearchParams = {
				order_by: 'count',
				sort: 'desc',
				limit: 5
			}
			const response = await client.getProducersSearch(params)
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
			expect(response.pagination).toBeDefined()
		})

		it('should search producers with order by favorites', async () => {
			const params: ProducerSearchParams = {
				order_by: 'favorites',
				sort: 'desc',
				limit: 5
			}
			const response = await client.getProducersSearch(params)
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
		})

		it('should search producers starting with letter', async () => {
			const params: ProducerSearchParams = {
				letter: 'A',
				limit: 10
			}
			const response = await client.getProducersSearch(params)
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
		})
	})
})
