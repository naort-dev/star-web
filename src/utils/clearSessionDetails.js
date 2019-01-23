export const clearSessionDetails = () => {
  if (window.localStorage) {
    localStorage.removeItem('data');
    localStorage.removeItem('userDetails');
    localStorage.removeItem('bioDetails');
    localStorage.removeItem('bookingData');
  }
  if (window.gapi && window.gapi.auth2) {
    window.gapi.auth2.getAuthInstance().signOut();
  }
};
