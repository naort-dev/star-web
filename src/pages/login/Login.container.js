import { connect } from 'react-redux';
import { loginUser } from '../../store/shared/actions/login';
import { socialMediaLogin } from '../../store/shared/actions/socialMediaLogin';
import { resetRedirectUrls } from '../../store/shared/actions/setRedirectReferrer';
import { followCelebrity } from '../../store/shared/actions/followCelebrity';
import Login from './Login.component';

const mapStateToProps = state => ({
  isLoggedIn: state.session.isLoggedIn,
  loading: state.session.loading,
  error: state.session.incorrectError,
  statusCode: state.session.statusCode,
  redirectUrls: state.redirectReferrer,
  followCelebData: state.followCelebrityStatus,
});

const mapDispatchToProps = dispatch => ({
  loginUser: (email, password) => dispatch(loginUser(email, password)),
  socialMediaLogin: (userName, firstName, lastName, signUpSource, profilePhoto, role, fbId, gId, instId) =>
    dispatch(socialMediaLogin(userName, firstName, lastName, signUpSource, profilePhoto, role, fbId, gId, instId)),
  resetRedirectUrls: () => dispatch(resetRedirectUrls()),
  followCelebrity: (celebId, celebProfessions, follow, cancelUpdate) => dispatch(followCelebrity(celebId, celebProfessions, follow, cancelUpdate)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
