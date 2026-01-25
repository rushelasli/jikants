import type { Statistics, UserMeta } from '../base'
import type { ReviewReactions } from '../anime'

export interface MangaStatistics extends Statistics {
	reading: number
	plan_to_read: number
}

export interface MangaUserUpdate {
	user: UserMeta
	score: number | null
	status: string
	volumes_read: number | null
	volumes_total: number | null
	chapters_read: number | null
	chapters_total: number | null
	date: string
}

export interface MangaReview {
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
}

export interface MangaReviewWithUser extends MangaReview {
	user: UserMeta
}
