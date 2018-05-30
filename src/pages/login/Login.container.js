import { connect } from 'react-redux';
import { loginUser } from '../../store/shared/actions/login';
import Login from './Login.component';

const mapStateToProps = state => ({
  isLoggedIn: state.session.isLoggedIn,
  loading: state.session.loading,
});

const mapDispatchToProps = dispatch => ({
  loginUser: state => dispatch(loginUser(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
