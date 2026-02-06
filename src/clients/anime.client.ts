import type {
	Anime,
	AnimeFull,
	AnimeSearchParams,
	Forum,
	ForumFilter,
	JikanResponse,
	JikanResponseWithPagination,
	MoreInfo,
	News,
	Recommendation
} from '../models'
import { animeEndpoints } from '../endpoints/anime.endpoints'
import { BaseClient } from './base.client'

/**
 * Anime resource client for accessing all anime-related endpoints.
 * 
 * Provides methods to fetch anime data, characters, staff, episodes,
 * news, forum topics, videos, pictures, statistics, and more.
 * 
 * @example
 * ```typescript
 * const client = new AnimeClient();
 * const anime = await client.getAnimeById(1);
 * const episodes = await client.getAnimeEpisodes(1, 1);
 * ```
 */
export class AnimeClient extends BaseClient {
	/**
	 * Get complete anime resource data including relations, theme songs, and external links.
	 * 
	 * @param id - MyAnimeList anime ID
	 * @returns Promise resolving to complete anime data
	 * 
	 * @example
	 * ```typescript
	 * const anime = await client.getAnimeFullById(1);
	 * console.log(anime.data.relations);
	 * console.log(anime.data.theme.openings);
	 * ```
	 */
	public async getAnimeFullById(id: number): Promise<JikanResponse<AnimeFull>> {
		return this.getResource<AnimeFull>(animeEndpoints.fullById, { id })
	}

	/**
	 * Get anime resource with basic information.
	 * 
	 * @param id - MyAnimeList anime ID
	 * @returns Promise resolving to anime data
	 * 
	 * @example
	 * ```typescript
	 * const anime = await client.getAnimeById(1);
	 * console.log(anime.data.title);
	 * console.log(anime.data.score);
	 * ```
	 */
	public async getAnimeById(id: number): Promise<JikanResponse<Anime>> {
		return this.getResource<Anime>(animeEndpoints.byId, { id })
	}

	/**
	 * Get characters and their voice actors for a specific anime.
	 * 
	 * @param id - MyAnimeList anime ID
	 * @returns Promise resolving to array of anime characters with voice actors
	 * 
	 * @example
	 * ```typescript
	 * const characters = await client.getAnimeCharacters(1);
	 * for (const char of characters.data) {
	 *   console.log(char.character.name, char.role);
	 * }
	 * ```
	 */
	public async getAnimeCharacters(id: number) {
		return this.getResource(animeEndpoints.characters, { id })
	}

	/**
	 * Get staff members who worked on a specific anime.
	 * 
	 * @param id - MyAnimeList anime ID
	 * @returns Promise resolving to array of anime staff
	 * 
	 * @example
	 * ```typescript
	 * const staff = await client.getAnimeStaff(1);
	 * for (const member of staff.data) {
	 *   console.log(member.person.name, member.positions);
	 * }
	 * ```
	 */
	public async getAnimeStaff(id: number) {
		return this.getResource(animeEndpoints.staff, { id })
	}

	/**
	 * Get a paginated list of episodes for a specific anime.
	 * 
	 * @param id - MyAnimeList anime ID
	 * @param page - Page number (default: 1)
	 * @returns Promise resolving to paginated episode list
	 * 
	 * @example
	 * ```typescript
	 * const episodes = await client.getAnimeEpisodes(1, 1);
	 * console.log(episodes.data);
	 * console.log(episodes.pagination);
	 * ```
	 */
	public async getAnimeEpisodes(id: number, page = 1) {
		return this.getResourceWithPagination(
			animeEndpoints.episodes,
			{ id },
			{ page }
		)
	}

	/**
	 * Get a single episode by its episode number.
	 * 
	 * @param id - MyAnimeList anime ID
	 * @param episode - Episode number
	 * @returns Promise resolving to episode data
	 * 
	 * @example
	 * ```typescript
	 * const episode = await client.getAnimeEpisodeById(1, 1);
	 * console.log(episode.data.title);
	 * console.log(episode.data.synopsis);
	 * ```
	 */
	public async getAnimeEpisodeById(id: number, episode: number) {
		return this.getResource(animeEndpoints.episodeById, { id, episode })
	}

