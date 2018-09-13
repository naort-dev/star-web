export const TOGGLE_MODALS = {
  toggleLogin: 'toggleLogin/TOGGLEMODAL',
  toggleSignup: 'toggleSignup/TOGGLEMODAL',
  toggleRefer: 'toggleRefer/TOGGLEREFER',
  setRequestFlow: 'setRequestFlow/TOGGLEMODAL',
  toggleRequestFlow: 'toggleRequestFlow/TOGGLEMODAL',
  resetRequestFlow: 'resetRequestFlow/TOGGLEMODAL',
};

export const toggleLogin = state => ({
  type: TOGGLE_MODALS.toggleLogin,
  state,
});

export const toggleSignup = state => ({
  type: TOGGLE_MODALS.toggleSignup,
  state,
});

export const toggleRefer = state => ({
  type: TOGGLE_MODALS.toggleRefer,
  state,
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
