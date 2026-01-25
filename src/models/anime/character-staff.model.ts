import type { CharacterVoiceActor, CharacterWithRole, PersonMeta } from '../base'

export interface AnimeCharacter extends CharacterWithRole {
	voice_actors: CharacterVoiceActor[]
}

export interface AnimeStaff {
	person: PersonMeta
	positions: string[]
}
