/* eslint-disable */
(function (window) {
  const config = {
    API_URL: 'https://app.staging.starsona.com/api/v1/',
  };
  
  window.env = key => config[key] || undefined;
}(this || {}));
