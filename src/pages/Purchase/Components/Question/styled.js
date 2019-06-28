import styled from 'styled-components';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  height: 426px;
  padding: 0 80px;
  display: flex;
  align-items: center;
  flex-direction: row;
  ${media.mobileScreen} {
    align-items: flex-start;
    justify-content: flex-start;
    padding: 0 20px;
    position: relative;
    max-width: 309px;
    margin: 0 auto;
    flex-direction: column;
  }
  .question {
    font-family: Gilroy-SemiBold;
    font-size: 14px;
    line-height: 22px;
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
    margin-bottom: 15px;
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
  .questionWrapper:last-child {
    padding-bottom: 35px;
  }
`;

export const VideoContainer = styled.section`
  width: 269px;
  height: 426px;
  border-radius: 23px;
  background-color: #e3e3e3;
  align-self: flex-start;
  position: relative;
  order: 1;
  ${media.mobileScreen} {
    max-height: 426px;
    height: calc(100% - 150px);
  }
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
  order: 2;
  ${media.mobileScreen} {
    display: ${props => (props.isShow ? 'block' : 'none')};
    padding-left: 15px;
    padding-right: 15px;
    padding-top: 20px;
    bottom: 0;
    border-radius: 23px;
    background: rgba(0, 0, 0, 0.47);
    width: 269px;
    order: 2;
    margin-top: -258px;
    z-index: 9;
  }
  &:empty {
    display: none;
  }
  .quesHead {
    font-family: Gilroy;
    font-size: 18px;
    color: #46829a;
    ${media.mobileScreen} {
      display: none;
    }
  }
  .instruction-head-mob {
    color: #fff;
    padding-bottom: 15px;
    font-family: Gilroy-SemiBold;
    font-size: 18px;
    line-height: 22px;
    ${media.webView} {
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
    top: 225px;
    ${media.webView} {
      position: static;
      margin-top: 40px;
    }
  }
`;

export const ShowHide = styled.span`
  display: block;
  position: relative;
  width: 224px;
  text-align: center;
  height: 30px;
  order: 2;
  line-height: 30px;
  border-radius: 20px;
  background: #fff;
  color: #2f839d;
  font-family: Gilroy-Bold;
  cursor: pointer;
  margin: -40px auto 10px;
  z-index: 9;
  ${media.webView} {
    display: none;
  }
  /* :after, */
  :before {
    position: absolute;
    top: ${props => (props.isShow ? '6px' : '12px')};
    left: 24px;
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
`;
export const WebButtons = styled.section`
  padding-top: 37px;
`;
export const MobButtons = styled.section`
  position: relative;
  // top: 415px;
  display: flex;
  flex-direction: column;
  padding-bottom: 15px;
  padding-top: 15px;
  order: 3;
  width: 269px;
  align-items: center;
  ${media.webView} {
    display: none;
  }
`;
