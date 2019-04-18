import { UPDATEFILTER } from '../actions/updateFilters';

const initalState = {
  category: {
    label: 'Featured',
    value: 0,
    subCategories: [],
    selected: [],
  },
  searchParam: '',
  lowPrice: 0,
  highPrice: 500,
  sortValue: 'featured',
  selectedVideoType: '',
  selectedVideoDate: '',
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case UPDATEFILTER.updateCategory:
      return {
        ...state,
        category: {
          label: action.label,
          value: action.value,
          subCategories: action.subCategories,
          selected: [],
        },
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

    case UPDATEFILTER.updateSort:
      return {
        ...state,
        sortValue: action.value,
      };

    case UPDATEFILTER.updateSelectedSubCategory:
      return {
        ...state,
        category: {
          ...state.category,
          selected: action.selectedList,
        },
      };

    case UPDATEFILTER.updateSelectedVideoType:
      return {
        ...state,
        selectedVideoType: action.value,
      };

    case UPDATEFILTER.updateSelectedVideoDate:
      return {
        ...state,
        selectedVideoDate: action.timeSpan,
      };

    default:
      return state;
  }
};
