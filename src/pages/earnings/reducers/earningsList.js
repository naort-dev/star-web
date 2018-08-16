import { EARNINGS_LIST } from '../actions/getEarningsList';

const initalState = {
  list: {},
  paidList: [],
  pendingList: [],
  paidCount: 0,
  pendingCount: 0,
  paidOffset: 0,
  pendingOffset: 0,
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
        paidLoading: action.status === 2 ? true : state.paidLoading,
        pendingLoading: action.status === 1 ? true : state.pendingLoading,
      };

    case EARNINGS_LIST.end:
      return {
        ...state,
        loading: false,
        paidLoading: action.status === 2 ? false : state.paidLoading,
        pendingLoading: action.status === 1 ? false : state.pendingLoading,
      };

    case EARNINGS_LIST.success:
      return {
        ...state,
        loading: false,
        list: action.list,
        paidAmount: action.list.Paid_amount,
        pendingAmount: action.list.Pending_amount,
        totalAmount: action.list.Total_amount,
      };

    case EARNINGS_LIST.pendingSuccess:
      return {
        ...state,
        loading: false,
        pendingList: [...state.pendingList, ...action.list.earning_list],
        paidAmountPendingPage: action.list.Paid_amount,
        pendingAmountPendingPage: action.list.Pending_amount,
        totalAmountPendingPage: action.list.Total_amount,
        pendingCount: action.list.count,
        pendingOffset: action.offset,
      };

    case EARNINGS_LIST.paidSuccess:
      return {
        ...state,
        loading: false,
        paidList: [...state.paidList, ...action.list.earning_list],
        paidAmountPaidPage: action.list.Paid_amount,
        pendingAmountPaidPage: action.list.Pending_amount,
        totalAmountPaidPage: action.list.Total_amount,
        paidCount: action.list.count,
        paidOffset: action.offset,
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
