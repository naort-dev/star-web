import { CELEB_GROUP_LIST } from '../actions/getCelebGroups';

const initalState = {
  groupList: [],
  loading: false,
  offset: -1,
  count: 0,
  limit: 10,
  error: '',
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case CELEB_GROUP_LIST.start:
      return {
        ...state,
        loading: true,
      };

    case CELEB_GROUP_LIST.end:
      return {
        ...state,
        loading: false,
      };

    case CELEB_GROUP_LIST.success:
      return {
        ...state,
        loading: false,
        groupList: action.details,
        count: action.count,
        offset: action.offset,
      };

    case CELEB_GROUP_LIST.failed:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case CELEB_GROUP_LIST.reset:
      return initalState;

    default:
      return state;
  }
};
