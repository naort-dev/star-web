export const SET_SIGNUP = {
  setSignupFlow: 'set_signup/SET_SIGNUP_FLOW',
  clearSignupFlow: 'set_signup/CLEAR_SIGNUP_FLOW',
  completedSignupFlow: 'set_signup/COMPLETED_SIGNUP_FLOW',
};

export const setSignupFlow = details => ({
  type: SET_SIGNUP.setSignupFlow,
  details,
});

export const clearSignupFlow = () => ({
  type: SET_SIGNUP.clearSignupFlow,
});

export const completedSignup = (iscompleted) => ({
  type: SET_SIGNUP.completedSignupFlow,
  iscompleted,
});
