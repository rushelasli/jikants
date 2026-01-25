import type { Images } from './image.model'

export interface Person {
	mal_id: number
	url: string
	images: Images
	name: string
}

export interface PersonMeta extends Person {}
