import { UPDATEFILTER } from '../actions/updateFilters';

const initalState = {
  category: {
    label: 'featured',
    value: '',
  },
  selectedTab: 'Stars',
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case UPDATEFILTER.updateCategory:
      return {
        ...state,
        category: {
          label: action.label,
          value: action.value,
        },
      };

    case UPDATEFILTER.switchTab:
      return {
        ...state,
        selectedTab: action.label,
      };

    default:
      return state;
  }
};
