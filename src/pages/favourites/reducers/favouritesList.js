import { FAVOURITES_LIST } from '../actions/getFavouritesList';

const initalState = {
  data: [],
  loading: false,
  offset: -1,
  count: 0,
  limit: 20,
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
      };

    case FAVOURITES_LIST.failed:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};
