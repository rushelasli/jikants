import { randomEndpoints } from '../endpoints/random.endpoints'
import type { Anime, Character, Manga, People } from '../models'
import { BaseClient } from './base.client'

/**
 * **Random Client**
 *
 * Client used to access the Random Endpoints:
 *
 * See also: [Jikan Documentation](https://docs.api.jikan.moe/)
 */
export class RandomClient extends BaseClient {
	/**
	 * Get random anime
	 */
	public getRandomAnime() {
		return this.getResource<Anime>(randomEndpoints.anime)
	}

	/**
	 * Get random manga
	 */
	public getRandomManga() {
		return this.getResource<Manga>(randomEndpoints.manga)
	}

	/**
	 * Get random character
	 */
	public getRandomCharacters() {
		return this.getResource<Character>(randomEndpoints.characters)
	}

	/**
	 * Get random person
	 */
	public getRandomPeople() {
		return this.getResource<People>(randomEndpoints.people)
	}

	/**
	 * Get random user
	 */
	public getRandomUsers() {
		return this.getResource<any>(randomEndpoints.users)
	}
}
