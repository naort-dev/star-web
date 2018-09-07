/* eslint-disable */
(function (window) {
  const config = {
  API_URL: 'https://app.staging.starsona.com/api/v1/',
  SERVER_URL: 'https://app.staging.starsona.com/',
  STRIPE_PUBLISH_KEY: 'pk_test_RBSzULFNLChp2ACqsYRkMJPV',
  fbId: '1638565172829009',
  device: 'ios',
  ApiVersion: '4.4',
  instaId: '8bea5765428248eca3a09d288ef7e4c2',
  androidAppId: 'com.starsona.app',
  iosAppId: '1294478616',
  loginInstaRedirectUri: window.location.origin+'/instalogin',
  instaUrl: 'https://api.instagram.com/v1/users/self/?access_token=',
  instaAuthUrl: 'https://api.instagram.com/oauth/authorize/',
  stripe_api_version: '2017-08-15',
  GOOGLE_TAG_MANAGER_ID: 'GTM-NHBZLQ9',
  };
  window.env = key => config[key] || undefined;
  }(this || {}));
