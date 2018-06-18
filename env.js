/* eslint-disable */
(function (window) {
  const config = {
    API_URL: 'https://stargramz.qburst.build/api/v1/',
  };

  window.env = key => config[key] || undefined;
}(this || {}));
