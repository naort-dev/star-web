import { SET_SIGNUP } from '../actions/setSignupFlow';

const initialState = {
  role: '',
  currentStep: 0,
  isSocial: false,
  firstName: '',
  lastName: '',
  nickName: '',
  email: '',
  fbId: '',
  gpId: '',
  instId: '',
  twId: '',
  profileImage: null,
  categoryList: [],
  welcomeVideoSkip: false,
  welcomeVideo: '',
  price: '',
  referral: '',
};

export default (state = { ...initialState }, action) => {
  switch (action.type) {
    case SET_SIGNUP.setSignupFlow:
      return {
        ...state,
        ...action.details,
      };

    case SET_SIGNUP.clearSignupFlow:
      return initialState;

    default:
      return state;
  }
};
