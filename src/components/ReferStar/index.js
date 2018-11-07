import React, { Fragment } from 'react';
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
import Popup from '../Popup';
import RequestFlowPopup from '../RequestFlowPopup';
import { toggleRefer } from '../../store/shared/actions/toggleModals';
import { requestReferral, getReferralList, getReferalLink } from '../../store/shared/actions/referStar';
import { fetchUserDetails } from '../../store/shared/actions/getUserDetails';
import { contactSupport } from '../../store/shared/actions/popupActions';
import SubmitPopup from '../OrderDetails/SubmitPopup';

class ReferStar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      copyStatus: null,
    };
    this.copyInterval = null;
  }

  componentWillMount() {
    this.props.fetchUserDetails(this.props.sessionDetails.id);
    this.props.getReferralList(0);
    const data = {
      code: this.props.userDetails.promo_code,
    };
    if (data.code) this.props.getReferalLink(data);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.userDetails.promo_code !== nextProps.userDetails.promo_code && nextProps.userDetails.promo_code) {
      const data = {
        code: nextProps.userDetails.promo_code,
      };
      if (data.code) this.props.getReferalLink(data);
    }
  }

  onClickSupport = () => {
    // this.props.toggleRefer(false);
    this.setState({ openSupport: true });
  }

  copy = (data, type) => {
    copy(data);
    this.setState({ copyStatus: type }, () => {
      clearInterval(this.copyInterval);
      this.copyInterval = setTimeout(() => {
        this.setState({
          copyStatus: null,
        });
      }, 1000);
    });
  }

  renderReferralList = () => {
    if (this.props.referralListLoading) {
      return <Loader />;
    } else if (this.props.referralDetails.referralList.length) {
      return (
        <ScrollList
          dataList={this.props.referralDetails.referralList}
          scrollTarget="referral-wrapper"
          referralList
          limit={this.props.referralDetails.limit}
          totalCount={this.props.referralDetails.count}
          offset={this.props.referralDetails.offset}
          loading={this.props.referralDetails.loading}
          fetchData={(offset, refresh) => this.props.referralDetails(offset, refresh)}
        />
      );
    }
    return null;
  }

  renderSocialIcons = shareUrl => (
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
            round
          />
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
        <ReferralStyled.Copy title="Copy to Clipboard" onClick={() => this.copy(shareUrl, 'link')} />
      </ReferralStyled.Somenetwork>
    </React.Fragment>
  )

  renderBanner = () => (
    <Fragment>
      <svg id="bigHalfCircle" xmlns="http://www.w3.org/2000/svg" version="1.1" width="100%" height="120px" viewBox="0 0 100 100" preserveAspectRatio="none">
        <rect x="0" y="0" width="100%" height="34" fill="#ff6c58" />
        <path
          d="m0,67c40,-81 60,-81 100,0l-100,0z"
          fill="#ff6c58"
          style={{
            transform: 'rotate(180deg)',
            transformOrigin: '50% 50%',
          }}
        />
      </svg>
      <ReferralStyled.Broadcast />
    </Fragment>
  )

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
          <ReferralStyled.CopyReferral onClick={() => this.copy(props.userDetails.promo_code, 'promo')}>
            {this.state.copyStatus === 'promo' ? 'Copied' : 'Copy'}
          </ReferralStyled.CopyReferral>
          {this.props.referralDetails.link && <ReferralStyled.referButton onClick={() => this.setState({ share: !this.state.share })}>Invite a star</ReferralStyled.referButton>}
          {
            this.state.share &&
              <ReferralStyled.IconWrapper>{ this.renderSocialIcons(this.props.referralDetails.link)}</ReferralStyled.IconWrapper>
          }
          {
            this.renderReferralList()
          }
          <ReferralStyled.Link href="https://about.starsona.com/referral-program/" target="_blank" rel="noopener noreferrer">
            Terms and conditions
          </ReferralStyled.Link>
        </ReferralStyled.ReferralDetailsWrapper>
      );
    } else if (!props.userDetails.has_requested_referral) {
      return <ReferralStyled.RequestReferral onClick={() => props.requestReferral(props.userDetails.id)}>Request your Referral Code</ReferralStyled.RequestReferral>;
    }
    return (
      <ReferralStyled.ReferralStatus>
        Your request for a referral code has been submitted.
          If you don't receive your code within 48 hours, please contact
        <ReferralStyled.SupportLink onClick={this.onClickSupport}> Starsona support.</ReferralStyled.SupportLink>
      </ReferralStyled.ReferralStatus>
    );
  }

  render() {
    const { props } = this;
    return (
      this.state.openSupport ?
        <Popup
          smallPopup
          closePopUp={() => this.setState({ openSupport: false })}
        >
          <SubmitPopup
            heading="Contact support"
            onSubmit={data => this.props.contactSupport({ comments: data.comment })}
            closePopup={() => this.setState({ openSupport: false })}
          />
        </Popup>
        
        :
        <RequestFlowPopup
          dotsCount={0}
          selectedDot={1}
          closePopUp={() => props.toggleRefer(false)}
          closeIconColor="white"
          smallPopup
        >
          <ReferralStyled.ScrollView>
            <ReferralStyled.Banner>{this.renderBanner()}</ReferralStyled.Banner>
            <ReferralStyled id="referral-wrapper">
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
          </ReferralStyled.ScrollView>
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
  contactSupport: data => dispatch(contactSupport(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReferStar);
