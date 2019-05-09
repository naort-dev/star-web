import { combineReducers } from 'redux';
import { LOGIN } from './shared/actions/login';

import config from './shared/reducers/config';
import session from './shared/reducers/session';
import featuredStars from '../pages/landing/reducers/featuredStars';
import trendingStars from '../pages/landing/reducers/trendingStars';
import celebList from '../pages/landing/reducers/celebList';
import videosList from '../pages/landing/reducers/videosList';
import starDetails from '../pages/starProfile/reducers'
import professionsList from './shared/reducers/professionsList';
import groupTypes from './shared/reducers/groupTypes';
import suggestionsList from './shared/reducers/suggestionsList';
import followCelebrityStatus from './shared/reducers/followCelebrityStatus';
import filters from '../pages/landing/reducers/filters';
import favouritesList from '../pages/favourites/reducers/favouritesList';
import occasionList from '../pages/Purchase/reducers/occasionList';
import myVideosList from '../pages/requests/reducers/myVideosList';
import groupSupporters from '../pages/starSupporters/reducers';
import groupListing from '../pages/groupListing/reducers';
import earningsList from '../pages/earnings/reducers/earningsList';
import bookingData from '../store/shared/reducers/bookings';
import otherRelation from '../store/shared/reducers/other';
import paymentDetails from '../store/shared/reducers/payments';
import videoRecorder from '../store/shared/reducers/videoRecording';
import videoUploader from '../store/shared/reducers/videoUploader';
import requestHandler from '../pages/requests/reducers/requestHandler';
import audioRecorder from '../store/shared/reducers/audioRecorder';
import referralDetails from '../store/shared/reducers/starReferral';
import userDetails from '../store/shared/reducers/userDetails';
import saveSettings from '../store/shared/reducers/saveSettings';
import stripeRegistration from '../store/shared/reducers/stripeRegistrations';
import changePassword from '../store/shared/reducers/changePassword';
import socialMediaData from '../store/shared/reducers/socialMediaState';
import photoUpload from './shared/reducers/photoUpload';
import modals from './shared/reducers/modals';
import commentsList from '../store/shared/reducers/commentsList';
import groupDetails from '../pages/groupProfile/reducers/groupDetails';
import memberList from '../pages/groupProfile/reducers/membersList';
import groupTypesListing from './shared/reducers/groupTypeListing';
import commonReducer from './shared/reducers/commonReducer';
import subCategoryList from './shared/reducers/subCategoryLists';

const appReducer = combineReducers({
  config,
  session,
  featuredStars,
  trendingStars,
  celebList,
  professionsList,
  groupTypes,
  filters,
  videosList,
  suggestionsList,
  starDetails,
  favouritesList,
  followCelebrityStatus,
  occasionList,
  myVideosList,
  bookingData,
  otherRelation,
  paymentDetails,
  videoRecorder,
  videoUploader,
  requestHandler,
  audioRecorder,
  userDetails,
  saveSettings,
  stripeRegistration,
  changePassword,
  earningsList,
  socialMediaData,
  referralDetails,
  commentsList,
  photoUpload,
  modals,
  groupDetails,
  memberList,
  groupSupporters,
  groupListing,
  groupTypesListing,
  commonReducer,
  subCategoryList,
});

const rootReducer = (state, action) => {
  let newState = { ...state };
  if (action.type === LOGIN.logout) {
    newState = {};
    newState.config = state.config;
    newState.groupTypes = state.groupTypes;
    newState.groupTypesListing = state.groupTypesListing;
    newState.professionsList = state.professionsList;
    newState.featuredStars = state.featuredStars;
    newState.trendingStars = state.trendingStars;
  }

  return appReducer(newState, action);
};

export default rootReducer;
