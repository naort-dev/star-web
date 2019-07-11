import { connect } from 'react-redux';
import { loginUser, resetSessionError } from '../../store/shared/actions/login';
import { socialMediaLogin } from '../../store/shared/actions/socialMediaLogin';
import { followCelebrity } from '../../store/shared/actions/followCelebrity';
import { setSocialMediaData, resetSocialMediaData } from '../../store/shared/actions/storeSocialMedia';
import { toggleLogin } from '../../store/shared/actions/toggleModals';
import Login from './Login.component';

const mapStateToProps = state => ({
  isLoggedIn: state.session.isLoggedIn,
  loading: state.session.loading,
  error: state.session.incorrectError,
  statusCode: state.session.statusCode,
  redirectUrls: state.redirectReferrer,
  followCelebData: state.followCelebrityStatus,
  socialMediaStore: state.socialMediaData,
});

const mapDispatchToProps = dispatch => ({
  loginUser: (email, password) => dispatch(loginUser(email, password)),
  socialMediaLogin: (userName, firstName, lastName, signUpSource, profilePhoto, role, fbId, gId, instId) =>
  dispatch(socialMediaLogin(userName, firstName, lastName, signUpSource, profilePhoto, role, fbId, gId, instId)),
  setSocialMediaData: data => dispatch(setSocialMediaData(data)),
  resetSocialMediaData: () => dispatch(resetSocialMediaData()),
  toggleLogin: state => dispatch(toggleLogin(state)),
  followCelebrity: (celebId, celebProfessions, follow, cancelUpdate) => dispatch(followCelebrity(celebId, celebProfessions, follow, cancelUpdate)),
  resetSessionError: () => dispatch(resetSessionError()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
