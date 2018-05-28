import { combineReducers } from 'redux';

import session from './shared/reducers/session';
import celebList from '../pages/landing/reducers/celebList';
import videosList from '../pages/landing/reducers/videosList';
import professionsList from './shared/reducers/professionsList';
import filters from '../pages/landing/reducers/filters';

const rootReducer = combineReducers({
  session,
  celebList,
  professionsList,
  filters,
  videosList,
});

export default rootReducer;
