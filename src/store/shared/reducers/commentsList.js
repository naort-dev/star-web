import { COMMENTS_LIST } from '../actions/getVideoComments';

const initalState = {
  data: [],
  loading: false,
  offset: -1,
  count: 0,
  limit: 20,
  error: null,
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case COMMENTS_LIST.start:
      return {
        ...state,
        loading: true,
        data: action.refresh ? [] : state.data,
      };

    case COMMENTS_LIST.end:
      return {
        ...state,
        loading: false,
      };

    case COMMENTS_LIST.success:
      return {
        ...state,
        loading: false,
        offset: action.offset,
        data: action.commentsList,
        count: action.count,
      };

    case COMMENTS_LIST.failed:
      return {
        ...state,
        error: action.error,
      };

    case COMMENTS_LIST.reset:
      return {
        ...initalState,
      };

    default:
      return state;
  }
};
