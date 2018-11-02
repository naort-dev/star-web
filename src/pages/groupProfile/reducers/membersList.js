import { MEMBERS_LIST_DETAILS } from '../actions/getMembersList';

const initalState = {
  memberList: [],
  loading: false,
  offset: -1,
  count: 0,
  limit: 10,
  error: '',
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case MEMBERS_LIST_DETAILS.start:
      return {
        ...state,
        loading: true,
      };

    case MEMBERS_LIST_DETAILS.end:
      return {
        ...state,
        loading: false,
      };

    case MEMBERS_LIST_DETAILS.success:
      return {
        ...state,
        loading: false,
        memberList: action.details,
        count: action.count,
        offset: action.offset,
      };

    case MEMBERS_LIST_DETAILS.failed:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    case MEMBERS_LIST_DETAILS.reset:
      return {
        ...state,
        memberList: {},
      };

    default:
      return state;
  }
};
