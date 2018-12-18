import Starsuccess from './Starsuccess.component'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux';


const mapStateToProps = state => ({
   session: state.session,
   imageViewer: state.imageViewer
  });

export default withRouter(connect(mapStateToProps)(Starsuccess))

