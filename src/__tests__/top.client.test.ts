import { beforeAll, beforeEach, describe, expect, it } from 'bun:test'
import { TopClient } from '../clients/top.client'
import type { TopAnimeParams, TopMangaParams } from '../models'

describe('test Top Client', () => {
	let client: TopClient

	beforeAll(() => {
		client = new TopClient()
	})

	// Prevent rate-limit errors. See: https://docs.api.jikan.moe/#section/Information/Rate-Limiting
	beforeEach(async () => {
		await new Promise(resolve => setTimeout(resolve, 1000))
	})

	it('should be instantiated correctly', () => {
		expect(client).toBeDefined()
	})

	it('should get top animes filtered by params', async () => {
		const params: TopAnimeParams = { limit: 3, filter: 'airing' }
		const { data } = await client.getTopAnime(params)

		expect(data).toHaveLength(3)
		for (const anime of data) {
			expect(anime.status).toBe('Currently Airing')
		}
	})

	it('should get top mangas filtered by params', async () => {
		const params: TopMangaParams = { limit: 3, filter: 'publishing' }
		const { data } = await client.getTopManga(params)

		expect(data).toHaveLength(3)
		for (const manga of data) {
			expect(manga.status).toBe('Publishing')
		}
	})

	it('should get top characters', async () => {
		const { data } = await client.getTopCharacters({ limit: 3 })
		expect(data).toHaveLength(3)
	})

	it('should get top people', async () => {
		const { data } = await client.getTopPeople({ limit: 3 })
		expect(data).toHaveLength(3)
	})
})
