import type { UserMeta } from '../base'

export interface AnimeReview {
	mal_id: number
	url: string
	type: string
	reactions: ReviewReactions
	date: string
	review: string
	score: number
	tags: string[]
	is_spoiler: boolean
	is_preliminary: boolean
	episodes_watched: number | null
}

export interface AnimeReviewWithUser extends AnimeReview {
	user: UserMeta
}

export interface ReviewReactions {
	overall: number
	nice: number
	love_it: number
	funny: number
	confusing: number
	informative: number
	well_written: number
	creative: number
}
