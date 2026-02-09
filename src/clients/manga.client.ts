import { mangaEndpoints } from '../endpoints/manga.endpoints'
import type {
	Forum,
	ForumFilter,
	JikanResponse,
	JikanResponseWithPagination,
	Manga,
	MangaFull,
	MangaSearchParams,
	MoreInfo,
	News,
	Recommendation
} from '../models'
import { BaseClient } from './base.client'

/**
 * Manga resource client for accessing all manga-related endpoints.
 *
 * Provides methods to fetch manga data, characters, news, forum topics,
 * pictures, statistics, reviews, relations, and more.
 *
 * @example
 * ```typescript
 * const client = new MangaClient();
 * const manga = await client.getMangaById(1);
 * const characters = await client.getMangaCharacters(1);
 * ```
 */
export class MangaClient extends BaseClient {
	/**
	 * Get complete manga resource data including relations and external links.
	 *
	 * @param id - MyAnimeList manga ID
	 * @returns Promise resolving to complete manga data
	 *
	 * @example
	 * ```typescript
	 * const manga = await client.getMangaFullById(1);
	 * console.log(manga.data.relations);
	 * console.log(manga.data.external);
	 * ```
	 */
	public async getMangaFullById(id: number): Promise<JikanResponse<MangaFull>> {
		return this.getResource<MangaFull>(mangaEndpoints.fullById, { id })
	}

	/**
	 * Get manga resource with basic information.
	 *
	 * @param id - MyAnimeList manga ID
	 * @returns Promise resolving to manga data
	 *
	 * @example
	 * ```typescript
	 * const manga = await client.getMangaById(1);
	 * console.log(manga.data.title);
	 * console.log(manga.data.score);
	 * console.log(manga.data.chapters);
	 * ```
	 */
	public async getMangaById(id: number): Promise<JikanResponse<Manga>> {
		return this.getResource<Manga>(mangaEndpoints.byId, { id })
	}

	/**
	 * Get characters that appear in a specific manga.
	 *
	 * @param id - MyAnimeList manga ID
	 * @returns Promise resolving to array of manga characters
	 *
	 * @example
	 * ```typescript
	 * const characters = await client.getMangaCharacters(1);
	 * for (const char of characters.data) {
	 *   console.log(char.character.name, char.role);
	 * }
	 * ```
	 */
	public async getMangaCharacters(id: number) {
		return this.getResource(mangaEndpoints.characters, { id })
	}

	/**
	 * Get news articles related to a specific manga.
	 *
	 * @param id - MyAnimeList manga ID
	 * @param page - Page number (default: 1)
	 * @returns Promise resolving to paginated news articles
	 *
	 * @example
	 * ```typescript
	 * const news = await client.getMangaNews(1, 1);
	 * for (const article of news.data) {
	 *   console.log(article.title, article.date);
	 * }
	 * ```
	 */
	public async getMangaNews(
		id: number,
		page = 1
	): Promise<JikanResponseWithPagination<News[]>> {
		return this.getResourceWithPagination<News[]>(
			mangaEndpoints.news,
			{ id },
			{ page }
		)
	}

	/**
	 * Get forum topics related to a specific manga.
	 *
	 * @param id - MyAnimeList manga ID
	 * @param filter - Optional filter for topic type ('all', 'episode', 'other')
	 * @returns Promise resolving to forum topics
	 *
	 * @example
	 * ```typescript
	 * const forum = await client.getMangaForum(1);
	 * for (const topic of forum.data) {
	 *   console.log(topic.title, topic.comments);
	 * }
	 * ```
	 */
	public async getMangaForum(
		id: number,
		filter?: ForumFilter
	): Promise<JikanResponse<Forum[]>> {
		return this.getResource<Forum[]>(
			mangaEndpoints.topics,
			{ id },
			filter ? { filter } : undefined
		)
	}

	/**
	 * Get pictures/images related to the manga.
	 *
	 * @param id - MyAnimeList manga ID
	 * @returns Promise resolving to manga pictures
	 *
	 * @example
	 * ```typescript
	 * const pictures = await client.getMangaPictures(1);
	 * for (const pic of pictures.data) {
	 *   console.log(pic.jpg.image_url);
	 * }
	 * ```
	 */
	public async getMangaPictures(id: number) {
		return this.getResource(mangaEndpoints.pictures, { id })
	}

	/**
	 * Get statistics for a specific manga (reading, completed, dropped, etc.).
	 *
	 * @param id - MyAnimeList manga ID
	 * @returns Promise resolving to manga statistics
	 *
	 * @example
	 * ```typescript
	 * const stats = await client.getMangaStatistics(1);
	 * console.log(stats.data.reading);
	 * console.log(stats.data.completed);
	 * console.log(stats.data.scores);
	 * ```
	 */
	public async getMangaStatistics(id: number) {
		return this.getResource(mangaEndpoints.statistics, { id })
	}

