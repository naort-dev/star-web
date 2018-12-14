import { UPDATE_NOTIFICATION } from '../actions/updateNotification';

const initalState = {
  loading: false,
  error: {},
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case UPDATE_NOTIFICATION.start:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_NOTIFICATION.end:
      return {
        ...state,
        loading: false,
      };

    case UPDATE_NOTIFICATION.success:
      return {
        ...state,
        loading: false,
      };

    case UPDATE_NOTIFICATION.failed:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

   
    default:
      return state;
  }
};
