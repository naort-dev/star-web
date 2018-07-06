import { combineReducers } from 'redux';

import session from './shared/reducers/session';
import celebList from '../pages/landing/reducers/celebList';
import videosList from '../pages/landing/reducers/videosList';
import celebDetails from '../pages/starProfile/reducers/celebDetails';
import celebVideos from '../pages/starProfile/reducers/celebVideos';
import professionsList from './shared/reducers/professionsList';
import suggestionsList from './shared/reducers/suggestionsList';
import followCelebrityStatus from './shared/reducers/followCelebrityStatus';
import filters from '../pages/landing/reducers/filters';
import favouritesList from '../pages/favourites/reducers/favouritesList';
import occasionList from '../pages/eventAnnouncement/reducers/occasionList';
import myVideosList from '../pages/myVideos/reducers/myVideosList';
import bookingData from '../store/shared/reducers/bookings';

const rootReducer = combineReducers({
  session,
  celebList,
  professionsList,
  filters,
  videosList,
  suggestionsList,
  celebDetails,
  celebVideos,
  favouritesList,
  followCelebrityStatus,
  occasionList,
  myVideosList,
  bookingData,
});

export default rootReducer;
