import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';

export const COMMENTS_LIST = {
  start: 'fetch_start/comments_list',
  end: 'fetch_end/comments_list',
  success: 'fetch_success/comments_list',
  failed: 'fetch_failed/comments_list',
  reset: 'reset/comments_list',
};

export const commentsListFetchStart = refresh => ({
  type: COMMENTS_LIST.start,
  refresh,
});

export const commentsListFetchEnd = () => ({
  type: COMMENTS_LIST.end,
});

export const commentsListFetchSuccess = (commentsList, count, offset) => {
  return (
    {
      type: COMMENTS_LIST.success,
      commentsList,
      count,
      offset,
    });
};

export const commentsListtFetchFailed = error => ({
  type: COMMENTS_LIST.failed,
  error,
});

export const resetCommentsList = () => ({
  type: COMMENTS_LIST.reset,
});

export const fetchCommentsList = (videoId, offset, refresh) => (dispatch, getState) => {
  const { limit } = getState().commentsList;
  dispatch(commentsListFetchStart(refresh));
  return fetch.get(`${Api.getCommentsList}/${videoId}/?limit=${limit}&offset=${offset}`).then((resp) => {
    if (resp.data && resp.data.success) {
      dispatch(commentsListFetchEnd());
      let list = getState().commentsList.data;
      const { count } = resp.data.data;
      if (refresh) {
        list = resp.data.data.comment_list;
      } else {
        list = [...resp.data.data.comment_list, ...list];
      }
      dispatch(commentsListFetchSuccess(list, count, offset));
    } else {
      dispatch(commentsListFetchEnd());
    }
  }).catch((exception) => {
    dispatch(commentsListFetchEnd());
    dispatch(commentsListtFetchFailed(exception));
  });
};
