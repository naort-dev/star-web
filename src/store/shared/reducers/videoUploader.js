import { SAVE_VIDEO} from '../actions/videoUploader';


const initalState = {
   savedFile: null
};

export default (state = { ...initalState }, action) => {
    switch (action.type) {
        case SAVE_VIDEO:
            return {
                ...state,
                savedFile: action.payload
            }
        
        default:
            return state;
    }
};
