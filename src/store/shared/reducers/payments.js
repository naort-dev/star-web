import { PAYMENTS } from '../actions/processPayments';

const initalState = {
  requestDetails: {},
  loading: false,
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case PAYMENTS.start:
      return {
        ...state,
        loading: true,
      };

    case PAYMENTS.end:
      return {
        ...state,
        loading: false,
      };

    case PAYMENTS.success:
      return {
        ...state,
        loading: false,
        requestDetails: action.data,
      };

    case PAYMENTS.failed:
      return {
        ...initalState,
        loading: false,
      };

    default:
      return state;
  }
};
