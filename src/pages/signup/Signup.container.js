import { connect } from 'react-redux';
import { registerUser } from '../../store/shared/actions/register';
import { socialMediaLogin } from '../../store/shared/actions/socialMediaLogin';
import { resetRedirectUrls } from '../../store/shared/actions/setRedirectReferrer';
import SignUp from './Signup.component';

const mapStateToProps = state => ({
  isLoggedIn: state.session.isLoggedIn,
  loading: state.session.loading,
  error: state.session.incorrectError,
  statusCode: state.session.statusCode,
  redirectUrls: state.redirectReferrer,
});

const mapDispatchToProps = dispatch => ({
  registerUser: (firstName, lastName, email, password, role) =>
    dispatch(registerUser(firstName, lastName, email, password, role)),
  socialMediaLogin: (userName, firstName, lastName, signUpSource, profilePhoto, fbId) =>
    dispatch(socialMediaLogin(userName, firstName, lastName, signUpSource, profilePhoto, fbId)),
  resetRedirectUrls: () => dispatch(resetRedirectUrls()),
});


export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
