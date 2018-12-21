
import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';
// import { updateCelebrityFollow } from '../../../pages/landing/actions/getCelebList';
import { updateGroupDetails } from '../../../pages/groupProfile/actions/getGroupDetails';

export const FOLLOW_GROUP_CELEBRITY = {
  followFailed: 'failed/FOLLOW_GROUP_CELEBRITY',
};

export const followGroupCelebrityFailed = error => ({ 
  type: FOLLOW_GROUP_CELEBRITY.followFailed,
  error,
});

export const celebrityFollowStatus = id => (dispatch) => {
  return fetch.post(Api.celebrityGroupFollow, {
    account: id,
  }).then((resp) => {
    dispatch(updateGroupDetails(resp.data, 'star'));
  }).catch((exception) => {
    dispatch(followGroupCelebrityFailed(exception));
  });
};

export const fanFollowStatus = (celebrityId, follow) => (dispatch) => {
  return fetch.post(Api.fanGroupFollow, {
    group: celebrityId,
    follow,
  }).then((resp) => {
    dispatch(updateGroupDetails(resp.data.data.group_follow_response, 'fan'));
  }).catch((exception) => {
    dispatch(followGroupCelebrityFailed(exception));
  });
};
