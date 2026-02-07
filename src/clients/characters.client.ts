import { characterEndpoints } from '../endpoints/character.endpoints'
import type {
	Character,
	CharacterAnimeAppearance,
	CharacterFull,
	CharacterMangaAppearance,
	CharacterVoiceActor,
	CharacterSearchParams,
	Images
} from '../models'
import { BaseClient } from './base.client'

/**
 * **Characters Client**
 *
 * Client used to access the Character Endpoints:
 *
 * See also: [Jikan Documentation](https://docs.api.jikan.moe/)
 */
export class CharactersClient extends BaseClient {
	/**
	 * Get complete Character data
	 * @param id The Character ID
	 */
	public getCharacterFullById(id: number) {
		return this.getResource<CharacterFull>(
			characterEndpoints.fullById,
			{
				id
			}
		)
	}

	/**
	 * Get Character data
	 * @param id The Character ID
	 */
	public getCharacterById(id: number) {
		return this.getResource<Character>(characterEndpoints.byId, {
			id
		})
	}

	/**
	 * Get Character anime data
	 * @param id The Character ID
	 */
	public getCharacterAnime(id: number) {
		return this.getResource<CharacterAnimeAppearance[]>(
			characterEndpoints.anime,
			{ id }
		)
	}

	/**
	 * Get Character manga data
	 * @param id The Character ID
	 */
	public getCharacterManga(id: number) {
		return this.getResource<CharacterMangaAppearance[]>(
			characterEndpoints.manga,
			{ id }
		)
	}

	/**
	 * Get Character voices data
	 * @param id The Character ID
	 */
	public getCharacterVoiceActors(id: number) {
		return this.getResource<CharacterVoiceActor[]>(
			characterEndpoints.voiceActors,
			{ id }
		)
	}

	/**
	 * Get Character pictures data
	 * @param id The Character ID
	 */
	public getCharacterPictures(id: number) {
		return this.getResource<Images[]>(
			characterEndpoints.pictures,
			{ id }
		)
	}

	/**
	 * Get all the Characters within the given filter. Returns all Characters if no filters are given.
	 * @param searchParams Filter parameters
	 */
	public getCharacterSearch(searchParams: Partial<CharacterSearchParams>) {
		return this.getResource<Character[]>(
			characterEndpoints.search,
			{},
			searchParams
		)
	}
}