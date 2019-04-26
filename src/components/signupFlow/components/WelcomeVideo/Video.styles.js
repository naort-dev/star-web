import styled from 'styled-components';
import { media } from '../../../../styles/mediaQueries';

export const Layout = styled.section`
  height: 100%;
  max-width: 318px;
  padding-top: 55px;
  ${media.webView} {
    max-width: 570px;
  }
  margin: 0 auto;
  .mobileBtn {
    position: absolute;
    top: 544px;
    padding-bottom: 60px;
    display: block;
    ${media.webView} {
      display: none;
    }
    .button {
      padding: 20px 0;
    }
  }
  .button {
    width: 242px;
    margin-left: 23px;
    ${media.webView} {
      margin-left: 0;
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
    padding-top: 12px;
    color: #2f839d;
    cursor: pointer;
    font-family: Gilroy;
    ${media.webView} {
      display: inline-block;
    }
  }
  .skipMob {
    display: block;
    position: absolute;
    top: 620px;
    left: 0;
    ${media.webView} {
      display: none;
    }
  }
`;

export const VideoContainer = styled.section`
  width: 288px;
  height: 454px;
  border-radius: 23px;
  background-color: #555555;
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
    left: 22px;
    bottom: 20px;
  }
  .videoElm {
    width: 288px;
    border-radius: 23px;
    height: 100%;
    object-fit: cover;
  }
`;

export const QuestionContainer = styled.section`
  padding-left: ${props => (props.error ? '20px' : '50px')};
  ${media.mobileScreen} {
    position: absolute;
    display: ${props => (props.isShow ? 'block' : 'none')};
    top: 210px;
    border-radius: 23px;
    background: rgba(0, 0, 0, 0.47);
    width: 288px;
    height: 300px;
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
    ${media.webView} {
      display: block;
      margin-top: 40px;
      height: 60px;
      padding: 0;
    }
  }
`;

export const ShowHide = styled.span`
  display: none;
  position: absolute;
  top: 460px;
  width: 224px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  border-radius: 20px;
  background: #fff;
  color: #2f839d;
  font-family: Gilroy-Bold;
  margin-left: 32px;
  cursor: pointer;
  display: block;
  ${media.webView} {
    display: none;
  }
  :after,
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
    margin-left: 28px;
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

export const TimeSpan = styled.span`
  align-items: center;
  flex-direction: column;
  font-family: Gilroy;
  color: #555555;
  padding-bottom: 37px;
  display: none;
  ${media.webView} {
    display: flex;
  }
  .text {
    font-size: 16px;
  }
  .time {
    font-size: 21px;
  }
`;
