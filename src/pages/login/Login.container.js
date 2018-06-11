import { connect } from 'react-redux';
import { loginUser } from '../../store/shared/actions/login';
import { socialMediaLogin } from '../../store/shared/actions/socialMediaLogin';
import Login from './Login.component';

const mapStateToProps = state => ({
  isLoggedIn: state.session.isLoggedIn,
  loading: state.session.loading,
  error: state.session.incorrectError,
  statusCode: state.session.statusCode,
});

const mapDispatchToProps = dispatch => ({
  loginUser: (email, password) => dispatch(loginUser(email, password)),
  socialMediaLogin: (userName, firstName, lastName, signUpSource, profilePhoto, role, fbId, gId, instId) =>
    dispatch(socialMediaLogin(userName, firstName, lastName, signUpSource, profilePhoto, role, fbId, gId, instId)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
