import { FOLLOW_CELEBRITY } from '../actions/followCelebrity';

const initalState = {
  error: '',
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case FOLLOW_CELEBRITY.followFailed:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};
