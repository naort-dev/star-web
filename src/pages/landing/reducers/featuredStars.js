import { FEATURED_STARS } from '../actions/getFeaturedStars';

const initalState = {
  data: [],
  loading: false,
  error: null,
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case FEATURED_STARS.start:
      return {
        ...state,
        loading: true,
      };

    case FEATURED_STARS.end:
      return {
        ...state,
        loading: false,
      };

    case FEATURED_STARS.success:
      return {
        ...state,
        loading: false,
        data: action.list,
      };

    case FEATURED_STARS.failed:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};
