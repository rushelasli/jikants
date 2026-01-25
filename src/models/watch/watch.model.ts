import type { Images } from '../base'
import type { AnimeTrailer } from '../anime'

export interface WatchEpisode {
	entry: WatchEpisodeEntry
	episodes: WatchEpisodeItem[]
	region_locked: boolean
}

export interface WatchEpisodeEntry {
	mal_id: number
	url: string
	images: Images
	title: string
}

export interface WatchEpisodeItem {
	mal_id: string
	url: string
	title: string
	premium: boolean
}

export interface WatchPromo {
	title: string
	entry: WatchEpisodeEntry
	trailer: AnimeTrailer
}
