import { combineReducers } from 'redux';
import myVideosList from './myVideosList';
// import recentActivity from './recentActivity';

const myVideos = combineReducers({
  myVideosList,
  // recentActivity,
})

export default myVideos;
