import type { CharacterMeta, CharacterRole, CharacterVoiceActor, Images } from '../base'

export interface Character {
	mal_id: number
	url: string
	images: Images
	name: string
	name_kanji: string | null
	nicknames: string[]
	favorites: number
	about: string | null
}

export interface CharacterFull extends Character {
	anime: CharacterAnimeAppearance[]
	manga: CharacterMangaAppearance[]
	voices: CharacterVoiceActor[]
}

export interface CharacterAnimeAppearance {
	role: CharacterRole
	anime: CharacterMeta & { title: string }
}

export interface CharacterMangaAppearance {
	role: CharacterRole
	manga: CharacterMeta & { title: string }
}
