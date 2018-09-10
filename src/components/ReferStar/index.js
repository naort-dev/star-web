import React from 'react';
import { connect } from 'react-redux';
import copy from 'copy-to-clipboard';
import Loader from '../Loader';
import ReferralStyled from './styled';
import ScrollList from '../ScrollList';
import RequestFlowPopup from '../RequestFlowPopup';
import { toggleRefer } from '../../store/shared/actions/toggleModals';
import { requestReferral, getReferralList } from '../../store/shared/actions/referStar';
import { fetchUserDetails } from '../../store/shared/actions/getUserDetails';

class ReferStar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentWillMount() {
    this.props.fetchUserDetails(this.props.sessionDetails.id);
    this.props.getReferralList();
  }

  renderReferralDetails = (props) => {
    if (props.userDetails.promo_code) {
      return (
        <ReferralStyled.ReferralDetailsWrapper>
          <ReferralStyled.ReferralDetailsHeading>
            Referral Code
          </ReferralStyled.ReferralDetailsHeading>
          <ReferralStyled.ReferralCode>
            {props.userDetails.promo_code}
          </ReferralStyled.ReferralCode>
          <ReferralStyled.CopyReferral onClick={() => copy(props.userDetails.promo_code)}>
            Copy
          </ReferralStyled.CopyReferral>
          {
            !props.referralListLoading ?
              <ScrollList
                dataList={props.referralDetails.referralList}
                scrollTarget="referral-wrapper"
                referralList
                limit={this.props.referralDetails.limit}
                totalCount={this.props.referralDetails.count}
                offset={this.props.referralDetails.offset}
                loading={this.props.referralDetails.loading}
                fetchData={(offset, refresh) => this.props.referralDetails(offset, refresh)}
              />
            : <Loader />
          }
        </ReferralStyled.ReferralDetailsWrapper>
      );
    } else if (!props.userDetails.has_requested_referral) {
      return <ReferralStyled.RequestReferral onClick={() => props.requestReferral(props.userDetails.id)}>Request your Referral Code</ReferralStyled.RequestReferral>
    }
    return (
      <ReferralStyled.ReferralStatus>
        Your Request for a referral code has been submitted.
          If you don't receive your code within 48 hours, please contact Starsona support.
      </ReferralStyled.ReferralStatus>
    );
  }

  render() {
    const { props } = this;
    return (
      <RequestFlowPopup
        dotsCount={0}
        selectedDot={1}
        closePopUp={() => props.toggleRefer(false)}
        smallPopup
      >
        <ReferralStyled id='referral-wrapper'>
          <ReferralStyled.Heading>
              Refer a Star
          </ReferralStyled.Heading>
          {
            props.loading ?
              <Loader />
            :
              this.renderReferralDetails(props)
          }
        </ReferralStyled>
      </RequestFlowPopup>
    );
  }
}

const mapStateToProps = state => ({
  userDetails: state.userDetails.settings_userDetails,
  sessionDetails: state.session.auth_token,
  loading: state.userDetails.loading,
  referralDetails: state.referralDetails,
  referralListLoading: state.referralDetails.loading,
});

const mapDispatchToProps = dispatch => ({
  toggleRefer: state => dispatch(toggleRefer(state)),
  requestReferral: id => dispatch(requestReferral(id)),
  fetchUserDetails: id => dispatch(fetchUserDetails(id)),
  getReferralList: () => dispatch(getReferralList()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReferStar);
