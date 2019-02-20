import React from 'react';
import {
  WhatsappIcon,
  FacebookIcon,
  TwitterIcon,
  GooglePlusIcon,
  EmailIcon,
} from 'react-share';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import copy from 'copy-to-clipboard';
import SnackBar from '../../../../components/SnackBar';
import { shareTitleGenerator } from '../../../../utils/dataToStringFormatter';
import ReminderStyled from './styled';
import RequestFlowPopup from '../../../../components/RequestFlowPopup';

export default class RateReminder extends React.Component {
  state = {
    snackBarText: '',
    showPopup: false,
  }

  componentWillMount() {
    this.toggleViews();
    window.addEventListener('resize', this.toggleViews);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.toggleViews);
  }

  setSnackBarText = (text) => {
    this.setState({ snackBarText: text });
  }

  toggleViews = () => {
    const { showPopup } = this.state;
    if (document.body.getBoundingClientRect().width >= 1025 && !showPopup) {
      enableBodyScroll(null);
      this.setState({ showPopup: true });
    } else {
      disableBodyScroll(null);
      this.setState({ showPopup: false });
    }
  }


  copyUrl = (shareUrl) => {
    copy(shareUrl);
    this.setSnackBarText('Link copied to clipboard');
  }

  closeSnackBar = () => {
    this.setSnackBarText('');
  }

  enableRateView = () => {
    this.setState({ showPopup: false });
    this.props.closeRateReminder();
    this.props.selectItem('rate');
  }

  renderSocialIcons = (selectedVideo) => {
    const defaultUrl = selectedVideo.video_url;
    const shareUrl = `https://${defaultUrl}`;
    let title = shareTitleGenerator(this.props.requestType, this.props.celebrity);
    const emailSubject = `Check out this video from ${this.props.celebrity} !`;
    const emailBody = `${title}\n${shareUrl}`;
    return (
      <React.Fragment>
        <ReminderStyled.NetworkWrapper>
          <ReminderStyled.FacebookShareButton
            url={shareUrl}
            quote={title}
            className="Demo__some-network__share-button"
          >
            <FacebookIcon
              size={32}
              round
            />
          </ReminderStyled.FacebookShareButton>
          <ReminderStyled.NetworkName>Facebook</ReminderStyled.NetworkName>
        </ReminderStyled.NetworkWrapper>
        <ReminderStyled.NetworkWrapper>
          <ReminderStyled.GooglePlusShareButton
            url={shareUrl}
            className="Demo__some-network__share-button"
          >
            <GooglePlusIcon
              size={32}
              round
            />
          </ReminderStyled.GooglePlusShareButton>
          <ReminderStyled.NetworkName>Google Plus</ReminderStyled.NetworkName>
        </ReminderStyled.NetworkWrapper>
        <ReminderStyled.NetworkWrapper>
          <ReminderStyled.TwitterShareButton
            url={shareUrl}
            title={title}
            className="Demo__some-network__share-button"
          >
            <TwitterIcon
              size={32}
              round
            />
          </ReminderStyled.TwitterShareButton>
          <ReminderStyled.NetworkName>Twitter</ReminderStyled.NetworkName>
        </ReminderStyled.NetworkWrapper>
        <ReminderStyled.NetworkWrapper>
          <ReminderStyled.WhatsappShareButton
            url={shareUrl}
            title={title}
            separator=":: "
            className="Demo__some-network__share-button"
          >
            <WhatsappIcon size={32} round />
          </ReminderStyled.WhatsappShareButton>
          <ReminderStyled.NetworkName>Whatsapp</ReminderStyled.NetworkName>
        </ReminderStyled.NetworkWrapper>
        <ReminderStyled.NetworkWrapper>
          <ReminderStyled.EmailShareButton
            url={shareUrl}
            subject={emailSubject}
            body={emailBody}
            className="Demo__some-network__share-button"
          >
            <EmailIcon
              size={32}
              round
            />
          </ReminderStyled.EmailShareButton>
          <ReminderStyled.NetworkName>Email</ReminderStyled.NetworkName>
        </ReminderStyled.NetworkWrapper>
        <ReminderStyled.NetworkWrapper onClick={() => this.copyUrl(shareUrl)}>
          <ReminderStyled.CopyButton title="Copy to Clipboard" />
          <ReminderStyled.NetworkName>Copy</ReminderStyled.NetworkName>
        </ReminderStyled.NetworkWrapper>
      </React.Fragment>
    );
  }

  renderRateReminder = ({ title, selectedVideo }) => (
    <React.Fragment>
      <ReminderStyled.Header>Rate your video</ReminderStyled.Header>
      <ReminderStyled.Description>
        {title}
      </ReminderStyled.Description>
      <ReminderStyled.ActionButton onClick={this.enableRateView}>
        Rate now
      </ReminderStyled.ActionButton>
      <ReminderStyled.ShareWrapper>
        <ReminderStyled.ShareHeader>Share your video to</ReminderStyled.ShareHeader>
        <ReminderStyled.ShareContent>
          { this.renderSocialIcons(selectedVideo) }
        </ReminderStyled.ShareContent>
      </ReminderStyled.ShareWrapper>
    </React.Fragment>
  )

  render() {
    const { showPopup } = this.state;
    return (
      <React.Fragment>
        {
          this.state.snackBarText !== '' &&
            <SnackBar
              text={this.state.snackBarText}
              closeSnackBar={this.closeSnackBar}
            />
        }
        {
          !showPopup &&
            <ReminderStyled.Overlay onClick={this.props.closeRateReminder} />
        }
        {
          showPopup ?
            <RequestFlowPopup
              dotsCount={0}
              smallPopup
              autoWidth
              closePopUp={this.props.closeRateReminder}
            >
              <ReminderStyled>
                {this.renderRateReminder(this.props)}
              </ReminderStyled>
            </RequestFlowPopup>
          :
            <ReminderStyled.MobilePopup>
              {this.renderRateReminder(this.props)}
              <ReminderStyled.MobileCancel onClick={this.props.closeRateReminder}>Cancel</ReminderStyled.MobileCancel>
            </ReminderStyled.MobilePopup>
        }
      </React.Fragment>
    );
  }
}
