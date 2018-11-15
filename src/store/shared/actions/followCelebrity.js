
import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';
import { updateCelebrityFollow } from '../../../pages/landing/actions/getCelebList';
import { updateCelebDetailsFollow } from '../../../pages/starProfile/actions/getCelebDetails';
import { updateFavouriteList } from '../../../pages/favourites/actions/getFavouritesList';

export const FOLLOW_CELEBRITY = {
  followFailed: 'failed/FOLLOW_CELEBRITY',
  setFollowQueue: 'set_follow_queue/FOLLOW_CELEBRITY',
  resetFollowQueue: 'reset_follow_queue/FOLLOW_CELEBRITY',
};

export const followCelebrityFailed = error => ({
  type: FOLLOW_CELEBRITY.followFailed,
  error,
});

export const updateFavouritesQueue = (celebId, celebProfessions, follow) => ({
  type: FOLLOW_CELEBRITY.setFollowQueue,
  celebId,
  celebProfessions,
  follow,
});

export const resetFavouritesQueue = () => ({
  type: FOLLOW_CELEBRITY.resetFollowQueue,
});

export const followCelebrity = (celebrityId, celebProfessions, follow, cancelUpdate) => (dispatch, getState) => {
  const { auth_token } = getState().session;
  return fetch.post(Api.followCelebrity, {
    celebrity: celebrityId,
    follow,
  }, {
    headers: {
      'Authorization': `token ${auth_token.authentication_token}`,
    },
  }).then((resp) => {
    if (!cancelUpdate) {
      if (Object.keys(getState().celebDetails).length) {
        dispatch(updateCelebDetailsFollow(follow));
      }
      dispatch(updateCelebrityFollow(celebrityId, celebProfessions, follow));
      dispatch(updateFavouriteList(celebrityId, follow));
    }
  }).catch((exception) => {
    dispatch(followCelebrityFailed(exception));
  });
};
