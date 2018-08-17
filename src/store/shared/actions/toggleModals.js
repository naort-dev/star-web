export const TOGGLE_MODALS = {
  toggleLogin: 'toggleLogin/TOGGLEMODAL',
  toggleSignup: 'toggleSignup/TOGGLEMODAL',
};

export const toggleLogin = state => ({
  type: TOGGLE_MODALS.toggleLogin,
  state,
});

export const toggleSignup = state => ({
  type: TOGGLE_MODALS.toggleSignup,
  state,
});
