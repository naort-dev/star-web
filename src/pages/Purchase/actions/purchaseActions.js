import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';

export const OCCASION_LIST = {
  start: 'fetch_start/occasion_list',
  end: 'fetch_end/occasion_list',
  success: 'fetch_success/occasion_list',
  failed: 'fetch_failed/occasion_list',
  reset: 'reset/occasion_list',
};
export const AskQuestion = {
  videoUploaded: 'SET_VIDEO_UPLOADED_FLG',
};
export const occasionlistFetchStart = () => ({
  type: OCCASION_LIST.start,
});
export const occasionlistFetchEnd = () => ({
  type: OCCASION_LIST.end,
});
export const occasionlistFetchSuccess = (details) => {
  return {
    type: OCCASION_LIST.success,
    details,
  };
};
export const occasionlistFetchFailed = (error) => ({
  type: OCCASION_LIST.failed,
  error,
});
export const resetOccasionlist = () => ({
  type: OCCASION_LIST.reset,
});
export const fetchOccasionlist = (id) => (dispatch) => {
  dispatch(occasionlistFetchStart());
  return fetch
    .get(`${Api.getOccasionList}?type=${id}`)
    .then((resp) => {
      if (resp.data && resp.data.success) {
        dispatch(occasionlistFetchEnd());
        dispatch(occasionlistFetchSuccess(resp.data.data));
      } else {
        dispatch(occasionlistFetchEnd());
      }
    })
    .catch((exception) => {
      dispatch(occasionlistFetchEnd());
      dispatch(occasionlistFetchFailed(exception));
    });
};

export const setVideoUploadedFlag = (value) => ({
  type: AskQuestion.videoUploaded,
  value,
});
