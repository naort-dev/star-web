/* eslint-disable */
(function (window) {
  const config = {
    API_URL: '<API url goes here>',
  };
  
  window.env = key => config[key] || undefined;
}(this || {}));