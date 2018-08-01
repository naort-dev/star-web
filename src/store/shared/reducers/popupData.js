import { RATING, CONTACT_SUPPORT, REPORT_ABUSE, CLEAR_ERROR } from '../actions/popupActions';

const initalState = {
  loading: false,
  submitStatus: false,
  error: '',
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case RATING.start:
      return {
        ...initalState,
        loading: true,
      };

    case RATING.end:
      return {
        ...state,
        loading: false,
      };

    case RATING.success:
      return {
        ...state,
        loading: false,
        submitStatus: true,
      };

    case RATING.failed:
      return {
        ...initalState,
        error: action.error.response.data.error ? action.error.response.data.error.message : '',
      };

    case CONTACT_SUPPORT.start:
      return {
        ...initalState,
        loading: true,
      };

    case CONTACT_SUPPORT.end:
      return {
        ...state,
        loading: false,
      };

    case CONTACT_SUPPORT.success:
      return {
        ...state,
        loading: false,
        submitStatus: true,
      };

    case CONTACT_SUPPORT.failed:
      return {
        ...initalState,
        error: action.error.response.data.error ? action.error.response.data.error.message : '',
      };

    case REPORT_ABUSE.start:
      return {
        ...initalState,
        loading: true,
      };

    case REPORT_ABUSE.end:
      return {
        ...state,
        loading: false,
      };

    case REPORT_ABUSE.success:
      return {
        ...state,
        loading: false,
        submitStatus: true,
      };

    case REPORT_ABUSE.failed:
      return {
        ...initalState,
        error: action.error.response.data.error ? action.error.response.data.error.message : '',
      };


    case CLEAR_ERROR:
      return initalState;

    default:
      return state;
  }
};