	/**
	 * Get additional information about the manga (trivia, notes, etc.).
	 *
	 * @param id - MyAnimeList manga ID
	 * @returns Promise resolving to more info
	 *
	 * @example
	 * ```typescript
	 * const info = await client.getMangaMoreInfo(1);
	 * console.log(info.data.moreinfo);
	 * ```
	 */
	public async getMangaMoreInfo(id: number): Promise<JikanResponse<MoreInfo>> {
		return this.getResource<MoreInfo>(mangaEndpoints.moreInfo, { id })
	}

	/**
	 * Get user recommendations for similar manga.
	 *
	 * @param id - MyAnimeList manga ID
	 * @returns Promise resolving to manga recommendations
	 *
	 * @example
	 * ```typescript
	 * const recs = await client.getMangaRecommendations(1);
	 * for (const rec of recs.data) {
	 *   console.log(rec.entry.title, rec.votes);
	 * }
	 * ```
	 */
	public async getMangaRecommendations(
		id: number
	): Promise<JikanResponse<Recommendation[]>> {
		return this.getResource<Recommendation[]>(mangaEndpoints.recommendations, {
			id
		})
	}

	/**
	 * Get recent user updates for this manga (users adding/updating their list).
	 *
	 * @param id - MyAnimeList manga ID
	 * @param page - Page number (default: 1)
	 * @returns Promise resolving to paginated user updates
	 *
	 * @example
	 * ```typescript
	 * const updates = await client.getMangaUserUpdates(1, 1);
	 * for (const update of updates.data) {
	 *   console.log(update.user.username, update.status);
	 * }
	 * ```
	 */
	public async getMangaUserUpdates(id: number, page = 1) {
		return this.getResourceWithPagination(
			mangaEndpoints.userUpdates,
			{ id },
			{ page }
		)
	}

	/**
	 * Get user reviews for a specific manga.
	 *
	 * @param id - MyAnimeList manga ID
	 * @param page - Page number (default: 1)
	 * @param preliminary - Include preliminary reviews (default: undefined)
	 * @param spoilers - Include spoiler reviews (default: undefined)
	 * @returns Promise resolving to paginated reviews
	 *
	 * @example
	 * ```typescript
	 * const reviews = await client.getMangaReviews(1, 1, true);
	 * for (const review of reviews.data) {
	 *   console.log(review.user.username, review.score);
	 * }
	 * ```
	 */
	public async getMangaReviews(
		id: number,
		page = 1,
		preliminary?: boolean,
		spoilers?: boolean
	) {
		const params: Record<string, unknown> = { page }
		if (preliminary !== undefined) params.preliminary = preliminary
		if (spoilers !== undefined) params.spoilers = spoilers

		return this.getResourceWithPagination(
			mangaEndpoints.reviews,
			{ id },
			params
		)
	}

	/**
	 * Get related manga and anime entries (sequels, prequels, adaptations, etc.).
	 *
	 * @param id - MyAnimeList manga ID
	 * @returns Promise resolving to manga relations
	 *
	 * @example
	 * ```typescript
	 * const relations = await client.getMangaRelations(1);
	 * for (const rel of relations.data) {
	 *   console.log(rel.relation, rel.entry);
	 * }
	 * ```
	 */
	public async getMangaRelations(id: number) {
		return this.getResource(mangaEndpoints.relations, { id })
	}

	/**
	 * Get external links for the manga (official sites, social media, etc.).
	 *
	 * @param id - MyAnimeList manga ID
	 * @returns Promise resolving to external links
	 *
	 * @example
	 * ```typescript
	 * const links = await client.getMangaExternal(1);
	 * for (const link of links.data) {
	 *   console.log(link.name, link.url);
	 * }
	 * ```
	 */
	public async getMangaExternal(id: number) {
		return this.getResource(mangaEndpoints.external, { id })
	}

	/**
	 * Search for manga with various filters and parameters.
	 *
	 * @param searchParams - Search and filter parameters
	 * @returns Promise resolving to paginated manga search results
	 *
	 * @example
	 * ```typescript
	 * const results = await client.searchManga({
	 *   q: 'one piece',
	 *   type: 'manga',
	 *   status: 'publishing',
	 *   order_by: 'score',
	 *   sort: 'desc',
	 *   page: 1
	 * });
	 * ```
	 */
	public async searchManga(
		searchParams: Partial<MangaSearchParams> = {}
	): Promise<JikanResponseWithPagination<Manga[]>> {
		return this.getResourceWithPagination<Manga[]>(
			mangaEndpoints.search,
			{},
			searchParams
		)
	}
}
