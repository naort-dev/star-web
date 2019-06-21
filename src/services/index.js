import Api from '../lib/api';
import { fetch } from './fetch';

export const getStarsonaVideo = (videoId) => {
  return (fetch(`${Api.starsonaVideo}${videoId}/get/`)
    .then(resp => resp.data)
  );
};

export const twitterLogin = () => {
  return (fetch(Api.twitterLogin)
    .then(resp => resp.data)
  )
};

export const twitterAuth = (oauthToken, oauthVerifier) => {
  return (fetch(`${Api.twitterOauth}?oauth_token=${oauthToken}&oauth_verifier=${oauthVerifier}`)
    .then(resp => resp.data)
  )
};

export const validatePromo = (promo) => {
  return (fetch.post(Api.validatePromo, {
    referral_code: promo,
  }))
    .then(resp => resp.data)
}

export const updateUnseenCount = () => {
  return (fetch(Api.updateUnseenCount)
    .then(resp => resp.data)
  )
}
