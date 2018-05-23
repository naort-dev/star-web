import { combineReducers } from 'redux';

import session from './shared/reducers/session';
import celebList from './shared/reducers/celebList';
import professionsList from './shared/reducers/professionsList';
import filters from '../pages/landing/reducers/filters';

const rootReducer = combineReducers({
  session,
  celebList,
  professionsList,
  filters,
});

export default rootReducer;
