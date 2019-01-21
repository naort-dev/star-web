import { CELEB_DETAILS } from '../actions/getCelebDetails';

const initalState = {
  celebrityDetails: {},
  userDetails: {},
  loading: false,
  error: '',
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

    case CELEB_DETAILS.update:
      return {
        ...state,
        loading: false,
        celebrityDetails: action.details ? action.details.celebrityDetails: '',
        userDetails: action.details ? action.details.userDetails: '',
      };

    case CELEB_DETAILS.failed:
      return {
        ...state,
        loading: false,
        error: action.error,
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
