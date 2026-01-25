export interface AnimeEpisode {
	mal_id: number
	url: string | null
	title: string
	title_japanese: string | null
	title_romanji: string | null
	duration: number | null
	aired: string | null
	score: number | null
	filler: boolean
	recap: boolean
	forum_url: string | null
}

export interface AnimeEpisodeVideo {
	mal_id: number
	url: string
	title: string
	episode: string
	images: AnimeEpisodeImages
}

export interface AnimeEpisodeImages {
	jpg: {
		image_url: string | null
	}
}
