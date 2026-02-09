import { magazineEndpoints } from '../endpoints/magazine.endpoints'
import type { Magazine, MagazineSearchParams } from '../models'
import { BaseClient } from './base.client'

/**
 * **Magazines Client**
 *
 * Client used to access the Magazines Endpoints:
 *
 * See also: [Jikan Documentation](https://docs.api.jikan.moe/)
 */
export class MagazinesClient extends BaseClient {
	/**
	 * @returns Magazines collection
	 * @param params
	 */
	public getMagazines(params: Partial<MagazineSearchParams> = {}) {
		return this.getResource<Magazine[]>(magazineEndpoints.list, {}, params)
	}
}
