
import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';
import { updateCelebrityFollow } from '../../../pages/landing/actions/getCelebList';
import { celebDetailstFetchFollowUpdate } from '../../../pages/starProfile/actions/getCelebDetails';
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

export const followCelebrity = (celebrityId, follow, cancelUpdate) => (dispatch, getState) => {
  return fetch.post(Api.followCelebrity, {
    celebrity: celebrityId,
    follow,
  }).then(() => {
    if (!cancelUpdate) {
      if (Object.keys(getState().celebDetails).length) {
        const obj = {
          ...getState().celebDetails,
          userDetails: {
            ...getState().celebDetails.userDetails,
            is_follow: follow,
          },
        };
        dispatch(celebDetailstFetchFollowUpdate(obj));
        // dispatch(updateCelebDetailsFollow(follow));
      }
      // dispatch(updateCelebrityFollow(celebrityId, celebProfessions, follow));
      // dispatch(updateFavouriteList(celebrityId, follow));
    }
  }).catch((exception) => {
    dispatch(followCelebrityFailed(exception));
  });
};
