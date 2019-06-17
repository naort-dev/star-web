import Api from '../../lib/api';
import { fetch } from '../fetch';
import { dashBoardSuccess } from '../../pages/dashboard/actions';
import {
  loaderAction,
  updateToast,
} from '../../store/shared/actions/commonActions';

export const dashBoardUpdate = () => dispatch => {
  return fetch
    .get(Api.dashboardUpdate, {})
    .then()
    .catch();
};

export const getDashboardData = () => dispatch => {
  dispatch(loaderAction(true));
  return fetch
    .get(Api.dashBoard, {})
    .then(resp => {
      dispatch(dashBoardSuccess(resp.data.data.dashboard));
      dispatch(loaderAction(false));
    })
    .catch(error => {
      dispatch(loaderAction(false));
      dispatch(
        updateToast({
          value: true,
          message: error.response.data.error.message,
          variant: 'error',
        }),
      );
    });
};
