import { OTHER_RELATION } from '../actions/otherRelation';

const initialState = {
  loading: false,
  data: {},
};

export default (state = { ...initialState }, action) => {
  switch (action.type) {
    case OTHER_RELATION.start:
      return {
        ...state,
        loading: true,
      };

    case OTHER_RELATION.success:
      return {
        ...state,
        loading: false,
        data: action.data,
      };

    case OTHER_RELATION.failed:
      return {
        ...state,
        loading: false,
      };
    case OTHER_RELATION.end:
      return {
        ...state,
        loading: false,
      };
    case OTHER_RELATION.reset:
      return {
        ...state,
        loading: false,
        data: {},
      };
    default:
      return state;
  }
};
