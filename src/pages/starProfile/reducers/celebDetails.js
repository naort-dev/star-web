import { CELEB_DETAILS } from '../actions/getCelebDetails';

const initalState = {
  data: [],
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
        data: action.details,
      };

    case CELEB_DETAILS.failed:
      return {
        ...initalState,
        loading: false,
      };

    default:
      return state;
  }
};
