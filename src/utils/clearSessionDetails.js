export const clearSessionDetails = () => {
  if (window.localStorage) {
    localStorage.removeItem('data');
    localStorage.removeItem('userDetails');
    localStorage.removeItem('bioDetails');
    localStorage.removeItem('bookingData');
    window.location.pathname = '/';
  }
};
