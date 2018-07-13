import { PAYMENTS } from '../actions/processPayments';

const initalState = {
  requestDetails: {},
  loading: false,
  paymentStatus: false,
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case PAYMENTS.start:
    case PAYMENTS.fetchSourceStart:
      return {
        ...state,
        loading: true,
      };
      
    case PAYMENTS.end:
    case PAYMENTS.fetchSourceEnd:
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

    case PAYMENTS.setPaymentStatus:
      return {
        ...state,
        loading: false,
        paymentStatus: action.status,
      };

    case PAYMENTS.resetPayments:
      return initalState;

    case PAYMENTS.failed:
      return {
        ...initalState,
        loading: false,
      };

    default:
      return state;
  }
};
