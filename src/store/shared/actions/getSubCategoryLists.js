
import Api from '../../../lib/api';
import { fetch } from '../../../services/fetch';

export const SUB_CATEGORY_LIST = {
  start: 'fetch_start/sub_category_list',
  end: 'fetch_end/sub_category_list',
  success: 'fetch_success/sub_category_list',
  failed: 'fetch_failed/sub_category_list',
};

export const subCategoryListFetchStart = () => ({
  type: SUB_CATEGORY_LIST.start,
});

export const subCategoryListFetchEnd = () => ({
  type: SUB_CATEGORY_LIST.end,
});

export const subCategoryListFetchSuccess = (data) => {
  return (
    {
      type: SUB_CATEGORY_LIST.success,
      data,
    });
};

export const subCategoryListFetchFailed = error => ({
  type: SUB_CATEGORY_LIST.failed,
  error,
});

export const fetchSubCategoryList = () => (dispatch) => {
  dispatch(subCategoryListFetchStart());
  return fetch.get(Api.getProfessionsList).then((resp) => {
    if (resp.data && resp.data.success) {
      dispatch(subCategoryListFetchEnd());
      dispatch(subCategoryListFetchSuccess(resp.data.data));
    } else {
      dispatch(subCategoryListFetchEnd());
    }
  }).catch((exception) => {
    dispatch(subCategoryListFetchEnd());
    dispatch(subCategoryListFetchFailed(exception));
  });
};
