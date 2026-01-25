import type { Statistics, UserMeta } from '../base'

export interface AnimeStatistics extends Statistics {
	watching: number
	plan_to_watch: number
}

export interface AnimeUserUpdate {
	user: UserMeta
	score: number | null
	status: string
	episodes_seen: number | null
	episodes_total: number | null
	date: string
}
