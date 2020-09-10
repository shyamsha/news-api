import { action } from "typesafe-actions";
import { DashboardActionTypes, NewsParams, News } from "./types";

export const newsRequest = (params:NewsParams) =>
action(DashboardActionTypes.NEWS_REQUEST,params);
export const newsSuccess = (res: News) =>
action(DashboardActionTypes.NEWS_SUCCESS, res);
export const newsError = (message: Error) =>
action(DashboardActionTypes.NEWS_ERROR, message);

export const newsSearchRequest = (params:NewsParams) =>
action(DashboardActionTypes.NEWS_SEARCH_REQUEST,params);
export const newsSearchSuccess = (res: News) =>
action(DashboardActionTypes.NEWS_SEARCH_SUCCESS, res);
export const newsSearchError = (message: Error) =>
action(DashboardActionTypes.NEWS_SEARCH_ERROR, message);

export const categoryRequest =(params:{category:string})=>
action(DashboardActionTypes.CATEGORY_REQUEST,params)
