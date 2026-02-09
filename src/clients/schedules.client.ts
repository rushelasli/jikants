import { scheduleEndpoints } from '../endpoints/schedule.endpoints'
import type { Anime, ScheduleParams } from '../models'
import { BaseClient } from './base.client'

/**
 * **Schedules Client**
 *
 * Client used to access the Schedules Endpoints
 *
 * See also: [Jikan Documentation](https://docs.api.jikan.moe/)
 */
export class SchedulesClient extends BaseClient {
	/**
	 * Returns weekly schedule
	 * @param searchParams Filter parameters
	 */
	public getSchedules(searchParams?: Partial<ScheduleParams>) {
		return this.getResource<Anime[]>(scheduleEndpoints.list, {}, searchParams)
	}
}
