import React from 'react';
import { connect } from 'react-redux';
import copy from 'copy-to-clipboard';
import ReferralStyled from './styled';
import RequestFlowPopup from '../RequestFlowPopup';
import { toggleRefer } from '../../store/shared/actions/toggleModals';

class ReferStar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  renderReferralDetails = (props) => {
    if (!props.userDetails.has_requested_referral) {
      return <ReferralStyled.RequestReferral>Request your Referral Code</ReferralStyled.RequestReferral>
    } else if (!props.userDetails.promo_code) {
      return (
        <ReferralStyled.ReferralStatus>
          Your Request for a referral code has been submitted.
            If you don't receive your code within 48 hours, please contact Starsona support.
        </ReferralStyled.ReferralStatus>
      );
    }
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
      </ReferralStyled.ReferralDetailsWrapper>
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
        <ReferralStyled>
          <ReferralStyled.Heading>
              Refer a Star
          </ReferralStyled.Heading>
          {
            this.renderReferralDetails(props)
          }
        </ReferralStyled>
      </RequestFlowPopup>
    );
  }
}

const mapStateToProps = state => ({
  userDetails: state.userDetails.settings_userDetails,
});

const mapDispatchToProps = dispatch => ({
  toggleRefer: state => dispatch(toggleRefer(state)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReferStar);
