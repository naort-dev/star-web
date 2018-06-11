import { connect } from 'react-redux';

import Starprofile from './Starprofile.component';
import { fetchCelebDetails } from './actions/getCelebDetails';

const mapStateToProps = state => ({
  celebDetails: state.celebDetails.data,
});

const mapDispatchToProps = dispatch => ({
  fetchCelebDetails: id => dispatch(fetchCelebDetails(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Starprofile);
