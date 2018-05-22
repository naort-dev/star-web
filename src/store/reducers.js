import { combineReducers } from 'redux';

import session from './shared/reducers/session';
import celebList from './shared/reducers/celebList';
import professionsList from './shared/reducers/professionsList';

const rootReducer = combineReducers({
  session,
  celebList,
  professionsList,
});

export default rootReducer;
