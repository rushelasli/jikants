import { seasonEndpoints } from '../endpoints/season.endpoints'
import type { Anime, AnimeSeason, SeasonParams, SeasonsList } from '../models'
import { BaseClient } from './base.client'

/**
 * **Seasons Client**
 *
 * Client used to access the Seasons Endpoints
 *
 * See also: [Jikan Documentation](https://docs.api.jikan.moe/)
 */
export class SeasonsClient extends BaseClient {
	/**
	 * Get the seasonal anime by year and season
	 * @param year Season year
	 * @param season Season value
	 * @param searchParams Filter parameters
	 */
	public getSeason(
		year: number,
		season: AnimeSeason,
		searchParams?: Partial<SeasonParams>
	) {
		return this.getResource<Anime[]>(
			seasonEndpoints.byYearAndSeason,
			{ year, season },
			searchParams
		)
	}

	/**
	 * Get current seasonal anime
	 * @param searchParams Filter parameters
	 */
	public getSeasonNow(searchParams?: Partial<SeasonParams>) {
		return this.getResource<Anime[]>(seasonEndpoints.now, {}, searchParams)
	}

	/**
	 * Get available list of seasons
	 */
	public getSeasonsList() {
		return this.getResource<SeasonsList[]>(seasonEndpoints.list)
	}

	/**
	 * Get upcoming season's anime
	 * @param searchParams Filter parameters
	 */
	public getSeasonUpcoming(searchParams?: Partial<SeasonParams>) {
		return this.getResource<Anime[]>(seasonEndpoints.upcoming, {}, searchParams)
	}
}
