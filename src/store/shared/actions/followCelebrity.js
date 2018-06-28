
import Api from '../../../lib/api';
import { fetch, CancelToken } from '../../../services/fetch';
import { updateCelebrityFollow } from '../../../pages/landing/actions/getCelebList';
import { updateFavouriteList } from '../../../pages/favourites/actions/getFavouritesList';

export const FOLLOW_CELEBRITY = {
  followFailed: 'failed/FOLLOW_CELEBRITY',
};

export const followCelebrityFailed = error => ({
  type: FOLLOW_CELEBRITY.followFailed,
  error,
});

export const followCelebrity = (celebrityId, celebProfessions, follow) => (dispatch, getState) => {
  const { isLoggedIn, auth_token } = getState().session;
  return fetch.post(Api.followCelebrity, {
    celebrity: celebrityId,
    follow,
  }, {
    headers: {
      'Authorization': `token ${auth_token.authentication_token}`,
    },
  }).then((resp) => {
    dispatch(updateCelebrityFollow(celebrityId, celebProfessions, follow));
    dispatch(updateFavouriteList(celebrityId, follow));
  }).catch((exception) => {
    dispatch(followCelebrityFailed(exception));
  });
};


