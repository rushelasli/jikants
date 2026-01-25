import type { Images } from "../base";

export interface UserRecommendation {
  mal_id: string;
  entry: UserRecommendationEntry[];
  content: string;
  user: RecommendationUser;
}

export interface UserRecommendationEntry {
  mal_id: number;
  url: string;
  images: Images;
  title: string;
}

export interface RecommendationUser {
  url: string;
  username: string;
}

export interface EntryRecommendation {
  entry: UserRecommendationEntry;
  url: string;
  votes: number;
}
