import { combineReducers } from 'redux';

import memberList from './memberList';
import nonMemberList from './nonMemberList';

const groupSupporters = combineReducers({
  memberList,
  nonMemberList,
});

export default groupSupporters;
