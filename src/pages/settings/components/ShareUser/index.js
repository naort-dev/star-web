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
import ShareStyled from './styled';

export default class ShareUser extends React.Component {

  renderShareView = (shareUrl) => {
    return (
      <React.Fragment>
        <SettingsStyled.InputWrapper>
          <SettingsStyled.Label>Profile link</SettingsStyled.Label>
          <SettingsStyled.WrapsInput>
            <SettingsStyled.CustomInput>
              <SettingsStyled.ReadOnlySection>
                <span>{shareUrl}</span>
                <ShareStyled.CopyButton onClick={() => copy(shareUrl)}>Copy</ShareStyled.CopyButton>
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
        <ShareStyled.HeadingWrapper>
          <ShareStyled.SubHeading>
            {props.heading}
          </ShareStyled.SubHeading>
          <ShareStyled.SubHeadingDescription>
            {props.description}
          </ShareStyled.SubHeadingDescription>
        </ShareStyled.HeadingWrapper>
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
