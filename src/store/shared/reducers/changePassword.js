import { CHANGE_PASSWORD } from '../actions/changePassword';

const initalState = {
  isLoading: false,
  submitStatus: false,
  error: '',
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case CHANGE_PASSWORD.start:
      return {
        ...state,
        isLoading: true,
      };

    case CHANGE_PASSWORD.end:
      return {
        ...state,
        isLoading: false,
      };

    case CHANGE_PASSWORD.success:
      return {
        ...state,
        submitStatus: true,
      };

    case CHANGE_PASSWORD.failed:
      return {
        ...state,
        error: action.error,
      };
    case CHANGE_PASSWORD.reset:
      return {
        ...initalState,
      };

    default:
      return state;
  }
};
