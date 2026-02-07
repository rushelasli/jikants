/**
 * Client exports for the Jikan API wrapper.
 * 
 * This module exports all client classes for accessing Jikan API resources.
 * Use the `JikanClient` for a unified interface, or import individual
 * resource clients for more granular control.
 * 
 * @example
 * ```typescript
 * import { JikanClient } from '@rushelasli/jikants';
 * 
 * const jikan = new JikanClient();
 * const anime = await jikan.anime.getAnimeById(1);
 * ```
 * 
 * @example
 * ```typescript
 * import { AnimeClient } from '@rushelasli/jikants';
 * 
 * const animeClient = new AnimeClient();
 * const anime = await animeClient.getAnimeById(1);
 * ```
 */

export { BaseClient } from './base.client'
export type { ClientOptions } from './base.client'

export { JikanClient } from './jikan.client'
export { AnimeClient } from './anime.client'
export { MangaClient } from './manga.client'
export { CharactersClient } from './characters.client'
export { ClubsClient } from './clubs.client'
export { GenresClient } from './genres.client'
export { MagazinesClient } from './magazines.client'
export { PeopleClient } from './people.client'
export { ProducersClient } from './producers.client'
export { RandomClient } from './random.client'
export { RecommendationsClient } from './recommendations.client'
export { ReviewsClient } from './reviews.client'
export { SchedulesClient } from './schedules.client'
export { SeasonsClient } from './seasons.client'
export { TopClient } from './top.client'
export { UsersClient } from './users.client'
export { WatchClient } from './watch.client'