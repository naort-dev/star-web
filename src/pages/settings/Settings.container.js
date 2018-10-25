import { connect } from 'react-redux';
import Settings from './Settings.component';
import { fetchUserDetails } from '../../store/shared/actions/getUserDetails';
import { updateUserDetails } from '../../store/shared/actions/saveSettings';
import { updateNotification } from '../../store/shared/actions/updateNotification';
import { updateProfilePhoto } from '../../store/shared/actions/updateProfilePhoto';
import { changePassword, resetChangePassord } from '../../store/shared/actions/changePassword';

const mapStateToProps = state => ({
  isLoggedIn: state.session.isLoggedIn,
  sessionDetails: state.session.auth_token,
  loading: state.session.loading,
  userDetails: state.userDetails.settings_userDetails,
  celebrityDetails: state.userDetails.settings_celebrityDetails,
  changePasswordData: state.changePassword,
});

const mapDispatchToProps = dispatch => ({
  fetchUserDetails: id => dispatch(fetchUserDetails(id)),
  updateUserDetails: (id, obj) => dispatch(updateUserDetails(id, obj)),
  updateNotification: obj => dispatch(updateNotification(obj)),
  updateProfilePhoto: obj => dispatch(updateProfilePhoto(obj)),
  changePassword: data => dispatch(changePassword(data)),
  resetChangePassword: () => dispatch(resetChangePassord()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
