
import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';
import { fetchGroupMembers } from './getMembersList';

export const GROUP_DETAILS = {
  start: 'fetch_start/group_details',
  end: 'fetch_end/group_details',
  success: 'fetch_success/group_details',
  failed: 'fetch_failed/group_details',
  reset: 'reset/group_details',
  update: 'updateGroupDetails/group_details',
};

export const groupDetailsFetchStart = () => ({
  type: GROUP_DETAILS.start,
});

export const groupDetailstFetchEnd = () => ({
  type: GROUP_DETAILS.end,
});

export const groupDetailstFetchSuccess = details => ({
  type: GROUP_DETAILS.success,
  details,
});

export const groupDetailstFetchFailed = error => ({
  type: GROUP_DETAILS.failed,
  error,
});

export const resetGroupDetails = () => ({
  type: GROUP_DETAILS.reset,
});

export const groupDetailstFetchUpdate = details => ({
  type: GROUP_DETAILS.update,
  details,
});

export const fetchGroupDetails = id => (dispatch, getState) => {
  if (!id) return null;
  const { isLoggedIn } = getState().session;
  let API_URL;
  if (isLoggedIn) {
    API_URL = `${Api.authGetCelebDetails}${id}/`;
  } else {
    API_URL = Api.getCelebDetails(id);
  }
  dispatch(groupDetailsFetchStart());
  return fetch.get(API_URL).then((resp) => {
    if (resp.data && resp.data.success) {
      dispatch(groupDetailstFetchEnd());
      dispatch(groupDetailstFetchSuccess(resp.data.data));
      dispatch(fetchGroupMembers(resp.data.data.user.user_id, 0, true));
    } else {
      dispatch(groupDetailstFetchEnd());
      dispatch(groupDetailstFetchFailed('404'));
    }
  }).catch((exception) => {
    dispatch(groupDetailstFetchEnd());
    dispatch(groupDetailstFetchFailed(exception.response.data));
  });
};

export const updateGroupDetails = (data, userType) => (dispatch, getState) => {
  if (userType === 'fan') {
    let groupDetails = getState().groupDetails.userDetails;
    groupDetails = {
      ...groupDetails,
      is_follow: data.follow,
    };
    dispatch(groupDetailstFetchUpdate(groupDetails));
  }
  if (userType === 'star') {
    let groupDetails = getState().groupDetails.userDetails;
    groupDetails = {
      ...groupDetails,
      group_account_follow: true,
      account_follow_details: {
        celebrity_invite: data.data.celebrity_invite,
        approved: data.data.approved,
      },
    };
    dispatch(groupDetailstFetchUpdate(groupDetails));
  }
};
