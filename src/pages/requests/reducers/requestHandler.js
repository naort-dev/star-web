import { REQUESTS } from '../actions/handleRequests';

const initialState = {
  loading: false,
  error: {
    has: false,
    message: '',
  },
};

export default (state = { ...initialState }, action) => {
  switch (action.type) {
    case REQUESTS.start:
      return {
        ...state,
        loading: true,
      };

    // case REQUESTS.success:
    //   return {
    //     ...state,
    //     ...action.user,
    //     isLoggedIn: true,
    //     loading: false,
    //     statusCode: undefined,
    //     auth_token: action.data.user,
    //     starRole: action.data.user.celebrity,
    //   };

    case REQUESTS.failed:
      return {
        ...state,
        loading: false,
        error: {
          has: true,
          message: action.error,
        },
      };

    case REQUESTS.end:
      return {
        ...state,
        loading: false,
      };

    case REQUESTS.logout:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
