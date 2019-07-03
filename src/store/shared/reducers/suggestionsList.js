import { SUGGESTION_LIST } from '../actions/getSuggestionsList';

const initalState = {
  suggestions: null,
  loading: false,
  error: undefined,
  searchText: undefined,
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case SUGGESTION_LIST.start:
      return {
        ...state,
        loading: true,
        searchText: action.searchText,
      };

    case SUGGESTION_LIST.end:
      return {
        ...state,
        loading: false,
      };

    case SUGGESTION_LIST.success:
      return {
        ...state,
        loading: false,
        suggestions: action.suggestions,
      };

    case SUGGESTION_LIST.failed:
      return {
        ...initalState,
        error: action.error,
      };

    case SUGGESTION_LIST.resetSearchParam:
      return {
        ...initalState,
        searchText: action.searchParam,
      };

    default:
      return state;
  }
};
