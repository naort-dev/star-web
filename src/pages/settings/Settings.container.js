import { connect } from 'react-redux';
import Settings from './Settings.component';
import { fetchUserDetails } from '../../store/shared/actions/getUserDetails';
import { updateUserDetails } from '../../store/shared/actions/saveSettings';
import { updateNotification } from '../../store/shared/actions/updateNotification';
import { updateProfilePhoto } from '../../store/shared/actions/updateProfilePhoto';

const mapStateToProps = state => ({
  isLoggedIn: state.session.isLoggedIn,
  sessionDetails: state.session.auth_token,
  loading: state.session.loading,
  userDetails: state.userDetails.settings_userDetails,
  celebrityDetails: state.userDetails.settings_celebrityDetails,
});

const mapDispatchToProps = dispatch => ({
  fetchUserDetails: id => dispatch(fetchUserDetails(id)),
  updateUserDetails: (id, obj) => dispatch(updateUserDetails(id, obj)),
  updateNotification: obj => dispatch(updateNotification(obj)),
  updateProfilePhoto: obj => dispatch(updateProfilePhoto(obj)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
