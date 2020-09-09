import { Action } from "redux";
import { put,call, takeLatest, all, fork } from "redux-saga/effects";
import {  newsError, newsSuccess } from "./actions";
import * as Api from "../../services/Api";
import { unknownError } from "../../utils/api-helper";
import { DashboardActionTypes, NewsParams } from "./types";

type SagaAction<T> = Action & { payload: T };

function* news({ payload: params }: SagaAction<NewsParams>) {
  try {
    const res = yield call(Api.news,params);
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

function* watchFetchRequest() {
    yield takeLatest(DashboardActionTypes.NEWS_REQUEST, news);
  }

  export function* newsSaga() {
    yield all([fork(watchFetchRequest)]);
  }
