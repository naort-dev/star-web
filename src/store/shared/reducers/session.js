import { LOGIN } from '../actions/login';

const initalState = {
  isLoggedIn: false,
  loading: false,
  auth_token: '',
  incorrectError: '',
  error: {
    has: false,
    message: '',
  },
  statusCode: undefined,
};

export default (state = { ...initalState }, action) => {
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

    default:
      return state;
  }
};
