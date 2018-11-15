import { FOLLOW_CELEBRITY } from '../actions/followCelebrity';

const initalState = {
  error: '',
  celebId: null,
  celebProfessions: [],
  follow: null,
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case FOLLOW_CELEBRITY.followFailed:
      return {
        ...state,
        error: action.error,
      };

    case FOLLOW_CELEBRITY.setFollowQueue:
      return {
        ...state,
        celebId: action.celebId,
        celebProfessions: action.celebProfessions,
        follow: action.follow,
      };

    case FOLLOW_CELEBRITY.resetFollowQueue:
      return initalState;

    default:
      return state;
  }
};
