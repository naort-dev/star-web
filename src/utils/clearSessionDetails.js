export const clearSessionDetails = () => {
  if (window.localStorage) {
    localStorage.removeItem('data');
    localStorage.removeItem('bioDetails');
    localStorage.removeItem('bookingData');
  }
};
