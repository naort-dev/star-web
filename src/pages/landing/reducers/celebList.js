import { CELEB_LIST } from '../actions/getCelebList';

const initalState = {
  data: [],
  loading: false,
  offset: -1,
  count: 0,
  limit: 20,
  currentCategory: 'featured',
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case CELEB_LIST.start:
      return {
        ...state,
        loading: true,
        data: action.refresh ? [] : state.data,
        token: action.token,
        currentCategory: action.category,
      };

    case CELEB_LIST.end:
      return {
        ...state,
        loading: false,
      };

    case CELEB_LIST.success:
      return {
        ...state,
        loading: false,
        offset: action.offset,
        data: action.list,
        count: action.count,
        [action.category]: {
          offset: action.offset,
          data: action.list,
          count: action.count,
          currentSearchParam: action.searchParam,
          lowPrice: action.lowPrice,
          highPrice: action.highPrice,
          sortValue: action.sortValue,
          isLoggedIn: action.isLoggedIn,
        },
        currentCategory: action.category,
      };

    case CELEB_LIST.failed:
      return {
        ...state,
        error: action.error,
      };

    case CELEB_LIST.swapCacheStart:
      return {
        ...state,
        data: action.refresh ? [] : state.data,
      };

    case CELEB_LIST.swapCacheEnd:
      const cachedData = state[action.key];
      return {
        ...state,
        data: cachedData.data,
        offset: cachedData.offset,
        count: cachedData.count,
        currentCategory: action.key,
        loading: false,
      };

    default:
      return state;
  }
};
