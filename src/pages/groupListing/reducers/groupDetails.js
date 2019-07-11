import { GROUP_DETAILS } from '../actions/getGroupDetails';

const initalState = {
  data: [],
  loading: false,
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case GROUP_DETAILS.start:
      return {
        ...state,
        loading: true,
        data: state.data,
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
        data: action.data,
      };

    case GROUP_DETAILS.failed:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};
