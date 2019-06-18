import styled from 'styled-components';
import { media } from 'styles/mediaQueries';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Layout = styled.section`
  height: 100%;
  display: flex;
  justify-content: center;
  position: relative;
  height: 493px;
  ${media.mobileScreen} {
    justify-content: center;
    padding: 0 20px;
  }
  .button {
    height: 40px;
  }
  .videoElm {
    width: 319px;
    border-radius: 23px;
    height: 100%;
    object-fit: cover;
  }
  .note {
    color: #999;
    font-family: Gilroy-Light;
    font-size: 16px;
    ${media.mobileScreen} {
      color: #fff;
      font-size: 14px;
      padding-top: 20px;
    }
  }
  .quesHead {
    padding-bottom: 20px;
    font-family: Gilroy-Semibold;
    font-size: 14px;
    color: #7c7c7c;
  }
  .uploadLink {
    font-family: Gilroy;
    font-size: 14px;
    color: #2f829c;
    width: 100%;
    display: inline-block;
    text-align: center;
    padding-top: 20px;
    display: block;
    ${media.webView} {
      display: none;
    }
  }
  .web-link {
    display: none;
    padding-top: 0;
    ${media.webView} {
      display: block;
    }
  }
  .hidden {
    display: none;
  }
  .uploadBtn {
    width: 100%;
    display: inline-block;
    text-align: center;
    ${media.webView} {
      border: 1px solid #2f839d;
    }
    color: #2f839d;
    height: 40px;
    line-height: 40px;
    border-radius: 30px;
    margin-bottom: 10px;
    font-family: Gilroy-SemiBold;
    font-size: 14px;
    cursor: pointer;
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
  .videoInputCapture {
    display: none;
  }
  .video-option {
    justify-content: center;
    display: flex;
    padding-bottom: 11px;
    li {
      display: inline-block;
      font-family: Gilroy-Light;
      font-size: 16px;
      color: #cccccc;
      cursor: pointer;
    }
    li + li:before {
      content: '|';
      padding-left: 15px;
      padding-right: 15px;
      color: #2f2f2f;
    }
  }
  .questionWrapper {
    padding-bottom: 30px;
    :last-of-type {
      padding-bottom: 9px;
    }
  }
  .next-btn {
    display: none;
    ${media.largeScreen} {
      display: block;
    }
  }
  .ques-item {
    color: #2f2f2f !important;
    font-family: Gilroy-Semibold !important;
  }
  .ans-item {
    color: #2f2f2f !important;
    font-family: Gilroy-Semibold !important;
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
  .disabled-btn {
    opacity: 0.3;
    pointer-events: none;
  }
  .noSupportBtn {
    position: absolute;
    left: 0;
    top: 285px;
    ${media.webView} {
      position: static;
      margin-top: 40px;
    }
  }
`;

export const VideoContainer = styled.section`
  width: 319px;
  height: 493px;
  border-radius: 23px;
  background-color: #e3e3e3;
  margin-bottom: 60px;
  position: relative;
  .playButton {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  .retry {
    background: #fff;
    width: 224px;
    color: #2f839d;
    position: absolute;
    transform: translateX(-50%);
    bottom: 20px;
    left: 50%;
  }
  .uploadCustom {
    bottom: 0;
  }
`;

export const QuestionContainer = styled.section`
  padding-left: ${props => (props.error ? '20px' : '34px')};
  ${props => props.isQA && `padding-top: 28px;`}
  display: flex;
  align-items: center;
  flex-direction: column;
  ${media.mobileScreen} {
    position: absolute;
    display: ${props => (props.isShow ? 'block' : 'none')};
    padding-left: 24px;
    padding-top: 30px;
    padding-bottom: 25px;
    bottom: ${props => (props.isQA ? '-33px' : '0')};
    border-radius: 23px;
    background: rgba(0, 0, 0, 0.47);
    left: 50%;
    width: 319px;
    transform: translateX(-50%);
  }
  h1 {
    font-family: Gilroy;
    font-size: 18px;
    color: #46829a;
    ${media.mobileScreen} {
      display: none;
    }
  }
  .button {
    height: 40px;
    padding: 0;
    min-height: auto;
    width: 200px;
    min-width: auto;
    margin-bottom: 10px;
    font-size: 14px;
    ${media.mobileScreen} {
      display: none;
    }
  }
  .mobDisplay {
    display: none;
    ${media.webView} {
      display: block;
    }
  }
  .bold-text,
  .boldTxt {
    font-family: Gilroy-Semibold;
    font-size: 16px;
    color: #fff;
    ${media.webView} {
      color: #2f2f2f;
    }
  }
  .question {
    font-size: 16px;
  }
  .agreement-note {
    font-family: Gilroy-Light;
    font-size: 12px;
    color: #fff;
    max-width: 215px;
    padding-left: 29px;
    ${media.webView} {
      color: #3b3b3b;
    }
  }
`;

export const ShowHide = styled.span`
  display: block;
  position: absolute;
  bottom: ${props => (props.isQA ? '0' : '20px')};
  width: 224px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  border-radius: 20px;
  background: #fff;
  color: #2f839d;
  font-family: Gilroy-Bold;
  cursor: pointer;
  z-index: 1001;
  ${media.webView} {
    display: none;
  }
  /* :after, */
  :before {
    position: relative;
    top: ${props => (props.isShow ? '-3px' : '3px')};
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    border-right: 1px solid #2f839d;
    border-top: 1px solid #2f839d;
    transform: ${props => (props.isShow ? 'rotate(135deg)' : 'rotate(315deg)')};
    margin-right: 28px;
    /* margin-left: 28px; */
  }
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
    color: red;
  }
`;
export const WebButtons = styled.section`
  padding-top: 50px;
`;
export const MobButtons = styled.section`
  position: absolute;
  bottom: ${props => (props.isQA ? ' -220px' : '-180px')};
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;
  padding-top: 37px;
  ${media.webView} {
    display: none;
  }
`;
export const Header = styled.h4`
  font-family: Gilroy-Regular;
  color: ${props => props.theme.orangePink};
  font-size: 24px;
  width: 232px;
  ${media.webView} {
    width: 310px;
  }
  margin: 0 auto;
  text-align: center;
  margin-bottom: 44.7px;
  .bold-head-name {
    font-family: Gilroy-Bold;
  }
`;
export const Speaker = styled(FontAwesomeIcon)`
  font-size: 18px;
  color: #2f839d;
  margin-left: 9px;
  margin-right: 9px;
  ${props => props.recording && `pointer-events:none; color: #c0bfbf;`}
`;
