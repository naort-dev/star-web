
import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';
import { fetchMyVideosList } from '../../../pages/myVideos/actions/getMyVideosList';

export const CLEAR_ERROR = 'popup/CLEAR_ERROR'
export const RATING = {
  start: 'rating/ON_RATING',
  end: 'rating/ON_RATING_END',
  success: 'rating/ON_RATING_SUCCESS',
  failed: 'rating/ON_RATING_FAILED',
};

export const CONTACT_SUPPORT = {
  start: 'user/CONTACT_SUPPORT',
  end: 'user/CONTACT_SUPPORT_END',
  success: 'user/CONTACT_SUPPORT_SUCCESS',
  failed: 'user/CONTACT_SUPPORT_FAILED',
};

export const REPORT_ABUSE = {
  start: 'user/REPORT_ABUSE',
  end: 'user/REPORT_ABUSE_END',
  success: 'user/REPORT_ABUSE_SUCCESS',
  failed: 'user/REPORT_ABUSE_FAILED',
};

export const ratingStart = () => ({
  type: RATING.start,
});

export const ratingEnd = () => ({
  type: RATING.end,
});

export const ratingSuccess = data => (
  {
    type: RATING.success,
    data,
  });

export const clearPopupError = () => ({
  type: CLEAR_ERROR,
});

export const ratingFailed = error => ({
  type: RATING.failed,
  error,
});

export const rateCelebrity = data => (dispatch) => {
  dispatch(ratingStart());
  return fetch.post(Api.rating, data).then((resp) => {
    dispatch(ratingEnd());
    if (resp.data && resp.data.success) {
      dispatch(ratingSuccess(resp.data.data));
      dispatch(fetchMyVideosList(0, true));
    }
  }).catch((exception) => {
    dispatch(ratingEnd());
    dispatch(ratingFailed(exception));
  });
};

export const contactSupportStart = () => ({
  type: CONTACT_SUPPORT.start,
});

export const contactSupportEnd = () => ({
  type: CONTACT_SUPPORT.end,
});

export const contactSupportSuccess = data => (
  {
    type: CONTACT_SUPPORT.success,
    data,
  });

export const contactSupportFailed = error => ({
  type: CONTACT_SUPPORT.failed,
  error,
});

export const contactSupport = data => (dispatch) => {
  dispatch(contactSupportStart());
  return fetch.post(Api.contactSupport, data).then((resp) => {
    dispatch(contactSupportEnd());
    if (resp.data && resp.data.success) {
      dispatch(contactSupportSuccess(resp.data.data));
    }
  }).catch((exception) => {
    dispatch(contactSupportEnd());
    dispatch(contactSupportFailed(exception));
  });
};


export const reportAbuseStart = () => ({
  type: REPORT_ABUSE.start,
});

export const reportAbuseEnd = () => ({
  type: REPORT_ABUSE.end,
});

export const reportAbuseSuccess = data => (
  {
    type: REPORT_ABUSE.success,
    data,
  });

export const reportAbuseFailed = error => ({
  type: REPORT_ABUSE.failed,
  error,
});

export const reportAbuse = data => (dispatch) => {
  dispatch(reportAbuseStart());
  return fetch.post(Api.reportAbuse, data).then((resp) => {
    dispatch(reportAbuseEnd());
    if (resp.data && resp.data.success) {
      dispatch(reportAbuseSuccess(resp.data.data));
    }
  }).catch((exception) => {
    dispatch(reportAbuseEnd());
    dispatch(reportAbuseFailed(exception));
  });
};
