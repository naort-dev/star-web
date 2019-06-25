import { ACTIVITIES_LIST } from '../actions/getActivities';

const initalState = {
  data: [],
  loading: false,
  offset: -1,
  count: 0,
  limit: 20,
  error: null,
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case ACTIVITIES_LIST.start:
      return {
        ...state,
        loading: true,
        data: action.refresh ? [] : state.data,
      };

    case ACTIVITIES_LIST.end:
      return {
        ...state,
        loading: false,
      };

    case ACTIVITIES_LIST.success:
      return {
        ...state,
        loading: false,
        offset: action.offset,
        data: action.activitiesList,
        count: action.count,
      };

    case ACTIVITIES_LIST.failed:
      return {
        ...state,
        error: action.error,
      };

    case ACTIVITIES_LIST.reset:
      return {
        ...initalState,
      };

    default:
      return state;
  }
};
