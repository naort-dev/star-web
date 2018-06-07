import { LOGIN } from '../actions/login';
import { REGISTER } from '../actions/register';

const initialState = {
  isLoggedIn: false,
  loading: false,
  auth_token: '',
  incorrectError: '',
  error: {
    has: false,
    message: '',
  },
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
        auth_token: action.data.user,
      };

    case LOGIN.incorrect:
      return {
        ...state,
        incorrectError: action.error,
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
    case LOGIN.logout:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
