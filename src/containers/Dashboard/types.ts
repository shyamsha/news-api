export interface NewsParams {
  page: number;
  pageSize: number;
  category: string;
  q?: string;
}

export interface Source {
  id: number | null;
  name: string;
}

export interface Articles {
  source: Source;
  author: string;
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  content: string;
}

export interface News {
  status: string;
  totalResults: number;
  articles: Articles[];
}

export enum DashboardActionTypes {
  NEWS_REQUEST = "@@dashboard/news/NEWS_REQUEST",
  NEWS_SUCCESS = "@@dashboard/news/NEWS_SUCCESS",
  NEWS_ERROR = "@@dashboard/news/NEWS_ERROR",

  NEWS_SEARCH_REQUEST = "@@dashboard/news/NEWS_SEARCH_REQUEST",
  NEWS_SEARCH_SUCCESS = "@@dashboard/news/NEWS_SEARCH_SUCCESS",
  NEWS_SEARCH_ERROR = "@@dashboard/news/NEWS_SEARCH_ERROR",

  CATEGORY_REQUEST = "@@dashboard/category/CATEGORY_REQUEST",
  RESET_REQUEST = "@@dashboard/reset/RESET_REQUEST"
}

export interface NewsState {
  readonly loading: boolean;
  readonly news: null | News;
  readonly category: null | string;
  readonly errors: {
    news?: string;
  };
}
