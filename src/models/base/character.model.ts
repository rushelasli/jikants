import type { Images } from './image.model'
import type { Person } from './person.model'

export interface CharacterMeta {
	mal_id: number
	url: string
	images: Images
	name: string
}

export interface CharacterVoiceActor {
	person: Person
	language: string
}

export type CharacterRole = 'Main' | 'Supporting'

export interface CharacterWithRole {
	character: CharacterMeta
	role: CharacterRole
	voice_actors?: CharacterVoiceActor[]
}
