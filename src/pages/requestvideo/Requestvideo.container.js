import { connect } from 'react-redux';
import Requestvideo from './Requestvideo.component';
import { setRedirectUrls } from '../../store/shared/actions/setRedirectReferrer';


const mapStateToProps = state => ({
  isLoggedIn: state.session.isLoggedIn,
  loading: state.session.loading,
  celebrityDetails: state.celebDetails.celebrityDetails,
  userDetails: state.celebDetails.userDetails,
});

const mapDispatchToProps = dispatch => ({
  setRedirectUrls: (to, from) => dispatch(setRedirectUrls(to, from)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Requestvideo);
