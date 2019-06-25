import { cloneDeep } from 'lodash';
import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';

export const ACTIVITIES_LIST = {
  start: 'fetch_start/activities_list',
  end: 'fetch_end/activities_list',
  success: 'fetch_success/activities_list',
  failed: 'fetch_failed/activities_list',
  updateComments: 'update/activities_list',
  reset: 'reset/activities_list',
};

export const activitiesListFetchStart = refresh => ({
  type: ACTIVITIES_LIST.start,
  refresh,
});

export const activitiesListFetchEnd = () => ({
  type: ACTIVITIES_LIST.end,
});

export const activitiesListFetchSuccess = (activitiesList, count, offset) => {
  return (
    {
      type: ACTIVITIES_LIST.success,
      activitiesList,
      count,
      offset,
    });
};

export const activitiesListtFetchFailed = error => ({
  type: ACTIVITIES_LIST.failed,
  error,
});

export const resetActivitiesList = () => ({
  type: ACTIVITIES_LIST.reset,
});

export const toggleActivityVisibility = (activityId) => (dispatch, getState) => {
  return fetch.post(Api.toggleActivityVisibility, {
    activity: activityId,
  })
    .then((resp) => {
      if (resp.data && resp.data.success) {
        const { data: activitiesList, count, offset } = getState().activitiesList;
        const activity = activitiesList.find(activityItem => activityItem.id === activityId);
        const activityIndex = activitiesList.findIndex(activityItem => activityItem.id === activityId);
        activity.public_visibility = !activity.public_visibility;
        const newList = cloneDeep(activitiesList);
        newList[activityIndex] = activity;
        dispatch(activitiesListFetchSuccess(newList, count, offset));
      }
    })
}

export const fetchActivitiesList = (bookingId, offset, refresh) => (dispatch, getState) => {
  const { count } = getState().activitiesList;
  dispatch(activitiesListFetchStart(refresh));
  return fetch.get(`${Api.getRecentActivity}?booking_id=${bookingId}`).then((resp) => {
    if (resp.data && resp.data.success) {
      dispatch(activitiesListFetchEnd());
      let list = getState().activitiesList.data;
      const newCount = offset === 0 ? resp.data.data.count : count;
      if (refresh) {
        list = resp.data.data.recent_activities;
      } else {
        list = [...resp.data.data.recent_activities, ...list];
      }
      dispatch(activitiesListFetchSuccess(list, newCount, offset));
    } else {
      dispatch(activitiesListFetchEnd());
    }
  }).catch((exception) => {
    dispatch(activitiesListFetchEnd());
    dispatch(activitiesListtFetchFailed(exception));
  });
};
