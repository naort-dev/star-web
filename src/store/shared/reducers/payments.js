import { PAYMENTS } from '../actions/processPayments';

const initalState = {
  requestDetails: null,
  loading: false,
  requestPostLoading: false,
  paymentStatus: false,
  serverUpdated: false,
  sourceList: {},
  error: null,
  sourceError: null,
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case PAYMENTS.start:
    case PAYMENTS.fetchSourceStart:
    case PAYMENTS.sourceListStart:
    case PAYMENTS.modifYSourceListStart:
      return {
        ...state,
        loading: true,
        error: null,
      };
    
    case PAYMENTS.requestPostStart:
      return {
        ...state,
        requestPostLoading: true,
        error: null,
      };

    case PAYMENTS.end:
    case PAYMENTS.fetchSourceEnd:
    case PAYMENTS.sourceListEnd:
    case PAYMENTS.modifYSourceListEnd:
      return {
        ...state,
        loading: false,
      };

    case PAYMENTS.success:
      return {
        ...state,
        loading: false,
        requestPostLoading: false,
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
        sourceError: {
          code: action.error.code,
          message: action.error.message,
        },
      };

    case PAYMENTS.modifySourceListFailed:
      return {
        ...state,
        loading: false,
        error: {
          code: action.error.code,
          message: action.error.message,
        },
      };

    case PAYMENTS.sourceListSuccess:
      return {
        ...state,
        loading: false,
        sourceList: action.data,
      };
    case PAYMENTS.resetError:
      return {
        ...state,
        error: null,
        sourceError: null,
      }
    default:
      return state;
  }
};
