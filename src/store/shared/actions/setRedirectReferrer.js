export const REDIRECT = {
  setRedirect: 'REDIRECT/SET_FROM_TO',
  resetUrls: 'REDIRECT/RESET_URLS',
};

export const setRedirectUrls = (to = '/', from = '/') => ({
  type: REDIRECT.setRedirect,
  from,
  to,
});

export const resetRedirectUrls = () => ({
  type: REDIRECT.resetUrls,
});
