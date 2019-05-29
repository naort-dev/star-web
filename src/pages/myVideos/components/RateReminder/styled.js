import styled from 'styled-components';
import {
  FacebookShareButton,
  GooglePlusShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from 'react-share';

const ReminderStyled = styled.div`
  text-align: center;
  min-height: 500px;
`;

ReminderStyled.Overlay = styled.span`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1;
  background-color: rgba(0,0,0,.6);
  @media(min-width: 1025px) {
    display: none;
  }
`;

ReminderStyled.MobilePopup = ReminderStyled.extend`
  position: fixed;
  transition: 1s opacity ease-out;
  background: rgb(248, 248, 248);
  z-index: 1;
  left: 0;
  right: 0;
  bottom: 0;
  min-height: auto;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  opacity: 1;
  display: block;
  padding-top: 20px;
  @media(min-width: 1025px) {
    display: none;
  }
`;

ReminderStyled.MobileCancel = styled.span`
  display: block;
  padding: 10px;
  background: #fff;
  font-family: 'Avenir-Medium';
  cursor: pointer;
`;

ReminderStyled.Header = styled.span`
  display: block;
  font-size: 15px;
  font-family: 'Avenir-Bold';
  @media(min-width: 1025px) {
    font-size: 18px;
  }
`;

ReminderStyled.Description = ReminderStyled.Header.extend`
  font-family: 'Avenir-Light';
  font-size: 14px;
  padding-top: 17px;
  @media(min-width: 1025px) {
    font-size: 16px;
  }
`;

ReminderStyled.ActionButton = styled.button`
  background-color: #FF6C58;
  color: rgb(255,255,255);
  text-align: center;
  margin: 17px 0;
  display: inline-block;
  font-size: 14px;
  font-family: Avenir-Bold;
  cursor: pointer;
  padding: 10px 30px;
  text-decoration: none;
  outline: none;
  border-radius: 5px;
  border: 2px solid #FF6C58;
  border-image: initial;
  &:hover {
    background-color: #FF3B21;
  }
  &:disabled {
    background-color: #b6b6b6;
    color: #676767;
    border-color: #b6b6b6;
  }
`;

ReminderStyled.ShareWrapper = styled.div`
  border-top: 1px solid #D8D8D8;
  padding: 17px 0;
`;

ReminderStyled.ShareHeader = ReminderStyled.Header.extend`
  font-family: 'Avenir-Medium';
  font-size: 15px;
`;

ReminderStyled.ShareContent = styled.div`

`;

ReminderStyled.NetworkWrapper = styled.div`
  vertical-align: top;
  display: inline-block;
  margin-right: 20px;
  text-align: center;
  cursor: pointer;
  padding-top: 17px;
`;

ReminderStyled.CopyButton = styled.span`
  width: 32px;
  height: 32px;
  display: block;
  background-image: url('../../assets/images/content_copy_48px.svg');
  background-repeat: no-repeat;
  background-color: #4a000d;
  background-position: center;
  border-radius: 32px;
`;

ReminderStyled.FacebookShareButton = styled(FacebookShareButton)`
  div {
    margin: 0 auto;
  }
`;
ReminderStyled.GooglePlusShareButton = styled(GooglePlusShareButton)`
  div {
    margin: 0 auto;
  }
`;
ReminderStyled.TwitterShareButton = styled(TwitterShareButton)`
  div {
    margin: 0 auto;
  }
`;
ReminderStyled.WhatsappShareButton = styled(WhatsappShareButton)`
  div {
    margin: 0 auto;
  }
`;
ReminderStyled.EmailShareButton = styled(EmailShareButton)`
  div {
    margin: 0 auto;
  }
`;

ReminderStyled.NetworkName = styled.span`
  display: block;
  font-size: 12px;
  font-family: 'Avenir-Regular';
  margin-top: 7px;
  color: #000;
  @media(min-width: 1025px) {
    font-size: 14px;
  }
`;

export default ReminderStyled;
