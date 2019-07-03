import { TRENDING_STARS } from '../actions/getTrendingStars';

const initalState = {
  data: [],
  loading: false,
  error: null,
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case TRENDING_STARS.start:
      return {
        ...state,
        loading: true,
      };

    case TRENDING_STARS.end:
      return {
        ...state,
        loading: false,
      };

    case TRENDING_STARS.success:
      return {
        ...state,
        loading: false,
        data: action.list,
      };

    case TRENDING_STARS.failed:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};
