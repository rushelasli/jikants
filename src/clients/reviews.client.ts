import { reviewEndpoints } from '../endpoints/review.endpoints'
import type { ReviewParams } from '../models'
import { BaseClient } from './base.client'

/**
 * **Reviews Client**
 *
 * Client used to access the Reviews Endpoints:
 *
 * See also: [Jikan Documentation](https://docs.api.jikan.moe/)
 */
export class ReviewsClient extends BaseClient {
	/**
	 * Get recent anime reviews
	 * @param params Filter parameters
	 */
	public getRecentAnimeReviews(params?: Partial<ReviewParams>) {
		return this.getResource<any[]>(reviewEndpoints.anime, {}, params)
	}

	/**
	 * Get recent manga reviews
	 * @param params Filter parameters
	 */
	public getRecentMangaReviews(params?: Partial<ReviewParams>) {
		return this.getResource<any[]>(reviewEndpoints.manga, {}, params)
	}
}