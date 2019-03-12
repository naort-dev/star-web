import React from 'react';
import {
  FacebookShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
  WhatsappIcon,
  FacebookIcon,
  TwitterIcon,
  EmailIcon,
} from 'react-share';
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import copy from 'copy-to-clipboard';
import Popup from '../Popup';
import SnackBar from '../SnackBar';
import ShareStyled from './styled';

export default class ShareView extends React.Component {

  constructor(props) {
    super(props);
    this.popupResolution = 1025;
    this.state = {
      snackBarText: '',
      sharePopup: document.body.getBoundingClientRect().width >= this.popupResolution,
    };
  }

  componentDidMount() {
    const { sharePopup } = this.state;
    if (!sharePopup) {
      disableBodyScroll(null);
    }
    window.addEventListener('resize', this.handleWindowResize);
  }

  componentWillUnmount() {
    const { sharePopup } = this.state;
    if (!sharePopup) {
      enableBodyScroll(null);
    }
    window.removeEventListener('resize', this.handleWindowResize);
  }

  setSnackBarText = (text) => {
    this.setState({ snackBarText: text });
  }

  handleWindowResize = () => {
    this.props.closePopUp();
  }

  closeSnackBar = () => {
    this.setState({ snackBarText: '' });
  }

  copyUrl = () => {
    const { shareUrl } = this.props;
    copy(shareUrl);
    this.setSnackBarText('Link copied to clipboard');
  }

  renderSocialIcons = () => {
    const { title, shareUrl, emailSubject, body } = this.props;
    return (
      <React.Fragment>
        <ShareStyled.Somenetwork>
          <FacebookShareButton
            url={shareUrl}
            quote={title}
            className="Demo__some-network__share-button"
          >
            <FacebookIcon
              size={32}
              round
            />
            <ShareStyled.SocialTitle>Share to Facebook</ShareStyled.SocialTitle>
          </FacebookShareButton>
        </ShareStyled.Somenetwork>
        <ShareStyled.Somenetwork>
          <TwitterShareButton
            url={shareUrl}
            title={title}
            className="Demo__some-network__share-button"
          >
            <TwitterIcon
              size={32}
              round
            />
            <ShareStyled.SocialTitle>Share to Twitter</ShareStyled.SocialTitle>
          </TwitterShareButton>
        </ShareStyled.Somenetwork>
        <ShareStyled.Somenetwork>
          <WhatsappShareButton
            url={shareUrl}
            title={title}
            separator=":: "
            className="Demo__some-network__share-button"
          >
            <WhatsappIcon size={32} round />
            <ShareStyled.SocialTitle>Share to Whatsapp</ShareStyled.SocialTitle>
          </WhatsappShareButton>
        </ShareStyled.Somenetwork>
        <ShareStyled.Somenetwork>
          <EmailShareButton
            url={shareUrl}
            subject={emailSubject || title}
            body={body ? `${body}\n\n${shareUrl}` : shareUrl}
            className="Demo__some-network__share-button"
          >
            <EmailIcon
              size={32}
              round
            />
            <ShareStyled.SocialTitle>Share via Email</ShareStyled.SocialTitle>
          </EmailShareButton>
        </ShareStyled.Somenetwork>
        <ShareStyled.Somenetwork onClick={() => this.copyUrl(shareUrl)}>
          <ShareStyled.Copy size={32} title="Copy to Clipboard" />
          <ShareStyled.SocialTitle>Copy link</ShareStyled.SocialTitle>
        </ShareStyled.Somenetwork>
        <ShareStyled.Somenetwork isCancel onClick={this.props.closePopUp}>
          Cancel
        </ShareStyled.Somenetwork>
      </React.Fragment>
    );
  }

  render() {
    if (this.state.sharePopup && document.body.getBoundingClientRect().width >= this.popupResolution) {
      return (
        <React.Fragment>
          <Popup
            smallPopup
            closePopUp={this.props.closePopUp}
          >
            { this.renderSocialIcons() }
          </Popup>
          {
            this.state.snackBarText !== '' &&
              <SnackBar text={this.state.snackBarText} closeSnackBar={this.closeSnackBar} />
          }
        </React.Fragment>
      );
    }
    return (
      <ShareStyled>
        {
          this.state.snackBarText !== '' &&
            <SnackBar text={this.state.snackBarText} closeSnackBar={this.closeSnackBar} />
        }
        {
          !this.state.sharePopup &&
            <ShareStyled.Overlay onClick={this.props.closePopUp} />
        }
        <ShareStyled.SocialMediaWrapper visible={!this.state.sharePopup}>
          <ShareStyled.Drawer onClick={this.props.closePopUp} />
          <ShareStyled.SocialHeading>Share</ShareStyled.SocialHeading>
          {this.renderSocialIcons()}
        </ShareStyled.SocialMediaWrapper>
      </ShareStyled>
    );
  }
}
