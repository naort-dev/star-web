import { connect } from 'react-redux';
import Settings from './Settings.component';
import { fetchUserDetails } from '../../store/shared/actions/getUserDetails';

const mapStateToProps = state => ({
  isLoggedIn: state.session.isLoggedIn,
  sessionDetails: state.session.auth_token,
  loading: state.session.loading,
  userDetails: state.userDetails.settings_userDetails,
  celebrityDetails: state.userDetails.settings_celebrityDetails,
});

const mapDispatchToProps = dispatch => ({
  fetchUserDetails: id => dispatch(fetchUserDetails(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
