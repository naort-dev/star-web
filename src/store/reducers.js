import { combineReducers } from 'redux';

import session from './shared/session';

const rootReducer = combineReducers({
  session,
});

export default rootReducer;
