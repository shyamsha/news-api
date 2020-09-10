import { Reducer } from "redux";
import { NewsState, DashboardActionTypes } from "./types";

const initialState: NewsState = {
  loading: false,
  news: null,
  category: null,
  errors: {
    news: undefined,
  },
};

type A<T = string, U = any> = { type: T; payload: U };

const reducer: Reducer<NewsState, A> = (
  state: NewsState = initialState,
  action: A,
) => {
  switch (action.type) {
    case DashboardActionTypes.NEWS_REQUEST:
      return {
        ...state,
        loading: true,
        errors: { ...state.errors, news: undefined },
      };
    case DashboardActionTypes.NEWS_SUCCESS:
      return { ...state, loading: false, news: action.payload };
    case DashboardActionTypes.NEWS_ERROR:
      return {
        ...state,
        loading: false,
        errors: { ...state.errors, news: action.payload },
      };
      case DashboardActionTypes.NEWS_SEARCH_REQUEST:
        return {
          ...state,
          loading: true,
          errors: { ...state.errors, news: undefined },
        };
      case DashboardActionTypes.NEWS_SEARCH_SUCCESS:
        return { ...state, loading: false, news: action.payload };
      case DashboardActionTypes.NEWS_SEARCH_ERROR:
        return {
          ...state,
          loading: false,
          errors: { ...state.errors, news: action.payload },
        };
    case DashboardActionTypes.CATEGORY_REQUEST:
      return { ...state, category: action.payload.category };

    default:
      return state;
  }
};

export { initialState as newsInitialState, reducer as newsReducer };
