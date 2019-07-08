import styled from 'styled-components';
import { media } from '../../../../../../styles/mediaQueries';

export const Layout = styled.section`
  height: 100%;
  max-width: 318px;
  padding-top: 49px;
  ${media.webView} {
    max-width: 570px;
  }
  margin: 0 auto;
  @media (max-width: 831px) {
    padding-top: 0;
  }
  .no-device-support {
    ${media.webView} {
      width: 224px;
    }
    ${media.mobileScreen} {
      height: 192px;
    }
  }
  .uploadBtn {
    display: block;
    margin-top: 10px;
    margin-bottom: 80px;
    height: 60px;
    text-align: center;
    padding: 0;
    width: 194.2px;
    height: 40px;
    border-radius: 28px;
    background-color: #ededed;
    color: #2f839d;
    font-size: 14px;
    cursor: pointer;
    outline: none;
    border: none;
    min-height: 40px;
    min-width: inherit;
    line-height: 0;
    font-family: Gilroy-SemiBold;
    cursor: pointer;
    ${media.mobileScreen} {
      height: 56.9px;
      font-family: Gilroy-Light;
      font-size: 20px;
      background-color: rgba(0, 0, 0, 0);
      font-size: 20px;
      margin-bottom: 0px;
      border-radius: 0px;
      border-top: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      width: 100%;
      color: #2f839d;
      padding: 0px;
      
    }
    input {
      width: 100%;
    } 
    :hover,
    :focus {
      box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.15);
    }
    &:active {
      color: #fff;
      background-color: ${props => props.theme.greyishBrown};
      border-color: ${props => props.theme.greyishBrown};
    }
  }
  .mobileBtn {
    display: block;
    ${media.webView} {
      display: none;
    }
    ${media.mobileScreen} {
      order: 3;
    }
    .button {
      padding: 10px 0;
    }
  }
  .player-container {
    border-radius: 0;
    padding: 0;
    box-shadow: none;
    .player-icon-wrap {
      top: 50%;
      transform: translateY(-50%);
      bottom: unset;
    }
    .play-button {
      width: 108px;
      height: 108px;
      svg {
        font-size: 44px;
      }
    }
  }
  .note {
    font-family: Gilroy-Light;
    color: #fff;
    font-size: 14px;
    padding-top: 20px;
    ${media.webView} {
      color: #999;
      font-size: 16px;
    }
  }
  .skip {
    display: none;
    width: 100%;
    text-align: center;
    padding-top: 5px;
    color: #615195;
    font-size: 14px;
    cursor: pointer;
    font-family: Gilroy;
    ${media.webView} {
      display: inline-block;
      padding-top: 15px;
    }
  }
  .skipMob {
    display: block;
    position: absolute;
    top: ${props => (props.error ? '532px' : '620px')};
    left: 0;
    padding-top: 5px;
    ${media.webView} {
      display: none;
    }
  }
  .videoInputCapture {
    display: none;
  }
  .video-wrapper {
    ${media.mobileScreen} {
      flex-direction: column;
      height: 100%;
      justify-content: flex-start;
      align-items: center;
    }
  }
  .video-react-video {
    @media(max-width: 831px) {
      position: realtive;
    }
  }
`;

export const VideoContainer = styled.section`
  width: 288px;
  height: 454px;
  border-radius: 23px;
  background-color: #555555;
  position: relative;
  @media (max-width: 831px) {
    width: 317px;
    height: calc(100% - 80px);
    margin: 0 auto 15px;
  }
  .playButton {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .retry {
    background: #fff;
    width: 224px !important;
    color: #2f839d;
    position: absolute;
    left: 50%;
    bottom: 20px;
    transform: translateX(-50%);
    height: 60px;
    font-size: 18px;
    line-height: 60px;
    padding: 0;
    @media(max-width: 831px) {
      bottom: 25px;
    }
  }
  .videoElm {
    width: 100%;
    border-radius: 23px;
    height: 100%;
    object-fit: cover;
  }
`;

