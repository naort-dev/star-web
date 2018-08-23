import { SET_SOCIAL_MEDIA_DATA, RESET_SOCIAL_MEDIA_DATA } from '../actions/storeSocialMedia';

const initalState = {
};


export default (state = { ...initalState }, action) => {
  switch (action.type) {
    case SET_SOCIAL_MEDIA_DATA:
      return {
        ...state,
        ...action.payload,
      };
    case RESET_SOCIAL_MEDIA_DATA:
      return {};  
    default:
      return state;
  }
};
