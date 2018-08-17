import { TOGGLE_MODALS } from '../actions/toggleModals';

const initialState = {
  loginModal: false,
  signUpModal: false,
};

export default (state = { ...initialState }, action) => {
  switch (action.type) {
    case TOGGLE_MODALS.toggleLogin:
      return {
        ...state,
        loginModal: action.state,
        signUpModal: false,
      };

    case TOGGLE_MODALS.toggleSignup:
      return {
        ...state,
        signUpModal: action.state,
        loginModal: false,
      };

    default:
      return state;
  }
};
