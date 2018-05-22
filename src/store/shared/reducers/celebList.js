import { CELEB_LIST } from '../actions/getCelebList';

const initalState = {
  data: [],
  loading: false,
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case CELEB_LIST.start:
      return {
        ...state,
        loading: true,
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
        data: [...state.data, ...action.data.celebrity_list],
        count: action.data.count,
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
