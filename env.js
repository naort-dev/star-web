/* eslint-disable */
(function (window) {
  var config = {
  API_URL: 'https://app.staging.starsona.com/api/v1/',
  fbId: '1638565172829009',
  instaId: '8bea5765428248eca3a09d288ef7e4c2',
  loginInstaRedirectUri: 'https://staging.starsona.com/login',
  signupInstaRedirectUri: 'https://staging.starsona.com/signup',
  instaUrl: 'https://api.instagram.com/v1/users/self/?access_token=',
  instaAuthUrl: 'https://api.instagram.com/oauth/authorize/',
  };
  window.env = key => config[key]
  // window.env = key => Object.hasOwnProperty(key) ? env[key] : undefined;
  }(this || {}));
