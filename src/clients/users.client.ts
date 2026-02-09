import { userEndpoints } from '../endpoints/user.endpoints'
import type {
	User,
	UserAbout,
	UserById,
	UserClub,
	UserExternal,
	UserFavorites,
	UserFriend,
	UserFull,
	UserHistory,
	UserRecommendation,
	UserSearchParams,
	UserStatistics,
	UserUpdate
} from '../models'
import { BaseClient } from './base.client'

/**
 * **Users Client**
 *
 * Client used to access the Users Endpoints:
 *
 * See also: [Jikan Documentation](https://docs.api.jikan.moe/)
 */
export class UsersClient extends BaseClient {
	/**
	 * Get users search results
	 * @param searchParams Filter parameters
	 */
	public getUsersSearch(searchParams?: Partial<UserSearchParams>) {
		return this.getResource<User[]>(userEndpoints.search, {}, searchParams)
	}

	/**
	 * Get user by ID
	 * @param id User ID
	 */
	public getUserById(id: number) {
		return this.getResource<UserById>(userEndpoints.byId, { id })
	}

	/**
	 * Get complete user resource data
	 * @param username Username
	 */
	public getUserFullProfile(username: string) {
		return this.getResource<UserFull>(userEndpoints.fullProfile, { username })
	}

	/**
	 * Get user profile
	 * @param username Username
	 */
	public getUserProfile(username: string) {
		return this.getResource<User>(userEndpoints.profile, { username })
	}

	/**
	 * Get user statistics
	 * @param username Username
	 */
	public getUserStatistics(username: string) {
		return this.getResource<UserStatistics>(userEndpoints.statistics, {
			username
		})
	}

	/**
	 * Get user favorites
	 * @param username Username
	 */
	public getUserFavorites(username: string) {
		return this.getResource<UserFavorites>(userEndpoints.favorites, {
			username
		})
	}

	/**
	 * Get user updates
	 * @param username Username
	 */
	public getUserUpdates(username: string) {
		return this.getResource<UserUpdate>(userEndpoints.updates, { username })
	}

	/**
	 * Get user about
	 * @param username Username
	 */
	public getUserAbout(username: string) {
		return this.getResource<UserAbout>(userEndpoints.about, { username })
	}

	/**
	 * Get user history
	 * @param username Username
	 * @param type Filter by anime or manga
	 */
	public getUserHistory(username: string, type?: 'anime' | 'manga') {
		return this.getResource<UserHistory[]>(
			userEndpoints.history,
			{ username },
			type ? { type } : undefined
		)
	}

	/**
	 * Get user friends
	 * @param username Username
	 * @param page Page number
	 */
	public getUserFriends(username: string, page?: number) {
		return this.getResource<UserFriend[]>(
			userEndpoints.friends,
			{ username },
			page ? { page } : undefined
		)
	}

	/**
	 * Get user reviews
	 * @param username Username
	 * @param page Page number
	 */
	public getUserReviews(username: string, page?: number) {
		return this.getResource<any[]>(
			userEndpoints.reviews,
			{ username },
			page ? { page } : undefined
		)
	}

	/**
	 * Get user recommendations
	 * @param username Username
	 * @param page Page number
	 */
	public getUserRecommendations(username: string, page?: number) {
		return this.getResource<UserRecommendation[]>(
			userEndpoints.recommendations,
			{ username },
			page ? { page } : undefined
		)
	}

	/**
	 * Get user clubs
	 * @param username Username
	 * @param page Page number
	 */
	public getUserClubs(username: string, page?: number) {
		return this.getResource<UserClub[]>(
			userEndpoints.clubs,
			{ username },
			page ? { page } : undefined
		)
	}

	/**
	 * Get user's external links
	 * @param username Username
	 */
	public getUserExternal(username: string) {
		return this.getResource<UserExternal[]>(userEndpoints.external, {
			username
		})
	}
}
