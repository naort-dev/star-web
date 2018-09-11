import { combineReducers } from 'redux';
import { LOGIN } from './shared/actions/login';

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
import earningsList from '../pages/earnings/reducers/earningsList';
import bookingData from '../store/shared/reducers/bookings';
import redirectReferrer from '../store/shared/reducers/redirect';
import otherRelation from '../store/shared/reducers/other';
import paymentDetails from '../store/shared/reducers/payments';
import videoRecorder from '../store/shared/reducers/videoRecording';
import videoUploader from '../store/shared/reducers/videoUploader';
import requestHandler from '../pages/myVideos/reducers/requestHandler';
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

const appReducer = combineReducers({
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
});

const rootReducer = (state, action) => {
  if (action.type === LOGIN.logout) {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
