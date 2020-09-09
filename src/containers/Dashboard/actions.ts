import { action } from "typesafe-actions";
import { DashboardActionTypes, NewsParams, News } from "./types";

export const newsRequest = (params:NewsParams) =>
action(DashboardActionTypes.NEWS_REQUEST,params);
export const newsSuccess = (res: News) =>
action(DashboardActionTypes.NEWS_SUCCESS, res);
export const newsError = (message: Error) =>
action(DashboardActionTypes.NEWS_ERROR, message);
