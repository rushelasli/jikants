import { beforeAll, beforeEach, describe, expect, it } from 'bun:test'
import { CharactersClient } from '../clients/characters.client'
import type { CharacterSearchParams } from '../models'

describe('test Characters Client', () => {
	let client: CharactersClient

	beforeAll(() => {
		client = new CharactersClient()
	})

	// Prevent rate-limit errors. See: https://docs.api.jikan.moe/#section/Information/Rate-Limiting
	beforeEach(async () => {
		await new Promise(resolve => setTimeout(resolve, 1000))
	})

	it('should be instantiated correctly', () => {
		expect(client).toBeDefined()
	})

	it('should get a full character by its id', async () => {
		const { data } = await client.getCharacterFullById(1)
		expect(data.mal_id).toBe(1)
	})

	it('should get a character by its id', async () => {
		const { data } = await client.getCharacterById(1)
		expect(data.mal_id).toBe(1)
	})

	it('should get character anime appearances', async () => {
		const { data } = await client.getCharacterAnime(1)
		expect(data.length).toBeGreaterThanOrEqual(0)
	})

	it('should get character manga appearances', async () => {
		const { data } = await client.getCharacterManga(1)
		expect(data.length).toBeGreaterThanOrEqual(0)
	})

	it('should get character voice actors', async () => {
		const { data } = await client.getCharacterVoiceActors(1)
		expect(data.length).toBeGreaterThanOrEqual(0)
	})

	it('should get character pictures', async () => {
		const { data } = await client.getCharacterPictures(1)
		expect(data.length).toBeGreaterThanOrEqual(0)
	})

	it('should get characters filtered by params', async () => {
		const params: CharacterSearchParams = { limit: 3, order_by: 'favorites' }
		const { data } = await client.getCharacterSearch(params)
		expect(data).toHaveLength(3)
	})
})
