
import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';

export const RECENT_ACTIVITY = {
  start: 'fetch_start/fan_recent_activity',
  end: 'fetch_end/fan_recent_activity',
  success: 'fetch_success/fan_recent_activity',
  failed: 'fetch_failed/fan_recent_activity',
};

export const recentActivityFetchStart = () => ({
  type: RECENT_ACTIVITY.start,
});

export const recentActivityFetchEnd = () => ({
  type: RECENT_ACTIVITY.end,
});

export const recentActivityFetchSuccess = activityList => ({
  type: RECENT_ACTIVITY.success,
  activityList,
});

export const recentActivityFetchFailed = error => ({
  type: RECENT_ACTIVITY.failed,
  error,
});

export const fetchRecentActivity = () => (dispatch) => {
  dispatch(recentActivityFetchStart());
  return fetch.get(`${Api.getRecentActivity}?role=fan`).then((resp) => {
    if (resp.data && resp.data.success) {
      dispatch(recentActivityFetchEnd());
      dispatch(recentActivityFetchSuccess(resp.data.data.recent_activities));
    } else {
      dispatch(recentActivityFetchEnd());
    }
  }).catch((exception) => {
    dispatch(recentActivityFetchEnd());
    dispatch(recentActivityFetchFailed(exception));
  });
};
