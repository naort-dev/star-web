import Starbio from './Starbio.component'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux';
import { saveImage } from '../../store/shared/actions/imageViewer'

const mapStateToProps = state => ({
  session: state.session,
  imageViewer: state.imageViewer
});

const mapDispatchToProps = dispatch => ({
  onSaveImage: (imageData) => dispatch(saveImage(imageData))

});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Starbio))

