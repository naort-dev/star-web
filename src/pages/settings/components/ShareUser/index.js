import React from 'react';
import copy from 'copy-to-clipboard';
import {
  WhatsappIcon,
  FacebookIcon,
  TwitterIcon,
  GooglePlusIcon,
  EmailIcon,
} from 'react-share';
import SettingsStyled from '../../styled';
import SnackBar from '../../../../components/SnackBar';
import ShareStyled from './styled';

export default class ShareUser extends React.Component {

  state = {
    snackBarText: '',
  }

  setSnackBarText = (text) => {
    this.setState({ snackBarText: text });
  }
  
  closeSnackBar = () => {
    this.setState({ snackBarText: '' });
  }

  copyUrl = (shareText, snackBarText) => {
    copy(shareText);
    this.setSnackBarText(snackBarText);
  }

  renderInviteView = (referralCode) => {
    return (
      <React.Fragment>
        <ShareStyled.HeadingWrapper>
          <ShareStyled.SubHeading>
            Invite your Stars
          </ShareStyled.SubHeading>
          <ShareStyled.SubHeadingDescription>
            
          </ShareStyled.SubHeadingDescription>
        </ShareStyled.HeadingWrapper>
        <SettingsStyled.InputWrapper>
          <SettingsStyled.Label>Star referral code</SettingsStyled.Label>
          <SettingsStyled.WrapsInput>
            <SettingsStyled.CustomInput>
              <SettingsStyled.ReadOnlySection>
                <span>{referralCode}</span>
                <ShareStyled.CopyButton title="Copy to Clipboard" onClick={() => this.copyUrl(referralCode, 'Referral code copied to clipboard')}>Copy</ShareStyled.CopyButton>
              </SettingsStyled.ReadOnlySection>
            </SettingsStyled.CustomInput>
            <ShareStyled.MinorDescription>This unique code will not expire</ShareStyled.MinorDescription>
          </SettingsStyled.WrapsInput>
        </SettingsStyled.InputWrapper>
      </React.Fragment>
    );
  }

  renderShareView = (shareUrl) => {
    const { heading, description } = this.props;
    return (
      <React.Fragment>
        <ShareStyled.HeadingWrapper>
          <ShareStyled.SubHeading>
            {heading}
          </ShareStyled.SubHeading>
          <ShareStyled.SubHeadingDescription>
            {description}
          </ShareStyled.SubHeadingDescription>
        </ShareStyled.HeadingWrapper>
        <SettingsStyled.InputWrapper>
          <SettingsStyled.Label>Profile link</SettingsStyled.Label>
          <SettingsStyled.WrapsInput>
            <SettingsStyled.CustomInput>
              <SettingsStyled.ReadOnlySection>
                <span>{shareUrl}</span>
                <ShareStyled.CopyButton title="Copy to Clipboard" onClick={() => this.copyUrl(shareUrl, 'Link copied to clipboard')}>Copy</ShareStyled.CopyButton>
              </SettingsStyled.ReadOnlySection>
            </SettingsStyled.CustomInput>
          </SettingsStyled.WrapsInput>
        </SettingsStyled.InputWrapper>
        <SettingsStyled.InputWrapper>
          <SettingsStyled.Label>Share link</SettingsStyled.Label>
          <SettingsStyled.WrapsInput>
            <SettingsStyled.CustomInput>
              {
                this.renderShareButtons(shareUrl)
              }
            </SettingsStyled.CustomInput>
          </SettingsStyled.WrapsInput>
        </SettingsStyled.InputWrapper>
      </React.Fragment>
    )
  }

  renderShareButtons = (shareUrl) => {
    return (
      <div>
        <ShareStyled.NetworkWrapper>
          <ShareStyled.FacebookShareButton
            url={shareUrl}
            className="Demo__some-network__share-button"
          >
            <FacebookIcon
              size={32}
              round
            />
          </ShareStyled.FacebookShareButton>
          <ShareStyled.NetworkName>Facebook</ShareStyled.NetworkName>
        </ShareStyled.NetworkWrapper>
        <ShareStyled.NetworkWrapper>
          <ShareStyled.GooglePlusShareButton
            url={shareUrl}
            className="Demo__some-network__share-button"
          >
            <GooglePlusIcon
              size={32}
              round
            />
          </ShareStyled.GooglePlusShareButton>
          <ShareStyled.NetworkName>Google Plus</ShareStyled.NetworkName>
        </ShareStyled.NetworkWrapper>
        <ShareStyled.NetworkWrapper>
          <ShareStyled.TwitterShareButton
            url={shareUrl}
            className="Demo__some-network__share-button"
          >
            <TwitterIcon
              size={32}
              round
            />
          </ShareStyled.TwitterShareButton>
          <ShareStyled.NetworkName>Twitter</ShareStyled.NetworkName>
        </ShareStyled.NetworkWrapper>
        <ShareStyled.NetworkWrapper>
          <ShareStyled.WhatsappShareButton
            url={shareUrl}
            separator=":: "
            className="Demo__some-network__share-button"
          >
            <WhatsappIcon size={32} round />
          </ShareStyled.WhatsappShareButton>
          <ShareStyled.NetworkName>Whatsapp</ShareStyled.NetworkName>
        </ShareStyled.NetworkWrapper>
        <ShareStyled.NetworkWrapper>
          <ShareStyled.EmailShareButton
            url={shareUrl}
            body={shareUrl}
            className="Demo__some-network__share-button"
          >
            <EmailIcon
              size={32}
              round
            />
          </ShareStyled.EmailShareButton>
          <ShareStyled.NetworkName>Email</ShareStyled.NetworkName>
        </ShareStyled.NetworkWrapper>
      </div>
    )
  }

  renderContent = (props) => {
    return (
      <React.Fragment>
        {
          this.state.snackBarText !== '' &&
            <SnackBar text={this.state.snackBarText} closeSnackBar={this.closeSnackBar} />
        }
        {
          props.type === 'group' && this.renderInviteView(props.referralCode)
        }
        {
          this.renderShareView(props.shareUrl)
        }
      </React.Fragment>
    );
  }

  render() {
    return (
      <ShareStyled>
        {
          this.renderContent(this.props)
        }
      </ShareStyled>
    )
  }
}
