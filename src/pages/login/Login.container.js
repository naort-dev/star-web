import { connect } from 'react-redux';

import Login from './Login.component';

const mapStateToProps = state => ({
  isLoggedIn: state.session.isLoggedIn,
  loading: state.session.loading,
});

const mapDispatchToProps = dispatch => ({
  onLogin: () => {
    dispatch({ type: 'session/ON_LOGIN' });

    setTimeout(() => {
      dispatch({ type: 'session/ON_LOGIN_SUCCESS', user: { role: 'SUPER_ADMIN' } });
    }, 1000);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
