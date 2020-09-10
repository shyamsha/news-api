import { Action } from "redux";
import { put, call, takeLatest, all, fork } from "redux-saga/effects";
import {
  newsError,
  newsSuccess,
  newsSearchError,
  newsSearchSuccess,
} from "./actions";
import * as Api from "../../services/Api";
import { unknownError } from "../../utils/api-helper";
import { DashboardActionTypes, NewsParams } from "./types";

type SagaAction<T> = Action & { payload: T };

function* news({ payload: params }: SagaAction<NewsParams>) {
  try {
    const res = yield call(Api.news, params);
    if (res.error) {
      yield put(newsError(res.error));
    } else {
      yield put(newsSuccess(res.data));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(newsError(err));
    } else {
      yield put(newsError(unknownError("An unknown error occurred")));
    }
  }
}

function* newsSearch({ payload: params }: SagaAction<NewsParams>) {
  try {
    const res = yield call(Api.newsSearch, params);
    if (res.error) {
      yield put(newsSearchError(res.error));
    } else {
      yield put(newsSearchSuccess(res.data));
    }
  } catch (err) {
    if (err instanceof Error) {
      yield put(newsSearchError(err));
    } else {
      yield put(newsSearchError(unknownError("An unknown error occurred")));
    }
  }
}

function* watchFetchRequest() {
  yield takeLatest(DashboardActionTypes.NEWS_REQUEST, news);
  yield takeLatest(DashboardActionTypes.NEWS_SEARCH_REQUEST, newsSearch);
}

export function* newsSaga() {
  yield all([fork(watchFetchRequest)]);
}
