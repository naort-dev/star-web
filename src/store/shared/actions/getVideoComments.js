import moment from 'moment';
import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';

export const COMMENTS_LIST = {
  start: 'fetch_start/comments_list',
  end: 'fetch_end/comments_list',
  success: 'fetch_success/comments_list',
  failed: 'fetch_failed/comments_list',
  updateComments: 'update/comments_list',
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

export const addVideoComment = (videoId, comment) => (dispatch, getState) => {
  const { count, data, offset } = getState().commentsList;
  const { stageName, avatarPhoto } = getState().userDetails.settings_userDetails;
  const newComment = {
    comments: comment,
    created_date: `${moment.utc().format('YYYY-MM-DDTHH:mm:ss.SSSS')}Z`,
    user: {
      get_short_name: stageName,
      image_url: avatarPhoto,
    },
  };
  const newCommentsList = [...data, newComment];
  dispatch(commentsListFetchSuccess(newCommentsList, count + 1, offset));
  return fetch.post(Api.addComment, {
    comments: comment,
    video: videoId,
  }).then((resp) => {

  }).catch((exception) => {
    dispatch(commentsListFetchEnd());
    dispatch(commentsListtFetchFailed(exception));
  });
};

export const fetchCommentsList = (videoId, offset, refresh) => (dispatch, getState) => {
  const { limit, count } = getState().commentsList;
  dispatch(commentsListFetchStart(refresh));
  return fetch.get(`${Api.getCommentsList}/${videoId}/?limit=${limit}&last_comment=${offset}`).then((resp) => {
    if (resp.data && resp.data.success) {
      dispatch(commentsListFetchEnd());
      let list = getState().commentsList.data;
      const newCount = offset === 0 ? resp.data.data.count : count;
      if (refresh) {
        list = resp.data.data.comment_list;
      } else {
        list = [...resp.data.data.comment_list, ...list];
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
