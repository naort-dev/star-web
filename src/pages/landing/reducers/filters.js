import { UPDATEFILTER } from '../actions/updateFilters';

const initalState = {
  category: {
    label: 'featured',
    value: '',
  },
  selectedTab: 'Stars',
  searchParam: '',
  lowPrice: '',
  highPrice: '',
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

    case UPDATEFILTER.updateSearchParam:
      return {
        ...state,
        searchParam: action.value,
      };

    case UPDATEFILTER.updatePriceRange:
      return {
        ...state,
        lowPrice: action.low,
        highPrice: action.high,
      };

    default:
      return state;
  }
};
