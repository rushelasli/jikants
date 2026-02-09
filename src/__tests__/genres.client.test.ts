import { beforeAll, beforeEach, describe, expect, it } from 'bun:test'
import { GenresClient } from '../clients/genres.client'
import type { GenreFilter } from '../models'

describe('GenresClient', () => {
	let client: GenresClient

	beforeAll(() => {
		client = new GenresClient()
	})

	// Prevent rate-limit errors. See: https://docs.api.jikan.moe/#section/Information/Rate-Limiting
	// Jikan allows 3 requests per second, 60 per minute
	beforeEach(async () => {
		await new Promise(resolve => setTimeout(resolve, 1000))
	})

	it('should be instantiated correctly', () => {
		expect(client).toBeDefined()
		expect(client).toBeInstanceOf(GenresClient)
	})

	describe('getAnimeGenres', () => {
		it('should get anime genres without filter', async () => {
			const { data } = await client.getAnimeGenres()
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

		it('should get anime genres with genres filter', async () => {
			const filter: GenreFilter = 'genres'
			const { data } = await client.getAnimeGenres(filter)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
			expect(data.length).toBeGreaterThan(0)
		})

		it('should get anime explicit_genres filter', async () => {
			const filter: GenreFilter = 'explicit_genres'
			const { data } = await client.getAnimeGenres(filter)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
		})

		it('should get anime themes filter', async () => {
			const filter: GenreFilter = 'themes'
			const { data } = await client.getAnimeGenres(filter)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
			expect(data.length).toBeGreaterThan(0)
		})

		it('should get anime demographics filter', async () => {
			const filter: GenreFilter = 'demographics'
			const { data } = await client.getAnimeGenres(filter)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
			expect(data.length).toBeGreaterThan(0)
		})
	})

	describe('getMangaGenres', () => {
		it('should get manga genres without filter', async () => {
			const { data } = await client.getMangaGenres()
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

		it('should get manga genres with genres filter', async () => {
			const filter: GenreFilter = 'genres'
			const { data } = await client.getMangaGenres(filter)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
			expect(data.length).toBeGreaterThan(0)
		})

		it('should get manga explicit_genres filter', async () => {
			const filter: GenreFilter = 'explicit_genres'
			const { data } = await client.getMangaGenres(filter)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
		})

		it('should get manga themes filter', async () => {
			const filter: GenreFilter = 'themes'
			const { data } = await client.getMangaGenres(filter)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
			expect(data.length).toBeGreaterThan(0)
		})

		it('should get manga demographics filter', async () => {
			const filter: GenreFilter = 'demographics'
			const { data } = await client.getMangaGenres(filter)
			expect(data).toBeDefined()
			expect(Array.isArray(data)).toBe(true)
			expect(data.length).toBeGreaterThan(0)
		})
	})
})
