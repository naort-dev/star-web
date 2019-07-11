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
  sortValue: 'popularity',
  tag: {},
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
        tag: {},
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
        tag: {},
      };

    case UPDATEFILTER.updateSelectedTag:
      return {
        ...state,
        category: {
          label: '',
          value: 0,
          subCategories: [],
          selected: [],
        },
        tag: {
          label: action.tagName,
          id: action.tagId,
        },
      };

    default:
      return state;
  }
};
