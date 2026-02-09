import { beforeAll, beforeEach, describe, expect, it } from 'bun:test'
import { UsersClient } from '../clients/users.client'
import type { UserSearchParams } from '../models'

describe('UsersClient', () => {
	let client: UsersClient

	beforeAll(() => {
		client = new UsersClient()
	})

	// Prevent rate-limit errors. See: https://docs.api.jikan.moe/#section/Information/Rate-Limiting
	// Jikan allows 3 requests per second, 60 per minute
	beforeEach(async () => {
		await new Promise(resolve => setTimeout(resolve, 1000))
	})

	it('should be instantiated correctly', () => {
		expect(client).toBeDefined()
		expect(client).toBeInstanceOf(UsersClient)
	})

	describe('getUsersSearch', () => {
		it('should search users without parameters', async () => {
			const response = await client.getUsersSearch()
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
			expect(response.pagination).toBeDefined()
		})

		it('should search users with query', async () => {
			const params: UserSearchParams = {
				q: 'user',
				page: 1,
				limit: 10
			}
			const response = await client.getUsersSearch(params)
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
			expect(response.pagination).toBeDefined()
		})

		it('should search users with gender filter', async () => {
			const params: UserSearchParams = {
				gender: 'any',
				limit: 10
			}
			const response = await client.getUsersSearch(params)
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
		})

		it('should search users with location filter', async () => {
			const params: UserSearchParams = {
				location: 'Japan',
				limit: 10
			}
			const response = await client.getUsersSearch(params)
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
		})

		it('should search users with age range', async () => {
			const params: UserSearchParams = {
				minAge: 18,
				maxAge: 30,
				limit: 10
			}
			const response = await client.getUsersSearch(params)
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
		})
	})

	describe('getUserById', () => {
		it('should get user by ID', async () => {
			const { data } = await client.getUserById(1)
			expect(data.url).toBeDefined()
			expect(data.username).toBeDefined()
		})
	})

	describe('getUserFullProfile', () => {
		it('should get complete user profile', async () => {
			const { data } = await client.getUserFullProfile('Nekomata1037')
			expect(data.username).toBe('Nekomata1037')
			expect(data.url).toBeDefined()
			expect(data.images).toBeDefined()
			expect(data.statistics).toBeDefined()
			expect(data.statistics.anime).toBeDefined()
			expect(data.statistics.manga).toBeDefined()
			expect(data.external).toBeDefined()
		})
	})

	describe('getUserProfile', () => {
		it('should get user profile', async () => {
			const { data } = await client.getUserProfile('Nekomata1037')
			expect(data.username).toBe('Nekomata1037')
			expect(data.url).toBeDefined()
			expect(data.images).toBeDefined()
			expect(data.last_online).toBeDefined()
			expect(data.joined).toBeDefined()
		})
	})

	describe('getUserStatistics', () => {
		it('should get user statistics', async () => {
			const { data } = await client.getUserStatistics('Nekomata1037')
			expect(data.anime).toBeDefined()
			expect(data.manga).toBeDefined()
			expect(data.anime.days_watched).toBeDefined()
			expect(data.anime.mean_score).toBeDefined()
			expect(data.anime.watching).toBeDefined()
			expect(data.anime.completed).toBeDefined()
			expect(data.anime.on_hold).toBeDefined()
			expect(data.anime.dropped).toBeDefined()
			expect(data.anime.plan_to_watch).toBeDefined()
			expect(data.anime.total_entries).toBeDefined()
			expect(data.anime.episodes_watched).toBeDefined()
		})
	})

	describe('getUserFavorites', () => {
		it('should get user favorites', async () => {
			const { data } = await client.getUserFavorites('Nekomata1037')
			expect(data).toBeDefined()
			expect(data.anime).toBeDefined()
			expect(data.manga).toBeDefined()
			expect(data.characters).toBeDefined()
			expect(data.people).toBeDefined()
			expect(Array.isArray(data.anime)).toBe(true)
			expect(Array.isArray(data.manga)).toBe(true)
			expect(Array.isArray(data.characters)).toBe(true)
			expect(Array.isArray(data.people)).toBe(true)
		})
	})

	describe('getUserUpdates', () => {
		it('should get user updates', async () => {
			const { data } = await client.getUserUpdates('Nekomata1037')
			expect(data).toBeDefined()
			expect(data.anime).toBeDefined()
			expect(data.manga).toBeDefined()
			expect(Array.isArray(data.anime)).toBe(true)
			expect(Array.isArray(data.manga)).toBe(true)
		})
	})

	describe('getUserAbout', () => {
		it('should get user about', async () => {
			const { data } = await client.getUserAbout('Nekomata1037')
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
			if (data.length > 0) {
				expect(data[0].about).toBeDefined()
			}
		})
	})

	describe('getUserHistory', () => {
		it('should get user history without type', async () => {
			const { data } = await client.getUserHistory('Nekomata1037')
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
			if (data.length > 0) {
				expect(data[0].entry).toBeDefined()
				expect(data[0].increment).toBeDefined()
				expect(data[0].date).toBeDefined()
			}
		})

		it('should get user anime history', async () => {
			const { data } = await client.getUserHistory('Nekomata1037', 'anime')
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
		})

		it('should get user manga history', async () => {
			const { data } = await client.getUserHistory('Nekomata1037', 'manga')
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
		})
	})

	describe('getUserFriends', () => {
		it('should get user friends without page', async () => {
			const response = await client.getUserFriends('Nekomata1037')
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
			expect(response.pagination).toBeDefined()
		})

		it('should get user friends with page', async () => {
			const response = await client.getUserFriends('Nekomata1037', 1)
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
			if (response.data.length > 0) {
				expect(response.data[0].user).toBeDefined()
				expect(response.data[0].last_online).toBeDefined()
				expect(response.data[0].friends_since).toBeDefined()
			}
		})
	})

	describe('getUserReviews', () => {
		it('should get user reviews without page', async () => {
			const response = await client.getUserReviews('Nekomata1037')
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
			expect(response.pagination).toBeDefined()
		})

		it('should get user reviews with page', async () => {
			const response = await client.getUserReviews('Nekomata1037', 1)
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
			expect(response.pagination).toBeDefined()
		})
	})

	describe('getUserRecommendations', () => {
		it('should get user recommendations without page', async () => {
			const response = await client.getUserRecommendations('Nekomata1037')
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
			expect(response.pagination).toBeDefined()
		})

		it('should get user recommendations with page', async () => {
			const response = await client.getUserRecommendations('Nekomata1037', 1)
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
			expect(response.pagination).toBeDefined()
		})
	})

	describe('getUserClubs', () => {
		it('should get user clubs without page', async () => {
			const response = await client.getUserClubs('Nekomata1037')
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
			expect(response.pagination).toBeDefined()
		})

		it('should get user clubs with page', async () => {
			const response = await client.getUserClubs('Nekomata1037', 1)
			expect(response.data).toBeDefined()
			expect(Array.isArray(response.data)).toBe(true)
			if (response.data.length > 0) {
				expect(response.data[0].mal_id).toBeDefined()
				expect(response.data[0].name).toBeDefined()
				expect(response.data[0].url).toBeDefined()
			}
		})
	})

	describe('getUserExternal', () => {
		it('should get user external links', async () => {
			const { data } = await client.getUserExternal('Nekomata1037')
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
			if (data.length > 0) {
				expect(data[0].name).toBeDefined()
				expect(data[0].url).toBeDefined()
			}
		})
	})
})
