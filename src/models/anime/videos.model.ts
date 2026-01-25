import type { Images } from '../base'
import type { AnimeTrailer } from './anime.model'

export interface AnimeVideos {
	promo: AnimePromoVideo[]
	episodes: AnimeEpisodeVideo[]
	music_videos: AnimeMusicVideo[]
}

export interface AnimePromoVideo {
	title: string
	trailer: AnimeTrailer
}

export interface AnimeEpisodeVideo {
	mal_id: number
	url: string
	title: string
	episode: string
	images: Images
}

export interface AnimeMusicVideo {
	title: string
	video: AnimeTrailer
	meta: AnimeMusicVideoMeta
}

export interface AnimeMusicVideoMeta {
	title: string | null
	author: string | null
}
