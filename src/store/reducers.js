import { combineReducers } from 'redux';

import session from './shared/reducers/session';
import celebList from '../pages/landing/reducers/celebList';
import videosList from '../pages/landing/reducers/videosList';
import professionsList from './shared/reducers/professionsList';
import suggestionsList from './shared/reducers/suggestionsList';
import filters from '../pages/landing/reducers/filters';

const rootReducer = combineReducers({
  session,
  celebList,
  professionsList,
  filters,
  videosList,
  suggestionsList,
});

export default rootReducer;
