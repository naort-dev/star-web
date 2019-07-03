import { BOOKINGS_LIST } from '../actions/getBookingsList';

const initalState = {
  data: [],
  loading: false,
  offset: -1,
  count: 0,
  limit: 20,
  highCancel: false,
  highCancelCount: 0,
  status: 'all',
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case BOOKINGS_LIST.start:
      return {
        ...state,
        loading: true,
        data: action.refresh ? [] : state.data,
        token: action.token,
      };

    case BOOKINGS_LIST.end:
      return {
        ...state,
        loading: false,
      };

    case BOOKINGS_LIST.success:
      return {
        ...state,
        loading: false,
        offset: action.offset,
        data: action.list,
        highCancel: action.miscData.highCancel,
        highCancelCount: action.miscData.highCancelCount,
        count: action.count,
        status: action.videoStatus,
      };

    case BOOKINGS_LIST.failed:
      return {
        ...state,
        error: action.error,
      };

    case BOOKINGS_LIST.updateList:
      return {
        ...state,
        data: action.data,
      };

    case BOOKINGS_LIST.update:
      return {
        ...state,
        data: action.data,
      };

    case BOOKINGS_LIST.reset:
      return initalState;

    default:
      return state;
  }
};
