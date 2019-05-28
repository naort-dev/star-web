import { LOGIN } from '../actions/login';
import { REGISTER } from '../actions/register';

const initialState = {
  isLoggedIn: false,
  loading: false,
  auth_token: '',
  incorrectError: '',
  tempDetails: {},
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
        tempDetails: {},
        starRole: action.data.user.celebrity,
      };

    case REGISTER.updateTempDetails:
      return {
        ...state,
        loading: false,
        tempDetails: action.data.user,
      }
    case REGISTER.clearErrors:
      return {
        ...state,
        loading: false,
        incorrectError: '',
      }
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
      
    case LOGIN.reset:
      return initialState;

    default:
      return state;
  }
};
