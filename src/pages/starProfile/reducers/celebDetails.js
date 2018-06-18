import { CELEB_DETAILS } from '../actions/getCelebDetails';

const initalState = {
  celebrityDetails: {},
  userDetails: {},
  loading: false,
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case CELEB_DETAILS.start:
      return {
        ...state,
        loading: true,
      };

    case CELEB_DETAILS.end:
      return {
        ...state,
        loading: false,
      };

    case CELEB_DETAILS.success:
      return {
        ...state,
        loading: false,
        celebrityDetails: action.details.celebrity_details,
        userDetails: action.details.user,
      };

    case CELEB_DETAILS.failed:
      return {
        ...state,
        loading: false,
      };

    case CELEB_DETAILS.reset:
      return {
        ...state,
        celebrityDetails: {},
        userDetails: {},
      };

    default:
      return state;
  }
};
