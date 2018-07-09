import { REDIRECT } from '../actions/setRedirectReferrer';

const initialState = {
  from: null,
  to: null,
};

export default (state = { ...initialState }, action) => {
  switch (action.type) {
    case REDIRECT.setRedirect:
      return {
        ...state,
        from: action.from,
        to: action.to,
      };
    
    case REDIRECT.resetUrls:
      return initialState;
    default:
      return state;
  }
};
