import { TOGGLE_MODALS } from '../actions/toggleModals';

const initialState = {
  loginModal: false,
  signUpModal: false,
  quickViewModal: {
    active: false,
    data: null,
  },
  requestFlow: false,
  signUpDetails: null,
  requestFlowDetails: null,
  bookingModal: {
    requestId: null,
    active: false,
    data: null,
    starMode: false,
  },
  popUp: false,
};

export default (state = { ...initialState }, action) => {
  switch (action.type) {
    case TOGGLE_MODALS.toggleLogin:
      return {
        ...state,
        loginModal: action.state,
        signUpModal: false,
        signUpDetails: null,
      };

    case TOGGLE_MODALS.toggleSignup:
      return {
        ...state,
        signUpModal: action.state,
        loginModal: false,
        signUpDetails: {
          ...state.signUpDetails,
          type: action.signUpType,
          step: action.step,
          enableClose: action.enableClose,
        },
      };

    case TOGGLE_MODALS.toggleQuickView:
      return {
        ...state,
        quickViewModal: {
          ...state.quickViewModal,
          active: action.state,
          data: action.modalData,
        },
      };

    case TOGGLE_MODALS.toggleRequestFlow:
      return {
        ...state,
        requestFlow: action.state,
      };

    case TOGGLE_MODALS.setRequestFlow:
      return {
        ...state,
        requestFlow: true,
        requestFlowDetails: {
          celebId: action.celebId,
          type: action.requestType ? action.requestType : null,
          step: action.step ? action.step : 0,
        },
      };

    case TOGGLE_MODALS.resetRequestFlow:
      return {
        ...state,
        requestFlow: false,
        requestFlowDetails: null,
      };

    case TOGGLE_MODALS.toggleBookingModal:
      return {
        ...state,
        bookingModal: {
          ...state.bookingModal,
          active: action.state,
          requestId: action.bookingData && action.bookingData.id,
          starMode: action.starMode,
        },
      };

    case TOGGLE_MODALS.togglePopup:
      return {
        ...state,
        popUp: action.state,
      };

    default:
      return state;
  }
};
