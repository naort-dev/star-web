import { connect } from 'react-redux';

import AccountSettings from './accountSettings.component';

const mapStateToProps = state => ({
  isLoggedIn: state.session.isLoggedIn,
  loading: state.session.loading,
  session: state.session,
});

const mapDispatchToProps = dispatch => ({
});


export default connect(mapStateToProps, mapDispatchToProps)(AccountSettings);
