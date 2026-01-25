import type { CharacterMeta, Images, PersonMeta } from '../base'

export interface People {
	mal_id: number
	url: string
	website_url: string | null
	images: Images
	name: string
	given_name: string | null
	family_name: string | null
	alternate_names: string[]
	birthday: string | null
	favorites: number
	about: string | null
}

export interface PeopleFull extends People {
	anime: PeopleAnimePosition[]
	manga: PeopleMangaPosition[]
	voices: PeopleVoiceActingRole[]
}

export interface PeopleAnimePosition {
	position: string
	anime: PersonMeta & { title: string }
}

export interface PeopleMangaPosition {
	position: string
	manga: PersonMeta & { title: string }
}

export interface PeopleVoiceActingRole {
	role: string
	anime: PersonMeta & { title: string }
	character: CharacterMeta
}
