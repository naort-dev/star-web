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
  const { limit, count } = getState().commentsList;
  dispatch(commentsListFetchStart(refresh));
  return fetch.get(`${Api.getCommentsList}/${videoId}/?limit=${limit}&last_comment=${offset}`).then((resp) => {
    if (resp.data && resp.data.success) {
      dispatch(commentsListFetchEnd());
      let list = getState().commentsList.data;
      const newCount = offset === 0 ? resp.data.data.count : count;
      if (refresh) {
        list = resp.data.data.comment_list.reverse();
      } else {
        list = [...list, ...resp.data.data.comment_list.reverse()];
      }
      dispatch(commentsListFetchSuccess(list, newCount, offset));
    } else {
      dispatch(commentsListFetchEnd());
    }
  }).catch((exception) => {
    dispatch(commentsListFetchEnd());
    dispatch(commentsListtFetchFailed(exception));
  });
};