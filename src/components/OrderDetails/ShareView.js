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
import OrderStyled from './styled';

const ShareView = ({ title, shareUrl }) => (
  <OrderStyled.SocialMediaWrapper>
    <OrderStyled.Somenetwork>
      <FacebookShareButton
        url={shareUrl}
        quote={title}
        className="Demo__some-network__share-button"
      >
        <FacebookIcon
          size={32}
          round
        />
      </FacebookShareButton>
    </OrderStyled.Somenetwork>
    <OrderStyled.Somenetwork>
      <GooglePlusShareButton
        url={shareUrl}
        className="Demo__some-network__share-button"
      >
        <GooglePlusIcon
          size={32}
          round />
      </GooglePlusShareButton>
    </OrderStyled.Somenetwork>
    <OrderStyled.Somenetwork>
      <TwitterShareButton
        url={shareUrl}
        title={title}
        className="Demo__some-network__share-button"
      >
        <TwitterIcon
          size={32}
          round
        />
      </TwitterShareButton>
    </OrderStyled.Somenetwork>
    <OrderStyled.Somenetwork>
      <WhatsappShareButton
        url={shareUrl}
        title={title}
        separator=":: "
        className="Demo__some-network__share-button"
      >
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>
    </OrderStyled.Somenetwork>
    <OrderStyled.Somenetwork>
      <EmailShareButton
        url={shareUrl}
        subject={title}
        body={shareUrl}
        className="Demo__some-network__share-button"
      >
        <EmailIcon
          size={32}
          round
        />
      </EmailShareButton>
    </OrderStyled.Somenetwork>
    <OrderStyled.Somenetwork>
      <OrderStyled.Copy title="Copy to Clipboard" onClick={() => copy(shareUrl)} /> 
    </OrderStyled.Somenetwork>
  </OrderStyled.SocialMediaWrapper>
);

export default ShareView;
