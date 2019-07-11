import { combineReducers } from 'redux';
import bookingsList from './bookingsList';
import recentActivity from './recentActivity';
import requestHandler from './requestHandler';

const bookings = combineReducers({
  bookingsList,
  recentActivity,
  requestHandler,
});

export default bookings;
