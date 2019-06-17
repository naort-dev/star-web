export const TOGGLE_MODALS = {
  toggleLogin: 'toggleLogin/TOGGLE_MODAL',
  toggleSignup: 'toggleSignup/TOGGLE_MODAL',
  toggleQuickView: 'toggleQuickView/TOGGLE_QUICK_VIEW',
  setRequestFlow: 'setRequestFlow/TOGGLE_MODAL',
  toggleRequestFlow: 'toggleRequestFlow/TOGGLE_MODAL',
  resetRequestFlow: 'resetRequestFlow/TOGGLE_MODAL',
  toggleBookingModal: 'toggleBookingModal/TOGGLE_MODAL',
  toggleUpdateBooking: 'toggleUpdateBooking/TOGGLE_MODAL',
};

export const toggleLogin = state => ({
  type: TOGGLE_MODALS.toggleLogin,
  state,
});

export const toggleSignup = (state, signUpType, step, enableClose) => ({
  type: TOGGLE_MODALS.toggleSignup,
  state,
  signUpType,
  step,
  enableClose,
});

export const toggleQuickView = (state, modalData) => ({
  type: TOGGLE_MODALS.toggleQuickView,
  state,
  modalData,
});

export const toggleRequestFlow = state => ({
  type: TOGGLE_MODALS.toggleRequestFlow,
  state,
});

export const setRequestFlow = (celebId, requestType, step) => ({
  type: TOGGLE_MODALS.setRequestFlow,
  celebId,
  requestType,
  step,
});

export const resetRequestFlow = () => ({
  type: TOGGLE_MODALS.resetRequestFlow,
});

export const toggleUpdateBooking = (state,requestId, starMode) => ({
  type: TOGGLE_MODALS.toggleUpdateBooking,
  state,
  requestId,
  starMode,
});

export const toggleBookingModal = (state, bookingData, starMode) => ({
  type: TOGGLE_MODALS.toggleBookingModal,
  state,
  bookingData,
  starMode,
});
