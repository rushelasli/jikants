import type { Images, MalResource } from '../base'

export interface Club {
	mal_id: number
	name: string
	url: string
	images: Images
	members: number
	category: ClubCategory
	created: string
	access: ClubAccess
}

export interface ClubMember {
	username: string
	url: string
	images: Images
}

export interface ClubStaff {
	url: string
	username: string
}

export interface ClubRelations {
	anime: MalResource[]
	manga: MalResource[]
	characters: MalResource[]
}

export type ClubCategory =
	| 'actors & artists'
	| 'anime'
	| 'characters'
	| 'cities & neighborhoods'
	| 'companies'
	| 'conventions'
	| 'games'
	| 'japan'
	| 'manga'
	| 'music'
	| 'others'
	| 'schools'

export type ClubAccess = 'public' | 'private' | 'secret'
