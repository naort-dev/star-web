import { GROUP_DETAILS } from '../actions/getGroupDetails';

const initalState = {
  userDetails: {},
  loading: false,
  error: null,
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case GROUP_DETAILS.start:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case GROUP_DETAILS.end:
      return {
        ...state,
        loading: false,
      };

    case GROUP_DETAILS.success:
      return {
        ...state,
        loading: false,
        userDetails: action.details.user,
      };

    case GROUP_DETAILS.failed:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case GROUP_DETAILS.reset:
      return {
        ...state,
        userDetails: {},
      };

    default:
      return state;
  }
};
