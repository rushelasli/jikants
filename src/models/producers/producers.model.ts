import type { Images, NamedResource, TitleResource } from '../base'

export interface Producer {
	mal_id: number
	url: string
	titles: TitleResource[]
	images: Images
	favorites: number
	count: number
	established: string | null
	about: string | null
}

export interface ProducerFull extends Producer {
	external: NamedResource[]
}
