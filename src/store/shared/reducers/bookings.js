import { SET_BOOKING_DATA, CANCEL_BOOKING_DATA } from '../actions/storeBooking';

const initalState = {
};


export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case SET_BOOKING_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case CANCEL_BOOKING_DATA:
      return {};  
    default:
      return state;
  }
};
