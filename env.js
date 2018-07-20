/* eslint-disable */
(function (window) {
  const config = {
  API_URL: 'https://app.staging.starsona.com/api/v1/',
  SERVER_URL: 'https://app.staging.starsona.com/',
  STRIPE_PUBLISH_KEY: 'pk_test_RBSzULFNLChp2ACqsYRkMJPV',
  fbId: '1638565172829009',
  instaId: '8bea5765428248eca3a09d288ef7e4c2',
  loginInstaRedirectUri: 'https://staging.starsona.com/login',
  signupInstaRedirectUri: 'https://staging.starsona.com/signup',
  instaUrl: 'https://api.instagram.com/v1/users/self/?access_token=',
  instaAuthUrl: 'https://api.instagram.com/oauth/authorize/',
  stripe_api_version: '2017-08-15',
  };
  window.env = key => config[key] || undefined;
  }(this || {}));
