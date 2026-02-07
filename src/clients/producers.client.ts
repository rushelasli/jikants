import { producerEndpoints } from '../endpoints/producer.endpoints'
import type {
	NamedResource,
	Producer,
	ProducerFull,
	ProducerSearchParams
} from '../models'
import { BaseClient } from './base.client'

/**
 * **Producers Client**
 *
 * Client used to access the Producers Endpoints:
 *
 * See also: [Jikan Documentation](https://docs.api.jikan.moe/)
 */
export class ProducersClient extends BaseClient {
	/**
	 * Get producer resource
	 * @param id Producer ID
	 */
	public getProducerById(id: number) {
		return this.getResource<Producer>(producerEndpoints.byId, { id })
	}

	/**
	 * Get complete producer resource data
	 * @param id Producer ID
	 */
	public getProducerFullById(id: number) {
		return this.getResource<ProducerFull>(producerEndpoints.fullById, { id })
	}

	/**
	 * Get producer's external links
	 * @param id Producer ID
	 */
	public getProducerExternal(id: number) {
		return this.getResource<NamedResource[]>(
			producerEndpoints.external,
			{ id }
		)
	}

	/**
	 * Get all Producers within the given filter. Returns all Producers if no filters are given.
	 * @param searchParams Filter parameters
	 */
	public getProducersSearch(searchParams?: Partial<ProducerSearchParams>) {
		return this.getResource<Producer[]>(
			producerEndpoints.search,
			{},
			searchParams
		)
	}
}