import React from 'react';
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
import copy from 'copy-to-clipboard';
import SnackBar from '../SnackBar';
import ShareStyled from './styled';

export default class ShareView extends React.Component {

  state = {
    snackBarText: '',
  }

  setSnackBarText = (text) => {
    this.setState({ snackBarText: text });
  }
  
  closeSnackBar = () => {
    this.setState({ snackBarText: '' });
  }

  copyUrl = () => {
    const { shareUrl } = this.props;
    copy(shareUrl);
    this.setSnackBarText('Link copied to clipboard');
  }

  render() {
    const { title, shareUrl, iconSize, body } = this.props;
    return (
      <ShareStyled>
        {
          this.state.snackBarText !== '' &&
            <SnackBar text={this.state.snackBarText} closeSnackBar={this.closeSnackBar} />
        }
        <ShareStyled.Title>Share</ShareStyled.Title>
        <ShareStyled.IconsWrapper>
          <ShareStyled.Row>
            <ShareStyled.Somenetwork>
              <ShareStyled.NetWorkButtonWrapper>
                <FacebookShareButton
                  url={shareUrl}
                  quote={title}
                  className="Demo__some-network__share-button"
                >
                  <FacebookIcon
                    size={iconSize}
                    round
                  />
                </FacebookShareButton>
              </ShareStyled.NetWorkButtonWrapper>
              <ShareStyled.NetworkName>Facebook</ShareStyled.NetworkName>
            </ShareStyled.Somenetwork>
            <ShareStyled.Somenetwork>
              <ShareStyled.NetWorkButtonWrapper>
                <GooglePlusShareButton
                  url={shareUrl}
                  className="Demo__some-network__share-button"
                >
                  <GooglePlusIcon
                    size={iconSize}
                    round />
                </GooglePlusShareButton>
              </ShareStyled.NetWorkButtonWrapper>
              <ShareStyled.NetworkName>Google Plus</ShareStyled.NetworkName>
            </ShareStyled.Somenetwork>
            <ShareStyled.Somenetwork>
              <ShareStyled.NetWorkButtonWrapper>
                <TwitterShareButton
                  url={shareUrl}
                  title={title}
                  className="Demo__some-network__share-button"
                >
                  <TwitterIcon
                    size={iconSize}
                    round
                  />
                </TwitterShareButton>
              </ShareStyled.NetWorkButtonWrapper>
              <ShareStyled.NetworkName>Twitter</ShareStyled.NetworkName>
            </ShareStyled.Somenetwork>
          </ShareStyled.Row>
          <ShareStyled.Row>
            <ShareStyled.Somenetwork>
              <ShareStyled.NetWorkButtonWrapper>
                <WhatsappShareButton
                  url={shareUrl}
                  title={title}
                  separator=":: "
                  className="Demo__some-network__share-button"
                >
                  <WhatsappIcon size={iconSize} round />
                </WhatsappShareButton>
              </ShareStyled.NetWorkButtonWrapper>
              <ShareStyled.NetworkName>Whatsapp</ShareStyled.NetworkName>
            </ShareStyled.Somenetwork>
            <ShareStyled.Somenetwork>
              <ShareStyled.NetWorkButtonWrapper>
                <EmailShareButton
                  url={shareUrl}
                  subject={title}
                  body={body ? `${body}\n\n${shareUrl}` : shareUrl}
                  className="Demo__some-network__share-button"
                >
                  <EmailIcon
                    size={iconSize}
                    round
                  />
                </EmailShareButton>
              </ShareStyled.NetWorkButtonWrapper>
              <ShareStyled.NetworkName>Email</ShareStyled.NetworkName>
            </ShareStyled.Somenetwork>
            <ShareStyled.Somenetwork>
              <ShareStyled.NetWorkButtonWrapper>
                <ShareStyled.Copy size={iconSize} title="Copy to Clipboard" onClick={this.copyUrl} />
              </ShareStyled.NetWorkButtonWrapper>
              <ShareStyled.NetworkName>Copy</ShareStyled.NetworkName>
            </ShareStyled.Somenetwork>        
          </ShareStyled.Row>
        </ShareStyled.IconsWrapper>
      </ShareStyled>
    )
  }
}
