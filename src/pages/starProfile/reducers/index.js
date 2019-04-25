import { combineReducers } from 'redux';
import celebDetails from './celebDetails';
import celebVideos from './celebVideos';
import celebGroups from './celebGroups';

const starDetails = combineReducers({
    celebDetails,
    celebVideos,
    celebGroups,
})

export default starDetails;