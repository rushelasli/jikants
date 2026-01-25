import type { AnimeType } from "../anime";
import type { MangaType } from "../manga";
import type { SortOrder } from "../base";

export type AnimeRatingFilter = "g" | "pg" | "pg13" | "r17" | "r" | "rx";

export type SearchOrderBy =
  | "mal_id"
  | "title"
  | "start_date"
  | "end_date"
  | "score"
  | "scored_by"
  | "rank"
  | "popularity"
  | "members"
  | "favorites";

export type AnimeSearchOrderBy = SearchOrderBy | "episodes" | "type" | "rating";

export type MangaSearchOrderBy = SearchOrderBy | "chapters" | "volumes";

export type AnimeSearchStatus = "airing" | "complete" | "upcoming";

export type MangaSearchStatus =
  | "publishing"
  | "complete"
  | "hiatus"
  | "discontinued"
  | "upcoming";

export interface BaseSearchParams {
  page?: number;
  limit?: number;
  q?: string;
  score?: number;
  min_score?: number;
  max_score?: number;
  sfw?: boolean;
  genres?: string;
  genres_exclude?: string;
  order_by?: string;
  sort?: SortOrder;
  letter?: string;
  start_date?: string;
  end_date?: string;
  unapproved?: boolean;
}

export interface AnimeSearchParams extends BaseSearchParams {
  type?: AnimeType;
  status?: AnimeSearchStatus;
  rating?: AnimeRatingFilter;
  order_by?: AnimeSearchOrderBy;
  producers?: string;
}

export interface MangaSearchParams extends BaseSearchParams {
  type?: MangaType;
  status?: MangaSearchStatus;
  order_by?: MangaSearchOrderBy;
  magazines?: string;
}

export type CharacterSearchOrderBy = "mal_id" | "name" | "favorites";

export interface CharacterSearchParams {
  page?: number;
  limit?: number;
  q?: string;
  order_by?: CharacterSearchOrderBy;
  sort?: SortOrder;
  letter?: string;
}

export type PeopleSearchOrderBy = "mal_id" | "name" | "birthday" | "favorites";

export interface PeopleSearchParams {
  page?: number;
  limit?: number;
  q?: string;
  order_by?: PeopleSearchOrderBy;
  sort?: SortOrder;
  letter?: string;
}

export type UserSearchGender = "any" | "male" | "female" | "nonbinary";

export interface UserSearchParams {
  page?: number;
  limit?: number;
  q?: string;
  gender?: UserSearchGender;
  location?: string;
  maxAge?: number;
  minAge?: number;
}

export type ClubSearchType = "public" | "private" | "secret";

export type ClubSearchCategory =
  | "anime"
  | "manga"
  | "actors_and_artists"
  | "characters"
  | "cities_and_neighborhoods"
  | "companies"
  | "conventions"
  | "games"
  | "japan"
  | "music"
  | "other"
  | "schools";

export type ClubSearchOrderBy = "mal_id" | "name" | "members_count" | "created";

export interface ClubSearchParams {
  page?: number;
  limit?: number;
  q?: string;
  type?: ClubSearchType;
  category?: ClubSearchCategory;
  order_by?: ClubSearchOrderBy;
  sort?: SortOrder;
  letter?: string;
}

export type ProducerSearchOrderBy =
  | "mal_id"
  | "count"
  | "favorites"
  | "established";

export interface ProducerSearchParams {
  page?: number;
  limit?: number;
  q?: string;
  order_by?: ProducerSearchOrderBy;
  sort?: SortOrder;
  letter?: string;
}

export type MagazineSearchOrderBy = "mal_id" | "name" | "count";

export interface MagazineSearchParams {
  page?: number;
  limit?: number;
  q?: string;
  order_by?: MagazineSearchOrderBy;
  sort?: SortOrder;
  letter?: string;
}
