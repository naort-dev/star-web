import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Starbio from './Starbio.component';
import { saveImage } from '../../store/shared/actions/imageViewer';
import { fetchUserDetails, resetUserDetails } from '../../store/shared/actions/getUserDetails';

const mapStateToProps = state => ({
  session: state.session,
  imageViewer: state.imageViewer,
  userDetails: state.userDetails,
});

const mapDispatchToProps = dispatch => ({
  fetchUserDetails: id => dispatch(fetchUserDetails(id)),
  resetUserDetails: () => dispatch(resetUserDetails()),
  onSaveImage: imageData => dispatch(saveImage(imageData)),

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Starbio));

