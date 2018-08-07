import { LOGIN } from '../actions/login';

const initialState = {
  isLoggedIn: false,
  loading: false,
  auth_token: '',
  incorrectError: '',
  error: {
    has: false,
    message: '',
  },
  statusCode: undefined,
  starRole: false,
};

export default (state = { ...initialState }, action) => {
  switch (action.type) {
    case LOGIN.start:
      return {
        ...state,
        loading: true,
        incorrectError: '',
      };

    case LOGIN.success:
      return {
        ...state,
        ...action.user,
        isLoggedIn: true,
        loading: false,
        statusCode: undefined,
        auth_token: action.data.user,
        starRole: action.data.user.celebrity,
      };

    case LOGIN.incorrect:
      return {
        ...state,
        incorrectError: action.error,
        statusCode: action.status,
      };

    case LOGIN.failed:
      return {
        ...state,
        loading: false,
        error: {
          has: true,
          message: action.error,
        },
      };
    case LOGIN.end:
      return {
        ...state,
        loading: false,
      };
    case LOGIN.updateLoginStatus:
      return {
        ...state,
        auth_token: action.sessionDetails,
        starRole: action.sessionDetails.celebrity,
        isLoggedIn: true,
      };
    case LOGIN.logout:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
