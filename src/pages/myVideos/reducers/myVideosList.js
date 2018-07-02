import { MY_VIDEOS_LIST } from '../actions/getMyVideosList';

const initalState = {
  data: [],
  loading: false,
  offset: -1,
  count: 0,
  limit: 20,
  status: 'all',
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case MY_VIDEOS_LIST.start:
      return {
        ...state,
        loading: true,
        data: action.refresh ? [] : state.data,
      };

    case MY_VIDEOS_LIST.end:
      return {
        ...state,
        loading: false,
      };

    case MY_VIDEOS_LIST.success:
      return {
        ...state,
        loading: false,
        offset: action.offset,
        data: action.list,
        count: action.count,
        status: action.videoStatus,
      };

    case MY_VIDEOS_LIST.failed:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};
