import styled from 'styled-components';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  height: 415px;
  padding: 0 80px;
  display: flex;
  align-items: center;
  ${media.mobileScreen} {
    justify-content: center;
    padding: 0 20px;
  }
  .button {
    width: 242px;
  }
  .videoElm {
    width: 269px;
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
    padding-bottom: 27px;
  }
  .uploadLink {
    font-family: Gilroy;
    font-size: 14px;
    color: #2f829c;
    width: 100%;
    display: inline-block;
    text-align: center;
    padding-top: 20px;
    cursor: pointer;
  }
  .hidden {
    display: none;
  }
  .uploadBtn {
    width: 100%;
    display: inline-block;
    text-align: center;
    border: 1px solid #2f839d;
    color: #2f839d;
    height: 60px;
    line-height: 60px;
    border-radius: 30px;
    margin-bottom: 22px;
    font-family: Gilroy-SemiBold;
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
  .button-play {
    font-size: 44px;
    color: #ff6c58;
  }
  .disabled-btn {
    opacity: 0.3;
    pointer-events: none;
  }
`;

export const VideoContainer = styled.section`
  width: 269px;
  height: 415px;
  border-radius: 23px;
  background-color: #e3e3e3;
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
  padding-left: ${props => (props.error ? '20px' : '40px')};
  display: flex;
  align-items: center;
  flex-direction: ${props => (props.continueFlg ? 'inherit' : 'column')};
  ${media.mobileScreen} {
    position: absolute;
    display: ${props => (props.isShow ? 'block' : 'none')};
    padding-left: 24px;
    height: 250px;
    top: 235px;
    border-radius: 23px;
    background: rgba(0, 0, 0, 0.47);
    left: 50%;
    width: 269px;
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
    height: 60px;
    padding: 0;
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

export const ShowHide = styled.span`
  display: block;
  position: absolute;
  top: 425px;
  width: 224px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  border-radius: 20px;
  background: #fff;
  color: #2f839d;
  font-family: Gilroy-Bold;
  cursor: pointer;
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
`;
export const WebButtons = styled.section`
  padding-top: 37px;
`;
export const MobButtons = styled.section`
  position: absolute;
  top: 485px;
  display: flex;
  flex-direction: column;
  padding-bottom: 40px;
  padding-top: 37px;
  ${media.webView} {
    display: none;
  }
`;
