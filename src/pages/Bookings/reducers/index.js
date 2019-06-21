import { combineReducers } from 'redux';
import bookingsList from './bookingsList';
import recentActivity from './recentActivity';

const bookings = combineReducers({
  bookingsList,
  recentActivity,
})

export default bookings;
