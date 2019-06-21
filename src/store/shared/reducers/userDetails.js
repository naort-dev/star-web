import { USER_DETAILS } from '../actions/getUserDetails';

const initialState = {
  settings_celebrityDetails: {},
  settings_userDetails: {},
  loading: false,
  userDataLoaded: false,
  isStar: false,
  role: '',
  error: '',
};

export default (state = { ...initialState }, action) => {
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
        isStar: action.details.user.celebrity,
        userDataLoaded: true,
        role: action.details.user.role_details.role_code,
      };

    case USER_DETAILS.failed:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case USER_DETAILS.reset:
      return {
        ...state,
        settings_celebrityDetails: {},
        settings_userDetails: {},
        isStar: false,
        role: '',
        userDataLoaded: false,
      };
    case USER_DETAILS.updateUserDetails:
      return {
        ...state,
        settings_userDetails: action.data.userDetails,
        settings_celebrityDetails: action.data.celbDetails,
      };
    default:
      return state;
  }
};
