import { connect } from 'react-redux';

import Unauthorized from './Unauthorized.component';

const mapStateToProps = state => ({
  isLoggedIn: state.session.isLoggedIn,
});

export default connect(mapStateToProps)(Unauthorized);
