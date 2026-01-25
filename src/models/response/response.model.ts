import type { Pagination } from "../base";

export interface JikanResponse<T> {
  data: T;
}

export interface JikanResponseWithPagination<T> {
  data: T;
  pagination: Pagination;
}

export interface JikanError {
  status: number;
  type: string;
  message: string;
  error: string;
  report_url?: string;
}
