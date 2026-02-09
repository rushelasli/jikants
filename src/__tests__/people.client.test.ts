import { beforeAll, beforeEach, describe, expect, it } from 'bun:test'
import { PeopleClient } from '../clients/people.client'
import type { PeopleSearchParams } from '../models'

describe('test People Client', () => {
	let client: PeopleClient

	beforeAll(() => {
		client = new PeopleClient()
	})

	// Prevent rate-limit errors. See: https://docs.api.jikan.moe/#section/Information/Rate-Limiting
	beforeEach(async () => {
		await new Promise(resolve => setTimeout(resolve, 1000))
	})

	it('should be instantiated correctly', () => {
		expect(client).toBeDefined()
	})

	it('should get a full person by its id', async () => {
		const { data } = await client.getPersonFullById(1)
		expect(data.mal_id).toBe(1)
	})

	it('should get a person by its id', async () => {
		const { data } = await client.getPersonById(1)
		expect(data.mal_id).toBe(1)
	})

	it('should get person anime staff positions', async () => {
		const { data } = await client.getPersonAnime(1)
		expect(data.length).toBeGreaterThanOrEqual(0)
	})

	it('should get person voice acting roles', async () => {
		const { data } = await client.getPersonVoices(1)
		expect(data.length).toBeGreaterThanOrEqual(0)
	})

	it('should get person manga works', async () => {
		const { data } = await client.getPersonManga(1)
		expect(data.length).toBeGreaterThanOrEqual(0)
	})

	it('should get person pictures', async () => {
		const { data } = await client.getPersonPictures(1)
		expect(data.length).toBeGreaterThanOrEqual(0)
	})

	it('should get people filtered by params', async () => {
		const params: PeopleSearchParams = { limit: 3, order_by: 'favorites' }
		const { data } = await client.getPeopleSearch(params)
		expect(data).toHaveLength(3)
	})
})
