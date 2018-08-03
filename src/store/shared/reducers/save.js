import { UPDATE_USER_DETAILS } from '../actions/getUserDetails';

const initalState = {
  loading: false,
  error: '',
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case UPDATE_USER_DETAILS.start:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_USER_DETAILS.end:
      return {
        ...state,
        loading: false,
      };

    case UPDATE_USER_DETAILS.success:
      return {
        ...state,
        loading: false,
      };

    case UPDATE_USER_DETAILS.failed:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

   
    default:
      return state;
  }
};