	/**
	 * Get news articles related to a specific anime.
	 * 
	 * @param id - MyAnimeList anime ID
	 * @param page - Page number (default: 1)
	 * @returns Promise resolving to paginated news articles
	 * 
	 * @example
	 * ```typescript
	 * const news = await client.getAnimeNews(1, 1);
	 * for (const article of news.data) {
	 *   console.log(article.title, article.date);
	 * }
	 * ```
	 */
	public async getAnimeNews(
		id: number,
		page = 1
	): Promise<JikanResponseWithPagination<News[]>> {
		return this.getResourceWithPagination<News[]>(
			animeEndpoints.news,
			{ id },
			{ page }
		)
	}

	/**
	 * Get forum topics related to a specific anime.
	 * 
	 * @param id - MyAnimeList anime ID
	 * @param filter - Optional filter for topic type ('all', 'episode', 'other')
	 * @returns Promise resolving to forum topics
	 * 
	 * @example
	 * ```typescript
	 * const forum = await client.getAnimeForum(1, 'episode');
	 * for (const topic of forum.data) {
	 *   console.log(topic.title, topic.comments);
	 * }
	 * ```
	 */
	public async getAnimeForum(
		id: number,
		filter?: ForumFilter
	): Promise<JikanResponse<Forum[]>> {
		return this.getResource<Forum[]>(
			animeEndpoints.forum,
			{ id },
			filter ? { filter } : undefined
		)
	}

	/**
	 * Get videos related to the anime (promotional videos, music videos, episodes).
	 * 
	 * @param id - MyAnimeList anime ID
	 * @returns Promise resolving to anime videos
	 * 
	 * @example
	 * ```typescript
	 * const videos = await client.getAnimeVideos(1);
	 * console.log(videos.data.promo);
	 * console.log(videos.data.music_videos);
	 * ```
	 */
	public async getAnimeVideos(id: number) {
		return this.getResource(animeEndpoints.videos, { id })
	}

	/**
	 * Get episode videos for a specific anime with pagination.
	 * 
	 * @param id - MyAnimeList anime ID
	 * @param page - Page number (default: 1)
	 * @returns Promise resolving to paginated episode videos
	 * 
	 * @example
	 * ```typescript
	 * const videos = await client.getAnimeVideosEpisodes(1, 1);
	 * for (const video of videos.data) {
	 *   console.log(video.title, video.episode);
	 * }
	 * ```
	 */
	public async getAnimeVideosEpisodes(id: number, page = 1) {
		return this.getResourceWithPagination(
			animeEndpoints.videoEpisodes,
			{ id },
			{ page }
		)
	}

	/**
	 * Get pictures/images related to the anime.
	 * 
	 * @param id - MyAnimeList anime ID
	 * @returns Promise resolving to anime pictures
	 * 
	 * @example
	 * ```typescript
	 * const pictures = await client.getAnimePictures(1);
	 * for (const pic of pictures.data) {
	 *   console.log(pic.images.jpg.image_url);
	 * }
	 * ```
	 */
	public async getAnimePictures(id: number) {
		return this.getResource(animeEndpoints.pictures, { id })
	}

	/**
	 * Get statistics for a specific anime (watching, completed, dropped, etc.).
	 * 
	 * @param id - MyAnimeList anime ID
	 * @returns Promise resolving to anime statistics
	 * 
	 * @example
	 * ```typescript
	 * const stats = await client.getAnimeStatistics(1);
	 * console.log(stats.data.watching);
	 * console.log(stats.data.completed);
	 * console.log(stats.data.scores);
	 * ```
	 */
	public async getAnimeStatistics(id: number) {
		return this.getResource(animeEndpoints.statistics, { id })
	}

	/**
	 * Get additional information about the anime (trivia, notes, etc.).
	 * 
	 * @param id - MyAnimeList anime ID
	 * @returns Promise resolving to more info
	 * 
	 * @example
	 * ```typescript
	 * const info = await client.getAnimeMoreInfo(1);
	 * console.log(info.data.moreinfo);
	 * ```
	 */
	public async getAnimeMoreInfo(id: number): Promise<JikanResponse<MoreInfo>> {
		return this.getResource<MoreInfo>(animeEndpoints.moreInfo, { id })
	}

	/**
	 * Get user recommendations for similar anime.
	 * 
	 * @param id - MyAnimeList anime ID
	 * @returns Promise resolving to anime recommendations
	 * 
	 * @example
	 * ```typescript
	 * const recs = await client.getAnimeRecommendations(1);
	 * for (const rec of recs.data) {
	 *   console.log(rec.entry.title, rec.votes);
	 * }
	 * ```
	 */
	public async getAnimeRecommendations(
		id: number
	): Promise<JikanResponse<Recommendation[]>> {
		return this.getResource<Recommendation[]>(
			animeEndpoints.recommendations,
			{ id }
		)
	}

