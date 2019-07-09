import axios from 'axios';
import { cloneDeep } from 'lodash';
import Api from '../../../lib/api';
import { fetch, CancelToken } from '../../../services/fetch';

export const ACTIVITIES_LIST = {
  start: 'fetch_start/activities_list',
  end: 'fetch_end/activities_list',
  success: 'fetch_success/activities_list',
  failed: 'fetch_failed/activities_list',
  updateComments: 'update/activities_list',
  reset: 'reset/activities_list',
};

export const activitiesListFetchStart = (refresh, token) => ({
  type: ACTIVITIES_LIST.start,
  refresh,
  token,
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

export const fetchActivitiesList = (bookingId, offset, refresh, isPublic, isAll) => (dispatch, getState) => {
  const { count, limit } = getState().activitiesList;
  if (typeof getState().activitiesList.token !== typeof undefined) {
    getState().activitiesList.token.cancel('Operation canceled due to new request.');
  }
  const source = CancelToken.source();
  let apiUrl = '';
  if (isPublic) {
    if (isAll) {
      apiUrl = `${Api.getRecentActivity}?booking_id=${bookingId}&is_public=true`;
    } else {
      apiUrl = `${Api.getRecentActivity}?booking_id=${bookingId}&offset=${offset}&limit=${limit}&is_public=true`;
    }
  } else if (isAll) {
    apiUrl = `${Api.getRecentActivity}?booking_id=${bookingId}`;
  } else {
    apiUrl = `${Api.getRecentActivity}?booking_id=${bookingId}&offset=${offset}&limit=${limit}`;
  }
  dispatch(activitiesListFetchStart(refresh, source));
  return fetch.get(apiUrl, {
    cancelToken: source.token,
  }).then((resp) => {
    if (resp.data && resp.data.success) {
      dispatch(activitiesListFetchEnd());
      let list = getState().activitiesList.data;
      const newCount = offset === 0 ? resp.data.data.count : count;
      if (refresh) {
        list = resp.data.data.recent_activities;
      } else {
        list = [...list, ...resp.data.data.recent_activities];
      }
      dispatch(activitiesListFetchSuccess(list, newCount, offset));
    } else {
      dispatch(activitiesListFetchEnd());
    }
  }).catch((exception) => {
    if (axios.isCancel(exception)) {
      dispatch(activitiesListFetchEnd());
    }
    dispatch(activitiesListtFetchFailed(exception));
  });
};
