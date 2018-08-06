import { EARNINGS_LIST } from '../actions/getEarningsList';

const initalState = {
  paidList: [],
  pendingList: [],
  paidAmount: null,
  pendingAmount: null,
  totalAmount: null,
  loading: false,
  error: null,
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case EARNINGS_LIST.start:
      return {
        ...state,
        loading: true,
      };

    case EARNINGS_LIST.end:
      return {
        ...state,
        loading: false,
      };

    case EARNINGS_LIST.success:
      return {
        ...state,
        loading: false,
        paidList: action.list.Paid,
        pendingList: action.list.Pending,
        paidAmount: action.list.Paid_amount,
        pendingAmount: action.list.Pending_amount,
        totalAmount: action.list.Total_amount,
      };

    case EARNINGS_LIST.failed:
      return {
        ...state,
        error: action.error,
      };

    default:
      return state;
  }
};
