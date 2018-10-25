import { MEMBERS_LIST_DETAILS } from '../actions/getMembersList';

const initalState = {
  memberList: {},
  count: 0,
  loading: false,
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
        memberList: action.details.group_list,
        count: action.details.count,
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
