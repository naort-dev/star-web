import { SAVE_VIDEO, UPLOAD_VIDEO} from '../actions/videoUploader';


const initalState = {
   savedFile: null,
   extension: null,
   uploadStatus: null
};

export default (state = { ...initalState }, action) => {
    switch (action.type) {
        case SAVE_VIDEO:
            return {
                ...state,
                savedFile: action.payload.videoFile,
                extension: action.payload.extension
            }

        case UPLOAD_VIDEO:
            return {...state, uploadStatus: true}
        
        default:
            return state;
    }
};