export const QuestionContainer = styled.section`
  padding-left: ${props => (props.error ? '20px' : '33px')};
  ${media.mobileScreen} {
    padding-left: ${props => (props.error ? '20px' : '26px')};
    position: absolute;
    display: ${props => (props.isShow ? 'block' : 'none')};
    bottom: 0;
    border-radius: 20px;
    background: rgba(0, 0, 0, 0.47);
    width: 100%;
    height: 289px;
    padding-top: 27px;
    margin-left: 0;
    padding-right: ${props => (props.error ? '20px' : '0')};
  }
  h1 {
    font-family: Gilroy;
    font-size: 18px;
    color: #46829a;
    display: none;
    ${media.webView} {
      display: block;
    }
  }
  .button {
    display: none;
    width: auto;
    ${media.webView} {
      display: block;
      margin-top: 34px;
      height: 60px;
      padding: 0;
      width: 194.2px;
      height: 40px;
      border-radius: 28px;
      background-color: #ededed;
      color: #2f839d;
      font-size: 14px;
      cursor: pointer;
      outline: none;
      border: none;
      min-height: 40px;
      min-width: inherit;
    }
  }
  .heading {
    font-family: Gilroy-Medium;
    margin-bottom: 23px;
  }
  .tick {
    font-size: 19px;
  }
`;
QuestionContainer.ButtonHeading = styled.div`
  width: 246px;
  height: 18px;
  color: #8f8f8f;
  font-family: Gilroy;
  font-size: 13px;
  margin-bottom: 6px;
  display: flex;
  padding-top: 5px;
  justify-content: center;

`;
QuestionContainer.ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;  
  flex-direction: column;
  // padding-left: 20px;
  // padding-right: 20px;
  .button{
    ${media.mobileScreen} {
      height: 43.9px;
     
      font-family: Gilroy-Light;
      font-size: 20px;
      background-color: rgba(0, 0, 0, 0);
      font-size: 20px;
      border-top: 1px solid #ccc;
      border: none;
      border-radius: 0px;
      width: 100%;
      color: #2f839d;
      padding: 0px;
    }
  }
`;
export const ShowHide = styled.span`
  display: none;
  position: absolute;
  top: 467px;
  width: 224px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  border-radius: 20px;
  background: #fff;
  color: #2f839d;
  font-family: Gilroy-Bold;
  font-size: 14px;
  cursor: pointer;
  display: block;
  ${media.webView} {
    display: none;
  }
  :after,
  :before {
    position: relative;
    top: ${props => (props.isShow ? '-3px' : '5px')};
    content: '';
    display: inline-block;
    width: 9px;
    height: 9px;
    border-right: 1px solid #2f839d;
    border-top: 1px solid #2f839d;
    transform: ${props => (props.isShow ? 'rotate(135deg)' : 'rotate(315deg)')};
    margin-right: 28px;
    margin-left: 28px;
  }
`;

export const ShowButtons = styled.span`
display: none;
position: relative;
margin-top: -166px;
margin-bottom: 15px;
width: 322px;
background-color: #ffffff;
text-align: center;
line-height: 30px;
border-radius: 20px;
color: #2f839d;
font-family: Gilroy-Bold;
font-size: 14px;
cursor: pointer;
display: block;
border-radius: 20px;
order: 2;
${media.webView} {
  display: none;
}
// :after,
// :before {
//   position: relative;
//   top: ${props => (props.isShow ? '-3px' : '5px')};
//   content: '';
//   display: inline-block;
//   width: 9px;
//   height: 9px;
//   border-right: 1px solid #2f839d;
//   border-top: 1px solid #2f839d;
//   transform: ${props => (props.isShow ? 'rotate(135deg)' : 'rotate(315deg)')};
//   margin-right: 28px;
//   margin-left: 28px;
// }
`;
export const PlayButton = styled.section`
  display: flex;
  justify-content: center;
  width: 108px;
  height: 108px;
  border-radius: 50%;
  background: #fff;
  align-items: center;
  svg {
    font-size: 44px;
    color: #ff6c58;
    width: 49.9px;
    height: 49.9px;
  }
`;

export const TimeSpan = styled.span`
  align-items: center;
  flex-direction: column;
  font-family: Gilroy;
  color: #555555;
  padding-bottom: 20px;
  display: none;
  ${media.webView} {
    display: flex;
  }
  .text {
    font-size: 16px;
    line-height: .9;
    margin-bottom: 4px;
  }
  .time {
    font-size: 21px;
  }
`;

export const FlexBox = styled.section`
  display: flex;
  justify-content: center;
  position: relative;
  ${media.webView} {
    justify-content: space-between;
  }
`;
