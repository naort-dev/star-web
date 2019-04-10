import { connect } from 'react-redux';
import Purchase from './Purchase.Component';
import { fetchOccasionlist } from './actions/purchaseActions';

const mapStateToProps = state => ({
  OccasionDetails: state.occasionList.data,
});

function mapDispatchToProps(dispatch) {
  return {
    fetchOccasionlist: id => dispatch(fetchOccasionlist(id)),
  };
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Purchase);
