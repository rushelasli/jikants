import { recommendationEndpoints } from '../endpoints/recommendation.endpoints'
import type { UserRecommendation } from '../models'
import { BaseClient } from './base.client'

/**
 * **Recommendations Client**
 *
 * Client used to access the Recommendations Endpoints:
 *
 * See also: [Jikan Documentation](https://docs.api.jikan.moe/)
 */
export class RecommendationsClient extends BaseClient {
	/**
	 * Get recent anime recommendations
	 * @param page Page number
	 */
	public getRecentAnimeRecommendations(page?: number) {
		return this.getResource<UserRecommendation[]>(
			recommendationEndpoints.anime,
			{},
			page ? { page } : undefined
		)
	}

	/**
	 * Get recent manga recommendations
	 * @param page Page number
	 */
	public getRecentMangaRecommendations(page?: number) {
		return this.getResource<UserRecommendation[]>(
			recommendationEndpoints.manga,
			{},
			page ? { page } : undefined
		)
	}
}