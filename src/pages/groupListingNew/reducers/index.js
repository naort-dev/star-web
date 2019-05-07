import { combineReducers } from 'redux';

import memberList from './memberList';
import groupDetails from './groupDetails';

const groupListing = combineReducers({
  memberList,
  groupDetails,
});

export default groupListing;
