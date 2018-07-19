import Starbio from './Starbio.component'
import {withRouter} from 'react-router-dom'
import { connect } from 'react-redux';

const mapStateToProps = state => ({
    session: state.session
  });
  
  const mapDispatchToProps = dispatch => ({
  });

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Starbio))

