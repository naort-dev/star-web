
import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';

export const OTHER_RELATION = {
  start: 'session/ON_OTHER_RELATION_START',
  end: 'session/ON_OTHER_RELATION_END',
  success: 'session/ON_OTHER_RELATION_SUCCESS',
  failed: 'session/ON_OTHER_RELATION_FAILED',
  reset: 'session/ON_OTHER_RELATION_RESET'
};

export const otherRelationFetchStart = () => ({
  type: OTHER_RELATION.start,
});

export const otherRelationFetchEnd = () => ({
  type: OTHER_RELATION.end,
});

export const otherRelationFetchSuccess = (data) => {
  return (
    {
      type: OTHER_RELATION.success,
      data,
    });
};

export const otherRelationFetchFailed = error => ({
  type: OTHER_RELATION.failed,
  error,
});
export const otherRelationFetchReset = error => ({
  type: OTHER_RELATION.reset,
  error,
});

export const postOtherRelation = otherValue => (dispatch) => {
  dispatch(otherRelationFetchStart());
  return fetch.post(Api.otherRelation, {
    other: otherValue,
  }).then((resp) => {
    if (resp.data && resp.data.success) {
      dispatch(otherRelationFetchEnd());
      dispatch(otherRelationFetchSuccess(resp.data.data));
    } else {
      dispatch(otherRelationFetchEnd());
    }
  }).catch((exception) => {
    dispatch(otherRelationFetchEnd());
    dispatch(otherRelationFetchFailed(exception));
  });
};
