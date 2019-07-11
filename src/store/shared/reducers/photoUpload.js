import { UPDATE_PROFILE_PHOTO, SET_PROFILE_PIC_TO_STATE} from '../actions/updateProfilePhoto';

const initalState = {
  loading: false,
  error: '',
  profileUploadStatus: false,
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_PHOTO.start:
      return {
        ...state,
        loading: true,
        profileUploadStatus: false,
      };

    case UPDATE_PROFILE_PHOTO.end:
      return {
        ...state,
        loading: false,
      };

    case UPDATE_PROFILE_PHOTO.success:
      return {
        ...state,
        loading: false,
        profileUploadStatus: true,
      };

    case UPDATE_PROFILE_PHOTO.failed:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case SET_PROFILE_PIC_TO_STATE:
      return {
        ...state,
        profilePic: action.payload,
      }
    default:
      return state;
  }
};
