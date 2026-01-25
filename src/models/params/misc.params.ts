import type { AnimeType } from '../anime'

export type ScheduleDay =
	| 'monday'
	| 'tuesday'
	| 'wednesday'
	| 'thursday'
	| 'friday'
	| 'saturday'
	| 'sunday'
	| 'unknown'
	| 'other'

export interface ScheduleParams {
	page?: number
	limit?: number
	filter?: ScheduleDay
	kids?: boolean
	sfw?: boolean
	unapproved?: boolean
}

export interface SeasonParams {
	page?: number
	limit?: number
	filter?: AnimeType
	sfw?: boolean
	unapproved?: boolean
	continuing?: boolean
}

export type TopAnimeFilter = 'airing' | 'upcoming' | 'bypopularity' | 'favorite'

export type TopMangaFilter =
	| 'publishing'
	| 'upcoming'
	| 'bypopularity'
	| 'favorite'

export interface TopAnimeParams {
	page?: number
	limit?: number
	type?: AnimeType
	filter?: TopAnimeFilter
	rating?: string
	sfw?: boolean
}

export interface TopMangaParams {
	page?: number
	limit?: number
	type?: string
	filter?: TopMangaFilter
}

export interface TopCharactersParams {
	page?: number
	limit?: number
}

export interface TopPeopleParams {
	page?: number
	limit?: number
}

export type TopReviewType = 'anime' | 'manga'

export interface TopReviewsParams {
	page?: number
	type?: TopReviewType
	preliminary?: boolean
	spoilers?: boolean
}

export interface ReviewParams {
	page?: number
	preliminary?: boolean
	spoilers?: boolean
}

export interface RecommendationParams {
	page?: number
}
