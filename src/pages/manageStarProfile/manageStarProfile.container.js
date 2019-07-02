import { connect } from 'react-redux';

import ManageStarProfile from './manageStarProfile.component';

const mapStateToProps = state => ({
  userDetails: state.userDetails,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(ManageStarProfile);