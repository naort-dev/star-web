import { FAVOURITES_LIST } from '../actions/getFavouritesList';

const initalState = {
  data: [],
  loading: false,
  offset: -1,
  count: 0,
  limit: 20,
  followLoaded: false,
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case FAVOURITES_LIST.start:
      return {
        ...state,
        loading: true,
        data: action.refresh ? [] : state.data,
      };

    case FAVOURITES_LIST.end:
      return {
        ...state,
        loading: false,
      };

    case FAVOURITES_LIST.success:
      return {
        ...state,
        loading: false,
        offset: action.offset,
        data: action.list,
        count: action.count,
        followLoaded: true,
      };

    case FAVOURITES_LIST.failed:
      return {
        ...state,
        error: action.error,
      };

    case FAVOURITES_LIST.resetLoaded:
      return {
        ...state,
        followLoaded: false,
      }
    
    case FAVOURITES_LIST.updateFollow:
      return {
        ...state,
        data: action.list,
        count: action.newCount,
      };

    default:
      return state;
  }
};
