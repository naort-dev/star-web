import { CONFIG } from '../actions/getConfig';

const initalState = {
  data: {},
  loading: false,
  error: null,
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case CONFIG.start:
      return {
        ...state,
        loading: true,
      };

    case CONFIG.end:
      return {
        ...state,
        loading: false,
      };

    case CONFIG.success:
      return {
        ...state,
        loading: false,
        data: action.data,
      };

    case CONFIG.failed:
      return {
        ...initalState,
        loading: false,
      };

    default:
      return state;
  }
};
