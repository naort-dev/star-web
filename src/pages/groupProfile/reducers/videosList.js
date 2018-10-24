import { VIDEOS_LIST } from '../actions/getVideosList';

const initalState = {
  data: [],
  loading: false,
  offset: -1,
  count: 0,
  limit: 40,
  currentCategory: 'featured',
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case VIDEOS_LIST.start:
      return {
        ...state,
        loading: true,
        data: action.refresh ? [] : state.data,
        token: action.token,
      };

    case VIDEOS_LIST.end:
      return {
        ...state,
        loading: false,
      };

    case VIDEOS_LIST.success:
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
        },
        currentCategory: action.category,
      };

    case VIDEOS_LIST.failed:
      return {
        ...state,
        error: action.error,
      };

    case VIDEOS_LIST.swapCacheStart:
      return {
        ...state,
        data: action.refresh ? [] : state.data,
      };

    case VIDEOS_LIST.swapCacheEnd:
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
