import { FEATURED_STARS } from '../actions/getFeaturedStars';

const initalState = {
  homeFeatured: {
    title: '',
    data: [],
    homeVideos: [],
  },
  loading: false,
  error: null,
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case FEATURED_STARS.start:
      return {
        ...state,
        loading: true,
        token: action.token,
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
        homeFeatured: {
          title: action.title,
          data: action.list,
          homeVideos: action.homePageVideos,
        },
      };

    case FEATURED_STARS.successCategory:
      return {
        ...state,
        loading: false,
        [action.profession.label]: {
          title: action.title,
          data: action.list,
        },
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
