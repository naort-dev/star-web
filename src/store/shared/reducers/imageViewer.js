import { SAVE_IMAGE} from '../actions/imageViewer';


const initalState = {
   featuredImage: {rotation: null, imageFile: null, imageURL: null},
   firstImage: {rotation: null, imageFile: null, imageURL: null},
   secondImage: {rotation: null, imageFile: null, imageURL: null},
   avatar: {rotation: null, imageFile: null, imageURL: null}
};

export default (state = { ...initalState }, action) => {
    console.log("payload", action.payload)
    switch (action.type) {
        case SAVE_IMAGE:
            return {
                ...state,
                featuredImage: action.payload.featuredImage,
                firstImage: action.payload.firstImage,
                secondImage: action.payload.secondImage, 
                avatar: action.payload.avatar 
            }
        
        default:
            return state;
    }
};
