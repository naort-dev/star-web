import { connect } from 'react-redux';
import Earnings from './Earnings.component';
import { fetchEarningsList } from './actions/getEarningsList';

const mapStateToProps = state => ({
  professionsList: state.professionsList,
  paidList: state.earningsList.paidList,
  pendingList: state.earningsList.pendingList,
  list: state.earningsList.list,
  paidAmount: state.earningsList.paidAmount,
  pendingAmount: state.earningsList.pendingAmount,
  totalAmount: state.earningsList.totalAmount,
  paidAmountPaidPage: state.earningsList.paidAmountPaidPage,
  pendingAmountPaidPage: state.earningsList.pendingAmountPaidPage,
  totalAmountPaidPage: state.earningsList.totalAmountPaidPage,
  paidAmountPendingPage: state.earningsList.paidAmountPendingPage,
  pendingAmountPendingPage: state.earningsList.pendingAmountPendingPage,
  totalAmountPendingPage: state.earningsList.totalAmountPendingPage,
  pendingCount: state.earningsList.pendingCount,
  paidCount: state.earningsList.paidCount,
  pendingOffset: state.earningsList.pendingOffset,
  paidOffset: state.earningsList.paidOffset,
  paidLoading: state.earningsList.paidLoading,
  pendingLoading: state.earningsList.pendingLoading,
});

const mapDispatchToProps = dispatch => ({
  fetchEarningsList: params => dispatch(fetchEarningsList(params)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Earnings);
