import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import {
  FacebookShareButton,
  TwitterShareButton,
  EmailShareButton,
} from 'react-share';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faMobile } from '@fortawesome/pro-light-svg-icons';
import Popover from '@material-ui/core/Popover';
import PrimaryButton from '../PrimaryButton';
import ShareStyled from './styled';

const Share = (props) => {

  const shareAnchor = useRef(null);  
  const [showShare, toggleShare] = useState(false);

  const toggleList = state => () => {
    toggleShare(state);
  }

  const sendSms = (shareUrl) => () => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android/i.test(userAgent)) {
      window.open(`sms:1234?body=${shareUrl}`);
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      window.open(`sms:1234&body=${shareUrl}`);
    }
  }

  const shareUrl = `https://${props.shareUrl}`;

  return (
    <ShareStyled>
      <PrimaryButton
        secondary={props.secondary}
        ref={shareAnchor}
        className='action-btn'
        onClick={toggleList(true)}
      >
        Share This
      </PrimaryButton>
      <Popover
        id="share-popper"
        open={showShare}
        anchorEl={shareAnchor && shareAnchor.current}
        onClose={toggleList(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <ShareStyled.List>
          <li className='list-item'>
            <FacebookShareButton className='social-btn' quote='Show me the Google!' url={shareUrl}>
              <FontAwesomeIcon className='icon' icon={faFacebookF} />
              <span className='icon-text'>Facebook</span>
            </FacebookShareButton>
          </li>
          <li className='list-item'>
            <TwitterShareButton className='social-btn' url={shareUrl}>
              <FontAwesomeIcon className='icon' icon={faTwitter} />
              <span className='icon-text'>Twitter</span>
            </TwitterShareButton>
          </li>
          <li className='list-item'>
            <EmailShareButton className='social-btn' url={shareUrl}>
              <FontAwesomeIcon className='icon' icon={faEnvelope} />
              <span className='icon-text'>Email</span>
            </EmailShareButton>
          </li>
          <li className='list-item'>
            <div className='social-btn' onClick={sendSms(shareUrl)}>
              <FontAwesomeIcon className='icon' icon={faMobile} />
              <span className='icon-text'>SMS</span>
            </div>
          </li>
        </ShareStyled.List>
      </Popover>
    </ShareStyled>
  )
}

Share.defaultProps = {
  secondary: false,
};

Share.propTypes = {
  shareUrl: PropTypes.string.isRequired,
  secondary: PropTypes.bool,
}

export default Share;
