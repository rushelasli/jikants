import { watchEndpoints } from '../endpoints/watch.endpoints'
import type { WatchEpisode, WatchPromo } from '../models/watch/watch.model'
import { BaseClient } from './base.client'

/**
 * **Watch Client**
 *  Client used to access the Watch Endpoint:
 *
 *  See also: [Jikan Documentation](https://docs.api.jikan.moe/)
 */
export class WatchClient extends BaseClient {
	/**
	 * @returns Recently added episodes
	 */
	public getWatchRecentEpisodes() {
		return this.getResource<WatchEpisode[]>(watchEndpoints.recentEpisodes)
	}

	/**
	 * @returns Recently Popular episodes
	 */
	public getWatchPopularEpisodes() {
		return this.getResource<WatchEpisode[]>(watchEndpoints.popularEpisodes)
	}

	/**
	 * @returns Recently added promotional videos
	 */
	public getWatchRecentPromos(params: Partial<{ page: number }> = {}) {
		return this.getResource<WatchPromo[]>(
			watchEndpoints.recentPromos,
			{},
			params
		)
	}

	/**
	 * @returns Popular promotional videos
	 */
	public getWatchPopularPromos() {
		return this.getResource<WatchPromo[]>(watchEndpoints.popularPromos)
	}
}
