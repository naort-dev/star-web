export const SET_SIGNUP = {
  setSignupFlow: 'set_signup/SET_SIGNUP_FLOW',
  clearSignupFlow: 'set_signup/CLEAR_SIGNUP_FLOW',
};

export const setSignupFlow = details => ({
  type: SET_SIGNUP.setSignupFlow,
  details,
});

export const clearSignupFlow = () => ({
  type: SET_SIGNUP.clearSignupFlow,
});
