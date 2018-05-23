import { CELEB_LIST } from '../actions/getCelebList';

const initalState = {
  data: [],
  loading: false,
  page: -1,
  count: 0,
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case CELEB_LIST.start:
      return {
        ...state,
        loading: true,
        data: action.refresh ? [] : state.data,
      };

    case CELEB_LIST.end:
      return {
        ...state,
        loading: false,
      };

    case CELEB_LIST.success:
      return {
        ...state,
        loading: false,
        page: action.page,
        data: action.list,
        count: action.count,
      };

    case CELEB_LIST.failed:
      return {
        ...initalState,
        loading: false,
      };

    default:
      return state;
  }
};
