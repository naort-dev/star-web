
import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';
import { updateCelebrityFollow } from '../../../pages/landing/actions/getCelebList';
import { fetchGroupDetails } from '../../../pages/groupProfile/actions/getGroupDetails';

export const FOLLOW_GROUP_CELEBRITY = {
  followFailed: 'failed/FOLLOW_GROUP_CELEBRITY',
};

export const followGroupCelebrityFailed = error => ({
  type: FOLLOW_GROUP_CELEBRITY.followFailed,
  error,
});

export const celebrityFollowStatus = id => (dispatch, getState) => {
  return fetch.post(Api.celebrityGroupFollow, {
    account: id,
  }).then((resp) => {
    const { user_id } = getState().groupDetails.userDetails;
    dispatch(fetchGroupDetails(user_id));
  }).catch((exception) => {
    dispatch(followGroupCelebrityFailed(exception));
  });
};

export const fanFollowStatus = (celebrityId, follow) => (dispatch, getState) => {
  return fetch.post(Api.fanGroupFollow, {
    group: celebrityId,
    follow: follow,
  }).then((resp) => {
    dispatch(fetchGroupDetails(resp.data.data.group_follow_response.group_user));
  }).catch((exception) => {
    dispatch(followGroupCelebrityFailed(exception));
  });
};
