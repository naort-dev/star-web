import { connect } from 'react-redux';
import { loginUser } from '../../store/shared/actions/login';
import { socialMediaLogin } from '../../store/shared/actions/socialMediaLogin';
import Login from './Login.component';

const mapStateToProps = state => ({
  isLoggedIn: state.session.isLoggedIn,
  loading: state.session.loading,
  error: state.session.incorrectError,
});

const mapDispatchToProps = dispatch => ({
  loginUser: (email, password) => dispatch(loginUser(email, password)),
  socialMediaLogin: (userName, firstName, lastName, signUpSource, profilePhoto, fbId) => dispatch(socialMediaLogin(userName, firstName, lastName, signUpSource, profilePhoto, fbId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
