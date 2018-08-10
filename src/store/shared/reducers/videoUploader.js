import { SAVE_VIDEO, UPLOAD_VIDEO, DELETE_VIDEO } from '../actions/videoUploader';

const initalState = {
  savedFile: null,
  extension: null,
  uploadStatus: null,
  src: null,
};

export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case SAVE_VIDEO:
      return {
        ...state,
        savedFile: action.payload.videoFile,
        extension: action.payload.extension,
        url: action.payload.url,
      };

    case UPLOAD_VIDEO:
      return { ...state, uploadStatus: true };
    
    case DELETE_VIDEO:
      return {
        ...initalState,
      };

    default:
      return state;
  }
};
