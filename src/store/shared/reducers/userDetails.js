import { USER_DETAILS } from '../actions/getUserDetails';

const initalState = {
  settings_celebrityDetails: {},
  settings_userDetails: {},
  loading: false,
  starRole: false,
  error: '',
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case USER_DETAILS.start:
      return {
        ...state,
        loading: true,
      };

    case USER_DETAILS.end:
      return {
        ...state,
        loading: false,
      };

    case USER_DETAILS.success:
      return {
        ...state,
        loading: false,
        settings_celebrityDetails: { ...action.details.celebrity_details },
        settings_userDetails: { ...action.details.user },
        starRole: action.details.user.celebrity,
      };

    case USER_DETAILS.failed:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case USER_DETAILS.updateStarRole:
      return {
        ...state,
        starRole: action.role,
      };

    case USER_DETAILS.reset:
      return {
        ...state,
        settings_celebrityDetails: {},
        settings_userDetails: {},
        starRole: false,
      };

    default:
      return state;
  }
};
