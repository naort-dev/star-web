import { UPDATE_USER_DETAILS } from '../actions/saveSettings';
import { UPDATE_NOTIFICATION } from '../actions/updateNotification';
import { UPDATE_PROFILE_PHOTO } from '../actions/updateProfilePhoto';

const initalState = {
  photoUpdating: false,
  notificationsUpdating: false,
  userDetailsUpdating: false,
  photoSaved: false,
  notificationSaved: false,
  userDetailsSaved: false,
  error: '',
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case UPDATE_USER_DETAILS.start:
      return {
        ...state,
        userDetailsUpdating: true,
      };

    case UPDATE_USER_DETAILS.end:
      return {
        ...state,
        userDetailsUpdating: false,
      };

    case UPDATE_USER_DETAILS.success:
      return {
        ...state,
        userDetailsUpdating: false,
        userDetailsSaved: true,
      };

    case UPDATE_USER_DETAILS.failed:
      return {
        ...state,
        userDetailsUpdating: false,
        error: action.error,
      };
    case UPDATE_USER_DETAILS.reset:
      return {
        ...state,
        userDetailsUpdating: false,
        userDetailsSaved: false,
        error: action.error,
      };
    case UPDATE_NOTIFICATION.start:
      return {
        ...state,
        notificationsUpdating: true,
      };

    case UPDATE_NOTIFICATION.end:
      return {
        ...state,
        notificationsUpdating: false,
      };

    case UPDATE_NOTIFICATION.success:
      return {
        ...state,
        notificationsUpdating: false,
        notificationSaved: true,
      };

    case UPDATE_NOTIFICATION.failed:
      return {
        ...state,
        notificationsUpdating: false,
        error: action.error,
      };
    case UPDATE_NOTIFICATION.reset:
      return {
        ...state,
        notificationsUpdating: false,
        notificationSaved: false,
        error: action.error,
      };
    case UPDATE_PROFILE_PHOTO.start:
      return {
        ...state,
        photoUpdating: true,
      };

    case UPDATE_PROFILE_PHOTO.end:
      return {
        ...state,
        photoUpdating: false,
      };

    case UPDATE_PROFILE_PHOTO.success:
      return {
        ...state,
        photoUpdating: false,
        photoSaved: true,
      };

    case UPDATE_PROFILE_PHOTO.failed:
      return {
        ...state,
        photoUpdating: false,
        error: action.error,
      };
    case UPDATE_PROFILE_PHOTO.reset:
      return {
        ...state,
        photoUpdating: false,
        photoSaved: false,
        error: action.error,
      };



    default:
      return state;
  }
};
