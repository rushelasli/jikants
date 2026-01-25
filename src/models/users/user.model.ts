import type { Images, UserImages } from '../base'

export interface User {
	mal_id: number | null
	username: string
	url: string
	images: UserImages
	last_online: string | null
	gender: string | null
	birthday: string | null
	location: string | null
	joined: string | null
}

export interface UserFull extends User {
	statistics: UserStatistics
	external: UserExternal[]
}

export interface UserStatistics {
	anime: UserAnimeStatistics
	manga: UserMangaStatistics
}

export interface UserAnimeStatistics {
	days_watched: number
	mean_score: number
	watching: number
	completed: number
	on_hold: number
	dropped: number
	plan_to_watch: number
	total_entries: number
	rewatched: number
	episodes_watched: number
}

export interface UserMangaStatistics {
	days_read: number
	mean_score: number
	reading: number
	completed: number
	on_hold: number
	dropped: number
	plan_to_read: number
	total_entries: number
	reread: number
	chapters_read: number
	volumes_read: number
}

export interface UserExternal {
	name: string
	url: string
}

export interface UserAbout {
	about: string | null
}

export interface UserFavorites {
	anime: UserFavoriteAnime[]
	manga: UserFavoriteManga[]
	characters: UserFavoriteCharacter[]
	people: UserFavoritePerson[]
}

export interface UserFavoriteAnime {
	mal_id: number
	url: string
	images: Images
	title: string
	type: string
	start_year: number
}

export interface UserFavoriteManga {
	mal_id: number
	url: string
	images: Images
	title: string
	type: string
	start_year: number
}

export interface UserFavoriteCharacter {
	mal_id: number
	url: string
	images: Images
	name: string
}

export interface UserFavoritePerson {
	mal_id: number
	url: string
	images: Images
	name: string
}

export interface UserUpdate {
	anime: UserAnimeUpdate[]
	manga: UserMangaUpdate[]
}

export interface UserAnimeUpdate {
	entry: UserUpdateEntry
	score: number | null
	status: string
	episodes_seen: number | null
	episodes_total: number | null
	date: string
}

export interface UserMangaUpdate {
	entry: UserUpdateEntry
	score: number | null
	status: string
	chapters_read: number | null
	chapters_total: number | null
	volumes_read: number | null
	volumes_total: number | null
	date: string
}

export interface UserUpdateEntry {
	mal_id: number
	url: string
	images: Images
	title: string
}

export interface UserHistory {
	entry: UserHistoryEntry
	increment: number
	date: string
}

export interface UserHistoryEntry {
	mal_id: number
	type: string
	name: string
	url: string
}

export interface UserFriend {
	user: UserFriendMeta
	last_online: string
	friends_since: string
}

export interface UserFriendMeta {
	username: string
	url: string
	images: UserImages
}

export interface UserClub {
	mal_id: number
	name: string
	url: string
}

export interface UserById {
	url: string
	username: string
}
