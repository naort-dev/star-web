import styled from 'styled-components';
import {
  FacebookShareButton,
  GooglePlusShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  EmailShareButton,
} from 'react-share';

const ShareStyled = styled.div`

`;

ShareStyled.HeadingWrapper = styled.div`
  margin: 10px 0;
  margin-bottom: 0;
  @media(min-width: 768px) {
    margin-bottom: 20px;
    margin-top: 0;
  }
`;

ShareStyled.SubHeading = styled.span`
  display: block;
  font-size: 18px;
  color: #FF6C58;
  font-family: 'Avenir-Bold';
`;

ShareStyled.SubHeadingDescription = styled.span`
  display: block;
  font-size: 14px;
  margin-top: 5px;
  font-family: 'Avenir-Light';
`;

ShareStyled.NetworkWrapper = styled.div`
  vertical-align: top;
  display: inline-block;
  margin-right: 30px;
  text-align: center;
  cursor: pointer;
`;

ShareStyled.CopyButton = styled.span`
  font-size: 14px;
  color: #FF6C58;
  cursor: pointer;
`;

ShareStyled.FacebookShareButton = styled(FacebookShareButton)`
  div {
    margin: 0 auto;
  }
`;
ShareStyled.GooglePlusShareButton = styled(GooglePlusShareButton)`
  div {
    margin: 0 auto;
  }
`;
ShareStyled.TwitterShareButton = styled(TwitterShareButton)`
  div {
    margin: 0 auto;
  }
`;
ShareStyled.WhatsappShareButton = styled(WhatsappShareButton)`
  div {
    margin: 0 auto;
  }
`;
ShareStyled.EmailShareButton = styled(EmailShareButton)`
  div {
    margin: 0 auto;
  }
`;

ShareStyled.NetworkName = styled.span`
  display: block;
  font-size: 12px;
  font-family: 'Avenir-Regular';
  margin-top: 7px;
  color: #000;
`;

ShareStyled.MinorDescription = styled.span`
  font-size: 12px;
  margin-top:4px;
  font-family: 'Avenir-light';
  text-align:left;
  color: grey;
`;

export default ShareStyled;
