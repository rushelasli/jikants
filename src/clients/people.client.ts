import { peopleEndpoints } from '../endpoints/people.endpoints'
import type {
	Images,
	People,
	PeopleAnimePosition,
	PeopleFull,
	PeopleMangaPosition,
	PeopleSearchParams,
	PeopleVoiceActingRole
} from '../models'
import { BaseClient } from './base.client'

/**
 * **People Client**
 *
 * Client used to access the People Endpoints:
 *
 * See also: [Jikan Documentation](https://docs.api.jikan.moe/)
 */
export class PeopleClient extends BaseClient {
	/**
	 * Get complete person resource data
	 * @param id The Person ID
	 */
	public getPersonFullById(id: number) {
		return this.getResource<PeopleFull>(peopleEndpoints.fullById, { id })
	}

	/**
	 * Get person resource
	 * @param id The Person ID
	 */
	public getPersonById(id: number) {
		return this.getResource<People>(peopleEndpoints.byId, { id })
	}

	/**
	 * Get person's anime staff positions
	 * @param id The Person ID
	 */
	public getPersonAnime(id: number) {
		return this.getResource<PeopleAnimePosition[]>(peopleEndpoints.anime, {
			id
		})
	}

	/**
	 * Get person's voice acting roles
	 * @param id The Person ID
	 */
	public getPersonVoices(id: number) {
		return this.getResource<PeopleVoiceActingRole[]>(peopleEndpoints.voices, {
			id
		})
	}

	/**
	 * Get person's published manga works
	 * @param id The Person ID
	 */
	public getPersonManga(id: number) {
		return this.getResource<PeopleMangaPosition[]>(peopleEndpoints.manga, {
			id
		})
	}

	/**
	 * Get person's pictures
	 * @param id The Person ID
	 */
	public getPersonPictures(id: number) {
		return this.getResource<Images[]>(peopleEndpoints.pictures, { id })
	}

	/**
	 * Get all People within the given filter. Returns all People if no filters are given.
	 * @param searchParams Filter parameters
	 */
	public getPeopleSearch(searchParams?: Partial<PeopleSearchParams>) {
		return this.getResource<People[]>(peopleEndpoints.search, {}, searchParams)
	}
}
