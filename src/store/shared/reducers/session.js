import { LOGIN } from '../actions/login';
import { REGISTER } from '../actions/register';

const initalState = {
  isLoggedIn: false,
  loading: false,
  auth_token: '',
  error: {
    has: false,
    message: '',
  },
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case LOGIN.start:
      return {
        ...state,
        loading: true,
      };

    case LOGIN.success:
      return {
        ...state,
        ...action.user,
        isLoggedIn: true,
        loading: false,
        auth_token: action.data.user,
      };

    case LOGIN.failed:
      return {
        ...state,
        loading: false,
        error: {
          has: true,
          message: action.message,
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
