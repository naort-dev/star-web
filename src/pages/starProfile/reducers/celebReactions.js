import { CELEB_REACTIONS_LIST } from '../actions/getCelebReactions';

const initalState = {
  data: [],
  loading: false,
  offset: -1,
  count: 0,
  limit: 6,
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case CELEB_REACTIONS_LIST.start:
      return {
        ...state,
        loading: true,
        data: action.refresh ? [] : state.data,
        token: action.token,
      };

    case CELEB_REACTIONS_LIST.end:
      return {
        ...state,
        loading: false,
      };
    
    case CELEB_REACTIONS_LIST.celebLoading:
      return {
        ...state,
        loading: true,
        data: action.refresh ? [] : state.data,
      };

    case CELEB_REACTIONS_LIST.success:
      return {
        ...state,
        loading: false,
        offset: action.offset,
        data: [...state.data, ...action.list],
        count: action.count,
        limit: action.newLimit,
      };

    case CELEB_REACTIONS_LIST.failed:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};
