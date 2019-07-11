import { SUB_CATEGORY_LIST } from '../actions/getSubCategoryLists';

const initalState = {
  categories: [],
  loading: false,
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case SUB_CATEGORY_LIST.start:
      return {
        ...state,
        loading: true,
      };

    case SUB_CATEGORY_LIST.end:
      return {
        ...state,
        loading: false,
      };

    case SUB_CATEGORY_LIST.success:
      return {
        ...state,
        loading: false,
        categories: action.data,
      };

    case SUB_CATEGORY_LIST.failed:
      return {
        ...initalState,
        loading: false,
      };

    default:
      return state;
  }
};
