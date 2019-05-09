import { combineReducers } from 'redux';
import { LOGIN } from './shared/actions/login';

import config from './shared/reducers/config';
import session from './shared/reducers/session';
import featuredStars from '../pages/landingNew/reducers/featuredStars';
import trendingStars from '../pages/landingNew/reducers/trendingStars';
import celebList from '../pages/landing/reducers/celebList';
import videosList from '../pages/landing/reducers/videosList';
import celebDetails from '../pages/starProfile/reducers/celebDetails';
import celebVideos from '../pages/starProfile/reducers/celebVideos';
import professionsList from './shared/reducers/professionsList';
import groupTypes from './shared/reducers/groupTypes';
import suggestionsList from './shared/reducers/suggestionsList';
import followCelebrityStatus from './shared/reducers/followCelebrityStatus';
import filters from '../pages/landing/reducers/filters';
import favouritesList from '../pages/favourites/reducers/favouritesList';
import occasionList from '../pages/eventAnnouncement/reducers/occasionList';
import myVideosList from '../pages/requests/reducers/myVideosList';
import groupSupporters from '../pages/starSupporters/reducers';
import earningsList from '../pages/earnings/reducers/earningsList';
import bookingData from '../store/shared/reducers/bookings';
import redirectReferrer from '../store/shared/reducers/redirect';
import otherRelation from '../store/shared/reducers/other';
import paymentDetails from '../store/shared/reducers/payments';
import videoRecorder from '../store/shared/reducers/videoRecording';
import videoUploader from '../store/shared/reducers/videoUploader';
import requestHandler from '../pages/requests/reducers/requestHandler';
import imageViewer from '../store/shared/reducers/imageViewer';
import audioRecorder from '../store/shared/reducers/audioRecorder';
import referralDetails from '../store/shared/reducers/starReferral';
import popupData from './shared/reducers/popupData';
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
import groupListing from '../pages/groupListingNew/reducers';

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
  groupListing,
  suggestionsList,
  celebDetails,
  celebVideos,
  favouritesList,
  followCelebrityStatus,
  occasionList,
  myVideosList,
  bookingData,
  otherRelation,
  redirectReferrer,
  paymentDetails,
  videoRecorder,
  videoUploader,
  imageViewer,
  requestHandler,
  audioRecorder,
  popupData,
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
  groupTypesListing,
});

const rootReducer = (state, action) => {
  let newState = { ...state };
  if (action.type === LOGIN.logout) {
    newState = {};
    newState.config = state.config;
    newState.groupTypes = state.groupTypes;
    newState.groupTypesListing = state.groupTypesListing;
  }

  return appReducer(newState, action);
};

export default rootReducer;
