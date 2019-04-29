import { TOGGLE_MODALS } from '../actions/toggleModals';

const initialState = {
  loginModal: false,
  signUpModal: false,
  referModal: false,
  requestFlow: false,
  signUpDetails: null,
  requestFlowDetails: null,
  requestPopup: false,
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

    case TOGGLE_MODALS.toggleRefer:
      return {
        ...state,
        referModal: action.state,
        loginModal: false,
        signUpModal: false,
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

    case TOGGLE_MODALS.toggleRequestPopup:
      return {
        ...state,
        requestPopup: action.state,
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
