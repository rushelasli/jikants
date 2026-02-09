import { clubEndpoints } from '../endpoints/club.endpoints'
import type { ClubSearchParams } from '../models'
import type {
	Club,
	ClubMember,
	ClubRelations,
	ClubStaff
} from '../models/clubs/clubs.model'
import { BaseClient } from './base.client'

/**
 * **Club Client**
 *
 * Client used to access the Club Endpoints.
 *
 * See also: [Jikan Documentation](https://docs.api.jikan.moe/)
 */
export class ClubsClient extends BaseClient {
	/**
	 * @returns Club resource
	 * @param id Club ID
	 */
	public getClubsById(id: number) {
		return this.getResource<Club>(clubEndpoints.byId, { id })
	}

	/**
	 * @returns Club members resource
	 * @param id Club ID
	 * @param params
	 */
	public getClubMembers(id: number, params: Partial<{ page: number }> = {}) {
		return this.getResource<ClubMember[]>(clubEndpoints.members, { id }, params)
	}

	/**
	 * @returns Club staff
	 * @param id Club ID
	 */
	public getClubStaff(id: number) {
		return this.getResource<ClubStaff[]>(clubEndpoints.staff, { id })
	}

	/**
	 * @returns Club relations
	 * @param id Club ID
	 */
	public getClubRelations(id: number) {
		return this.getResource<ClubRelations>(clubEndpoints.relations, { id })
	}

	/**
	 * @returns Search results for Clubs
	 * @param params
	 */
	public getClubSearch(params: Partial<ClubSearchParams> = {}) {
		return this.getResource<Club[]>(clubEndpoints.search, {}, params)
	}
}
