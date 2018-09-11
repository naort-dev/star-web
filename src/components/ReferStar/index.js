import React from 'react';
import { connect } from 'react-redux';
import copy from 'copy-to-clipboard';
import {
  FacebookShareButton,
  GooglePlusShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  WhatsappIcon,
  FacebookIcon,
  TwitterIcon,
  GooglePlusIcon,
  EmailIcon,
} from 'react-share';
import Loader from '../Loader';
import ReferralStyled from './styled';
import ScrollList from '../ScrollList';
import RequestFlowPopup from '../RequestFlowPopup';
import { toggleRefer } from '../../store/shared/actions/toggleModals';
import { requestReferral, getReferralList, getReferalLink } from '../../store/shared/actions/referStar';
import { fetchUserDetails } from '../../store/shared/actions/getUserDetails';

class ReferStar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentWillMount() {
    this.props.fetchUserDetails(this.props.sessionDetails.id);
    this.props.getReferralList(0);
    const data = {
      code: this.props.userDetails.promo_code
    }
    this.props.getReferalLink(data)
  }

  renderSocialIcons = (shareUrl) => {
    return (
      <React.Fragment>
        <ReferralStyled.Somenetwork>
          <FacebookShareButton
            url={shareUrl}
            className="Demo__some-network__share-button"
          >
            <FacebookIcon
              size={32}
              round
            />
          </FacebookShareButton>
        </ReferralStyled.Somenetwork>
        <ReferralStyled.Somenetwork>
          <GooglePlusShareButton
            url={shareUrl}
            className="Demo__some-network__share-button"
          >
            <GooglePlusIcon
              size={32}
              round />
          </GooglePlusShareButton>
        </ReferralStyled.Somenetwork>
        <ReferralStyled.Somenetwork>
          <TwitterShareButton
            url={shareUrl}
            className="Demo__some-network__share-button"
          >
            <TwitterIcon
              size={32}
              round
            />
          </TwitterShareButton>
        </ReferralStyled.Somenetwork>
        <ReferralStyled.Somenetwork>
          <WhatsappShareButton
            url={shareUrl}
            separator=":: "
            className="Demo__some-network__share-button"
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </ReferralStyled.Somenetwork>
        <ReferralStyled.Somenetwork>
          <EmailShareButton
            url={shareUrl}
            body={shareUrl}
            className="Demo__some-network__share-button"
          >
            <EmailIcon
              size={32}
              round
            />
          </EmailShareButton>
        </ReferralStyled.Somenetwork>
        <ReferralStyled.Somenetwork>
          <ReferralStyled.Copy title="Copy to Clipboard" onClick={() => copy(shareUrl)} /> 
        </ReferralStyled.Somenetwork>
      </React.Fragment>
    );
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
          {this.props.referralDetails.link && <ReferralStyled.referButton onClick={() => this.setState({ share: !this.state.share })}>Click me</ReferralStyled.referButton>}
          <ReferralStyled.IconWrapper>{ this.state.share && this.renderSocialIcons(this.props.referralDetails.link)}</ReferralStyled.IconWrapper>
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
  getReferralList: offset => dispatch(getReferralList(offset)),
  getReferalLink: data => dispatch(getReferalLink(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReferStar);
