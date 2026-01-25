import type { Images } from "./image.model";

export interface Pagination {
  last_visible_page: number;
  has_next_page: boolean;
  current_page?: number;
  items?: PaginationItems;
}

export interface PaginationItems {
  count: number;
  total: number;
  per_page: number;
}

export interface Statistics {
  completed: number;
  on_hold: number;
  dropped: number;
  total: number;
  scores: StatisticsScore[];
}

export interface StatisticsScore {
  score: number;
  votes: number;
  percentage: number;
}

export interface News {
  mal_id: number;
  url: string;
  title: string;
  date: string;
  author_username: string;
  author_url: string;
  forum_url: string;
  images: Images;
  comments: number;
  excerpt: string;
}

export interface Forum {
  mal_id: number;
  url: string;
  title: string;
  date: string;
  author_username: string;
  author_url: string;
  comments: number;
  last_comment: ForumLastComment;
}

export interface ForumLastComment {
  url: string;
  author_username: string;
  author_url: string;
  date: string | null;
}

export interface MoreInfo {
  moreinfo: string | null;
}

export interface Recommendation {
  entry: RecommendationEntry;
  url: string;
  votes: number;
}

export interface RecommendationEntry {
  mal_id: number;
  url: string;
  images: Images;
  title: string;
}

export interface UserMeta {
  username: string;
  url: string;
  images: UserImages;
}

export interface UserImages {
  jpg: {
    image_url: string | null;
  };
  webp?: {
    image_url: string | null;
  };
}

export type ForumFilter = "all" | "episode" | "other";

export type SortOrder = "asc" | "desc";
