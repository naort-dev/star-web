
import Api from '../../../lib/api';
import fetch from '../../../services/fetch';

export const PROFESSION_LIST = {
  start: 'fetch_start/professions_list',
  end: 'fetch_end/professions_list',
  success: 'fetch_success/professions_list',
  failed: 'fetch_failed/professions_list',
}

export const professionsListFetchStart = () => ({
  type: PROFESSION_LIST.start,
});

export const professionsListtFetchEnd = () => ({
  type: PROFESSION_LIST.end,
});

export const professionsListtFetchSuccess = (data) => {
  return (
    {
      type: PROFESSION_LIST.success,
      data,
    });
};

export const professionsListtFetchFailed = error => ({
  type: PROFESSION_LIST.failed,
  error,
});

export const fetchProfessionsList = () => (dispatch, getState) => {
  dispatch(professionsListFetchStart());
  return fetch(Api.getProfessionsList).then(resp => {
    if (resp.data && resp.data.success) {
      dispatch(professionsListtFetchEnd());
      dispatch(professionsListtFetchSuccess(resp.data.data));
    }
    else {
      dispatch(professionsListtFetchEnd());
    }
  }).catch((exception) => {
    dispatch(professionsListtFetchEnd());
    dispatch(professionsListtFetchFailed(exception));
  });
};
