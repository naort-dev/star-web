import { OCCASION_LIST } from '../../requestvideo/actions/getOccasionList';

const initalState = {
  data: [],
  loading: false,
};

export default (state = initalState, action) => {
  switch (action.type) {
    case OCCASION_LIST.start:
      return {
        ...state,
        loading: true,
      };
    case OCCASION_LIST.end:
      return {
        ...state,
        loading: false,
      };
    case OCCASION_LIST.success:
      return {
        ...state,
        loading: false,
        data: action.details.occasion_list,
      };
    case OCCASION_LIST.failed:
      return {
        ...state,
        loading: false,
      };
    case OCCASION_LIST.reset:
      return {
        ...state,
        data: [],
      };

    default:
      return state;
  }
};
