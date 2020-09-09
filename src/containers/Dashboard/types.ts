export interface NewsParams {
  page: number;
  pageSize: number;
  category?: string;
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
}

export interface NewsState {
  readonly loading: boolean;
  readonly news: null | News;
  readonly errors: {
    news?:string
  };
}
