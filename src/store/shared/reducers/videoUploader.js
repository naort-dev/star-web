import { SAVE_VIDEO} from '../actions/videoUploader';


const initalState = {
   savedFile: null,
   extension: null
};

export default (state = { ...initalState }, action) => {
    switch (action.type) {
        case SAVE_VIDEO:
            return {
                ...state,
                savedFile: action.payload.videoFile,
                extension: action.payload.extension
            }
        
        default:
            return state;
    }
};
