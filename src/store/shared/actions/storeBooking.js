
export const SET_BOOKING_DATA = 'setBookingData';
export const CANCEL_BOOKING_DATA = 'cancelBookingData';
export const setBookingDetails = data => ({
  type: SET_BOOKING_DATA,
  payload: data,
});
export const cancelBookingDetails = data => ({
  type: CANCEL_BOOKING_DATA,
  payload: data,
});


// export const storeBookingDetails = data => (dispatch) => {
//   dispatch(bookFetchStart(data));
// };
