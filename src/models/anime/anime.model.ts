import type {
  DateRange,
  Images,
  MalResource,
  NamedResource,
  RelationResource,
  TitleResource,
} from "../base";

export interface Anime {
  mal_id: number;
  url: string;
  images: Images;
  trailer: AnimeTrailer;
  approved: boolean;
  titles: TitleResource[];
  /** @deprecated Use `titles` array instead */
  title: string;
  /** @deprecated Use `titles` array instead */
  title_english: string | null;
  /** @deprecated Use `titles` array instead */
  title_japanese: string | null;
  /** @deprecated Use `titles` array instead */
  title_synonyms: string[];
  type: AnimeType | null;
  source: string | null;
  episodes: number | null;
  status: AnimeStatus | null;
  airing: boolean;
  aired: DateRange;
  duration: string | null;
  rating: AnimeRating | null;
  score: number | null;
  scored_by: number | null;
  rank: number | null;
  popularity: number | null;
  members: number | null;
  favorites: number | null;
  synopsis: string | null;
  background: string | null;
  season: AnimeSeason | null;
  year: number | null;
  broadcast: AnimeBroadcast;
  producers: MalResource[];
  licensors: MalResource[];
  studios: MalResource[];
  genres: MalResource[];
  explicit_genres: MalResource[];
  themes: MalResource[];
  demographics: MalResource[];
}

export interface AnimeFull extends Anime {
  relations: RelationResource[];
  theme: AnimeTheme;
  external: NamedResource[];
  streaming: NamedResource[];
}

export interface AnimeTrailer {
  youtube_id: string | null;
  url: string | null;
  embed_url: string | null;
  images?: AnimeTrailerImages;
}

export interface AnimeTrailerImages {
  image_url: string | null;
  small_image_url: string | null;
  medium_image_url: string | null;
  large_image_url: string | null;
  maximum_image_url: string | null;
}

export interface AnimeBroadcast {
  day: string | null;
  time: string | null;
  timezone: string | null;
  string: string | null;
}

export interface AnimeTheme {
  openings: string[];
  endings: string[];
}

export type AnimeType =
  | "TV"
  | "OVA"
  | "Movie"
  | "Special"
  | "ONA"
  | "Music"
  | "CM"
  | "PV"
  | "TV Special";

export type AnimeStatus =
  | "Finished Airing"
  | "Currently Airing"
  | "Not yet aired";

export type AnimeRating =
  | "G - All Ages"
  | "PG - Children"
  | "PG-13 - Teens 13 or older"
  | "R - 17+ (violence & profanity)"
  | "R+ - Mild Nudity"
  | "Rx - Hentai";

export type AnimeSeason = "winter" | "spring" | "summer" | "fall";
