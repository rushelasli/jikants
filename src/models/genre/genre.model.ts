export interface Genre {
	mal_id: number
	name: string
	url: string
	count: number
}

export type GenreFilter =
	| 'genres'
	| 'explicit_genres'
	| 'themes'
	| 'demographics'
