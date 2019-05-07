import { MEMBER_LIST } from '../actions/getMemberList';

const initalState = {
  data: [],
  loading: false,
  offset: -1,
  count: 0,
  limit: 15,
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case MEMBER_LIST.start:
      return {
        ...state,
        loading: true,
        data: action.refresh ? [] : state.data,
      };

    case MEMBER_LIST.end:
      return {
        ...state,
        loading: false,
      };

    case MEMBER_LIST.success:
      return {
        ...state,
        loading: false,
        offset: action.offset,
        data: action.list,
        count: action.count,
      };

    case MEMBER_LIST.failed:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};
