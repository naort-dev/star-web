import { SET_BOOKING_DATA } from '../actions/storeBooking';

const initalState = {
};


export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case SET_BOOKING_DATA:
      return {
        ...state,
        ...action.payload,
      };

    default:
      return state;
  }
};
