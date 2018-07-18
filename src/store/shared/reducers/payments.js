import { PAYMENTS } from '../actions/processPayments';

const initalState = {
  requestDetails: {},
  loading: false,
  paymentStatus: false,
  sourceList: [],
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case PAYMENTS.start:
    case PAYMENTS.fetchSourceStart:
    case PAYMENTS.sourceListStart:
      return {
        ...state,
        loading: true,
      };
      
    case PAYMENTS.end:
    case PAYMENTS.fetchSourceEnd:
    case PAYMENTS.sourceListEnd:
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
    case PAYMENTS.sourceListFailed:
      return {
        ...state,
        loading: false,
      };

    case PAYMENTS.sourceListSuccess:
      return {
        ...state,
        loading: false,
        sourceList: action.data,
      };

    default:
      return state;
  }
};
