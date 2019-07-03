import { combineReducers } from 'redux';
import celebDetails from './celebDetails';
import celebVideos from './celebVideos';
import celebGroups from './celebGroups';
import celebReactions from './celebReactions'

const starDetails = combineReducers({
    celebDetails,
    celebVideos,
    celebReactions,
    celebGroups,
})

export default starDetails;