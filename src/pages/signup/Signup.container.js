import { connect } from 'react-redux';
import { registerUser } from '../../store/shared/actions/register';
import SignUp from './Signup.component';

const mapStateToProps = state => ({
  isLoggedIn: state.session.isLoggedIn,
  loading: state.session.loading,
  error: state.session.incorrectError,
});

const mapDispatchToProps = dispatch => ({
  registerUser: (firstName, lastName, email, password, role) =>
    dispatch(registerUser(firstName, lastName, email, password, role)),
});


export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
