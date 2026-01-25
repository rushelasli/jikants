import type {
  DateRange,
  Images,
  MalResource,
  NamedResource,
  RelationResource,
  TitleResource,
} from "../base";

export interface Manga {
  mal_id: number;
  url: string;
  images: Images;
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
  type: MangaType | null;
  chapters: number | null;
  volumes: number | null;
  status: MangaStatus | null;
  publishing: boolean;
  published: DateRange;
  score: number | null;
  scored_by: number | null;
  rank: number | null;
  popularity: number | null;
  members: number | null;
  favorites: number | null;
  synopsis: string | null;
  background: string | null;
  authors: MalResource[];
  serializations: MalResource[];
  genres: MalResource[];
  explicit_genres: MalResource[];
  themes: MalResource[];
  demographics: MalResource[];
}

export interface MangaFull extends Manga {
  relations: RelationResource[];
  external: NamedResource[];
}

export type MangaType =
  | "Manga"
  | "Novel"
  | "Light Novel"
  | "One-shot"
  | "Doujinshi"
  | "Manhwa"
  | "Manhua"
  | "OEL";

export type MangaStatus =
  | "Finished"
  | "Publishing"
  | "On Hiatus"
  | "Discontinued"
  | "Not yet published";
