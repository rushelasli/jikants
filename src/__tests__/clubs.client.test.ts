import { beforeAll, beforeEach, describe, expect, it } from 'bun:test'
import { ClubsClient } from '../clients/clubs.client'
import type { ClubSearchParams } from '../models'

describe('ClubsClient', () => {
	let client: ClubsClient

	beforeAll(() => {
		client = new ClubsClient()
	})

	// Prevent rate-limit errors. See: https://docs.api.jikan.moe/#section/Information/Rate-Limiting
	// Jikan allows 3 requests per second, 60 per minute
	beforeEach(async () => {
		await new Promise(resolve => setTimeout(resolve, 1000))
	})

	it('should be instantiated correctly', () => {
		expect(client).toBeDefined()
		expect(client).toBeInstanceOf(ClubsClient)
	})

	describe('getClubsById', () => {
		it('should get club by id', async () => {
			const { data } = await client.getClubsById(1)
			expect(data.mal_id).toBe(1)
			expect(data.name).toBeDefined()
			expect(data.url).toBeDefined()
			expect(data.images).toBeDefined()
			expect(data.members).toBeDefined()
			expect(data.category).toBeDefined()
			expect(data.created).toBeDefined()
			expect(data.access).toBeDefined()
		})
	})

	describe('getClubMembers', () => {
		it('should get club members without pagination params', async () => {
			const response = await client.getClubMembers(1)
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
			expect(response.pagination).toBeDefined()
		})

		it('should get club members with pagination', async () => {
			const response = await client.getClubMembers(1, { page: 1 })
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
			expect(response.pagination).toBeDefined()
			expect(response.pagination.has_next_page).toBeDefined()
			if (response.data.length > 0) {
				expect(response.data[0].username).toBeDefined()
				expect(response.data[0].url).toBeDefined()
				expect(response.data[0].images).toBeDefined()
			}
		})

		it('should get second page of club members', async () => {
			const response = await client.getClubMembers(1, { page: 2 })
			expect(response.data).toBeDefined()
			expect(response.pagination).toBeDefined()
		})
	})

	describe('getClubStaff', () => {
		it('should get club staff', async () => {
			const { data } = await client.getClubStaff(1)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
			if (data.length > 0) {
				expect(data[0].username).toBeDefined()
				expect(data[0].url).toBeDefined()
			}
		})
	})

	describe('getClubRelations', () => {
		it('should get club relations', async () => {
			const { data } = await client.getClubRelations(1)
			expect(data).toBeDefined()
			expect(data.anime).toBeDefined()
			expect(data.manga).toBeDefined()
			expect(data.characters).toBeDefined()
			expect(Array.isArray(data.anime)).toBe(true)
			expect(Array.isArray(data.manga)).toBe(true)
			expect(Array.isArray(data.characters)).toBe(true)
		})
	})

	describe('getClubSearch', () => {
		it('should search clubs without parameters', async () => {
			const response = await client.getClubSearch()
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
			expect(response.pagination).toBeDefined()
		})

		it('should search clubs with query', async () => {
			const params: ClubSearchParams = {
				q: 'anime',
				page: 1,
				limit: 10
			}
			const response = await client.getClubSearch(params)
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
			expect(response.data.length).toBeGreaterThan(0)
			expect(response.pagination).toBeDefined()
		})

		it('should search clubs with type filter', async () => {
			const params: ClubSearchParams = {
				type: 'public',
				limit: 10
			}
			const response = await client.getClubSearch(params)
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
			if (response.data.length > 0) {
				expect(response.data[0].access).toBe('public')
			}
		})

		it('should search clubs with category filter', async () => {
			const params: ClubSearchParams = {
				category: 'anime',
				limit: 10
			}
			const response = await client.getClubSearch(params)
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
			expect(response.pagination).toBeDefined()
		})

		it('should search clubs with order by', async () => {
			const params: ClubSearchParams = {
				order_by: 'members_count',
				sort: 'desc',
				limit: 5
			}
			const response = await client.getClubSearch(params)
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
			expect(response.pagination).toBeDefined()
		})

		it('should search clubs starting with letter', async () => {
			const params: ClubSearchParams = {
				letter: 'A',
				limit: 10
			}
			const response = await client.getClubSearch(params)
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
			if (response.data.length > 0) {
				expect(response.data[0].name).toBeDefined()
			}
		})
	})
})
