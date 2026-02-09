import { topEndpoints } from '../endpoints/top.endpoints'
import type {
	Anime,
	Character,
	Manga,
	People,
	TopAnimeParams,
	TopCharactersParams,
	TopMangaParams,
	TopPeopleParams
} from '../models'
import { BaseClient } from './base.client'

/**
 * **Top Client**
 *
 * Client used to access the Top Endpoints:
 *
 * See also: [Jikan Documentation](https://docs.api.jikan.moe/)
 */
export class TopClient extends BaseClient {
	/**
	 * Get the top Animes
	 * @param searchParams Filter parameters
	 */
	public getTopAnime(searchParams?: Partial<TopAnimeParams>) {
		return this.getResource<Anime[]>(topEndpoints.anime, {}, searchParams)
	}

	/**
	 * Get the top Mangas
	 * @param searchParams Filter parameters
	 */
	public getTopManga(searchParams?: Partial<TopMangaParams>) {
		return this.getResource<Manga[]>(topEndpoints.manga, {}, searchParams)
	}

	/**
	 * Get the top Characters
	 * @param searchParams Filter parameters
	 */
	public getTopCharacters(searchParams?: Partial<TopCharactersParams>) {
		return this.getResource<Character[]>(
			topEndpoints.characters,
			{},
			searchParams
		)
	}

	/**
	 * Get the top People
	 * @param searchParams Filter parameters
	 */
	public getTopPeople(searchParams?: Partial<TopPeopleParams>) {
		return this.getResource<People[]>(topEndpoints.people, {}, searchParams)
	}
}
