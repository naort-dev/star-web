import { GROUP_TYPES } from '../actions/getGroupTypes';

const initalState = {
  data: [],
  loading: false,
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case GROUP_TYPES.start:
      return {
        ...state,
        loading: true,
      };

    case GROUP_TYPES.end:
      return {
        ...state,
        loading: false,
      };

    case GROUP_TYPES.success:
      return {
        ...state,
        loading: false,
        data: action.data,
      };

    case GROUP_TYPES.failed:
      return {
        ...initalState,
        loading: false,
      };

    default:
      return state;
  }
};
