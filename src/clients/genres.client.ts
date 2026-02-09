import { genreEndpoints } from '../endpoints/genre.endpoints'
import type { Genre, GenreFilter } from '../models'
import { BaseClient } from './base.client'

/**
 * **Genres Client**
 *
 * Client used to access the Genres Endpoints:
 *
 * See also: [Jikan Documentation](https://docs.api.jikan.moe/)
 */
export class GenresClient extends BaseClient {
	/**
	 * Get Anime genres
	 * @param filter Type of the desired genres
	 */
	public getAnimeGenres(filter?: GenreFilter) {
		return this.getResource<Genre[]>(
			genreEndpoints.anime,
			{},
			filter ? { filter } : undefined
		)
	}

	/**
	 * Get Manga genres
	 * @param filter Type of the desired genres
	 */
	public getMangaGenres(filter?: GenreFilter) {
		return this.getResource<Genre[]>(
			genreEndpoints.manga,
			{},
			filter ? { filter } : undefined
		)
	}
}
