import { beforeAll, beforeEach, describe, expect, it } from 'bun:test'
import { RandomClient } from '../clients/random.client'

describe('RandomClient', () => {
	let client: RandomClient

	beforeAll(() => {
		client = new RandomClient()
	})

	// Prevent rate-limit errors. See: https://docs.api.jikan.moe/#section/Information/Rate-Limiting
	// Jikan allows 3 requests per second, 60 per minute
	beforeEach(async () => {
		await new Promise(resolve => setTimeout(resolve, 1000))
	})

	it('should be instantiated correctly', () => {
		expect(client).toBeDefined()
		expect(client).toBeInstanceOf(RandomClient)
	})

	describe('getRandomAnime', () => {
		it('should get random anime', async () => {
			const { data } = await client.getRandomAnime()
			expect(data).toBeDefined()
			expect(data.mal_id).toBeDefined()
			expect(data.title).toBeDefined()
			expect(data.type).toBeDefined()
			expect(data.url).toBeDefined()
			expect(data.images).toBeDefined()
		})
	})

	describe('getRandomManga', () => {
		it('should get random manga', async () => {
			const { data } = await client.getRandomManga()
			expect(data).toBeDefined()
			expect(data.mal_id).toBeDefined()
			expect(data.title).toBeDefined()
			expect(data.type).toBeDefined()
			expect(data.url).toBeDefined()
			expect(data.images).toBeDefined()
		})
	})

	describe('getRandomCharacters', () => {
		it('should get random character', async () => {
			const { data } = await client.getRandomCharacters()
			expect(data).toBeDefined()
			expect(data.mal_id).toBeDefined()
			expect(data.name).toBeDefined()
			expect(data.url).toBeDefined()
			expect(data.images).toBeDefined()
		})
	})

	describe('getRandomPeople', () => {
		it('should get random person', async () => {
			const { data } = await client.getRandomPeople()
			expect(data).toBeDefined()
			expect(data.mal_id).toBeDefined()
			expect(data.name).toBeDefined()
			expect(data.url).toBeDefined()
			expect(data.images).toBeDefined()
		})
	})

	describe('getRandomUsers', () => {
		it('should get random user', async () => {
			const { data } = await client.getRandomUsers()
			expect(data).toBeDefined()
			expect(data.username).toBeDefined()
			expect(data.url).toBeDefined()
			expect(data.images).toBeDefined()
		})
	})
})
