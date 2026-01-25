export interface MalResource {
	mal_id: number
	type: string
	name: string
	url: string
}

export interface NamedResource {
	name: string
	url: string
}

export interface TitleResource {
	type: string
	title: string
}

export interface DateRange {
	from: string | null
	to: string | null
	prop: {
		from: {
			day: number | null
			month: number | null
			year: number | null
		}
		to: {
			day: number | null
			month: number | null
			year: number | null
		}
		string: string | null
	}
}

export interface RelationResource {
	relation: string
	entry: MalResource[]
}
