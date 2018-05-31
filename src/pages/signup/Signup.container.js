import { connect } from 'react-redux';
import { registerUser } from '../../store/shared/actions/register';
import SignUp from './Signup.component';

const mapStateToProps = state => ({
  isLoggedIn: state.session.isLoggedIn,
  loading: state.session.loading,
});

const mapDispatchToProps = dispatch => ({
  registerUser: state => dispatch(registerUser(state)),
});


export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
