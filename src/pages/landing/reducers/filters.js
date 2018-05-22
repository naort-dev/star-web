import { UPDATEFILTER } from '../actions/updateFilters';

const initalState = {
  category: '',
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case UPDATEFILTER.updateCategory:
      return {
        ...state,
        category: action.value,
      };

    default:
      return state;
  }
};
