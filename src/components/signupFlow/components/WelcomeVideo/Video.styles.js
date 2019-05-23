import styled from 'styled-components';
import { media } from '../../../../styles/mediaQueries';

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
  .mobileBtn {
    position: absolute;
    top: 547px;
    padding-bottom: 60px;
    display: block;
    ${media.webView} {
      display: none;
    }
    .button {
      padding: 20px 0;
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
`;

export const VideoContainer = styled.section`
  width: 288px;
  height: 454px;
  border-radius: 23px;
  background-color: #555555;
  position: relative;
  @media (max-width: 831px) {
    width: 317px;
    height: 514px;
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
  padding-bottom: 38px;
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
