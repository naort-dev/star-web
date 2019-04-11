import { UPDATEFILTER } from '../actions/updateFilters';

const initalState = {
  category: {
    label: 'featured',
    value: '',
    subCategories: [],
  },
  searchParam: '',
  lowPrice: '',
  highPrice: '',
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
        [action.category]: action.selectedList,
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