	/**
	 * Get recent user updates for this anime (users adding/updating their list).
	 * 
	 * @param id - MyAnimeList anime ID
	 * @param page - Page number (default: 1)
	 * @returns Promise resolving to paginated user updates
	 * 
	 * @example
	 * ```typescript
	 * const updates = await client.getAnimeUserUpdates(1, 1);
	 * for (const update of updates.data) {
	 *   console.log(update.user.username, update.status);
	 * }
	 * ```
	 */
	public async getAnimeUserUpdates(id: number, page = 1) {
		return this.getResourceWithPagination(
			animeEndpoints.userUpdates,
			{ id },
			{ page }
		)
	}

	/**
	 * Get user reviews for a specific anime.
	 * 
	 * @param id - MyAnimeList anime ID
	 * @param page - Page number (default: 1)
	 * @param preliminary - Include preliminary reviews (default: undefined)
	 * @param spoilers - Include spoiler reviews (default: undefined)
	 * @returns Promise resolving to paginated reviews
	 * 
	 * @example
	 * ```typescript
	 * const reviews = await client.getAnimeReviews(1, 1, true);
	 * for (const review of reviews.data) {
	 *   console.log(review.user.username, review.score);
	 * }
	 * ```
	 */
	public async getAnimeReviews(
		id: number,
		page = 1,
		preliminary?: boolean,
		spoilers?: boolean
	) {
		const params: Record<string, unknown> = { page }
		if (preliminary !== undefined) params.preliminary = preliminary
		if (spoilers !== undefined) params.spoilers = spoilers

		return this.getResourceWithPagination(animeEndpoints.reviews, { id }, params)
	}

	/**
	 * Get related anime and manga entries (sequels, prequels, side stories, etc.).
	 * 
	 * @param id - MyAnimeList anime ID
	 * @returns Promise resolving to anime relations
	 * 
	 * @example
	 * ```typescript
	 * const relations = await client.getAnimeRelations(1);
	 * for (const rel of relations.data) {
	 *   console.log(rel.relation, rel.entry);
	 * }
	 * ```
	 */
	public async getAnimeRelations(id: number) {
		return this.getResource(animeEndpoints.relations, { id })
	}

	/**
	 * Get opening and ending theme songs for the anime.
	 * 
	 * @param id - MyAnimeList anime ID
	 * @returns Promise resolving to anime themes
	 * 
	 * @example
	 * ```typescript
	 * const themes = await client.getAnimeThemes(1);
	 * console.log(themes.data.openings);
	 * console.log(themes.data.endings);
	 * ```
	 */
	public async getAnimeThemes(id: number) {
		return this.getResource(animeEndpoints.themes, { id })
	}

	/**
	 * Get external links for the anime (official sites, social media, etc.).
	 * 
	 * @param id - MyAnimeList anime ID
	 * @returns Promise resolving to external links
	 * 
	 * @example
	 * ```typescript
	 * const links = await client.getAnimeExternal(1);
	 * for (const link of links.data) {
	 *   console.log(link.name, link.url);
	 * }
	 * ```
	 */
	public async getAnimeExternal(id: number) {
		return this.getResource(animeEndpoints.external, { id })
	}

	/**
	 * Get streaming platform links for the anime (Crunchyroll, Netflix, etc.).
	 * 
	 * @param id - MyAnimeList anime ID
	 * @returns Promise resolving to streaming links
	 * 
	 * @example
	 * ```typescript
	 * const streaming = await client.getAnimeStreaming(1);
	 * for (const platform of streaming.data) {
	 *   console.log(platform.name, platform.url);
	 * }
	 * ```
	 */
	public async getAnimeStreaming(id: number) {
		return this.getResource(animeEndpoints.streaming, { id })
	}

	/**
	 * Search for anime with various filters and parameters.
	 * 
	 * @param searchParams - Search and filter parameters
	 * @returns Promise resolving to paginated anime search results
	 * 
	 * @example
	 * ```typescript
	 * const results = await client.searchAnime({
	 *   q: 'naruto',
	 *   type: 'TV',
	 *   status: 'complete',
	 *   order_by: 'score',
	 *   sort: 'desc',
	 *   page: 1
	 * });
	 * ```
	 */
	public async searchAnime(
		searchParams: Partial<AnimeSearchParams> = {}
	): Promise<JikanResponseWithPagination<Anime[]>> {
		return this.getResourceWithPagination<Anime[]>(
			animeEndpoints.search,
			{},
			searchParams
		)
	}
}