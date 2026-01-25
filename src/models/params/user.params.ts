export type UserAnimeListStatus =
	| 'all'
	| 'watching'
	| 'completed'
	| 'onhold'
	| 'dropped'
	| 'plantowatch'

export type UserMangaListStatus =
	| 'all'
	| 'reading'
	| 'completed'
	| 'onhold'
	| 'dropped'
	| 'plantoread'

export type UserHistoryType = 'anime' | 'manga'

export interface UserHistoryParams {
	type?: UserHistoryType
}

export interface UserFriendsParams {
	page?: number
}

export interface UserReviewsParams {
	page?: number
}

export interface UserRecommendationsParams {
	page?: number
}

export interface UserClubsParams {
	page?: number
}
