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
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 319px;
    margin: 0 auto;
    flex: 1 1 auto;
    display: flex;
    height: 100%;
    max-height: 350px;
    min-height: 400px;
  }
  .video-wrapper {
    height: 100%;
    display: flex;
    flex-direction: column;
    ${media.mobileScreen} {
      order: 1;
      .player-container {
        max-height: inherit;
      }
    }
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
    ${props => props.isQA && `padding-top: 32px;`}
    ${media.mobileScreen} {
      color: #fff;
      font-size: 14px;
      padding-top: 20px;
    }
  }
  .quesHead {
    padding-bottom: 20px;
    font-family: Gilroy-Medium;
    font-size: 14px;
    color: #7c7c7c;
    text-transform: capitalize;
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
    display: inline-block;
    text-align: center;
    color: #2f839d;
    border-radius: 30px;
    margin-bottom: 10px;
    margin-top: 25px;
    font-family: Gilroy-Medium;
    font-size: 14px;
    cursor: pointer;
  }

  .safari-upload {
    margin-top: 40px;
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

      &.ques-item {
        font-family: Gilroy-Medium;
      }
    }
    li + li:before {
      content: '|';
      padding-left: 15px;
      padding-right: 15px;
      color: #2f2f2f;
    }
  }
  .questionWrapper {
    padding-bottom: 20px;
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
    font-family: Gilroy-Semibold;
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
    ${media.mobileScreen} {
     top: inherit;
     margin-top: 40px;
     margin-bottom: 20px;
     left: 0;
     right: 0;
    }
  }
  .error-msg {
    max-width: 225px;
    ${media.mobileScreen} {
      max-width: inherit;
    }
  }
`;

export const VideoContainer = styled.section`
  width: 319px;
  flex: 1;
  border-radius: 23px;
  background-color: #e3e3e3;
  margin-bottom: 0;
  position: relative;
  ${media.mobileScreen} {
    margin-bottom: 0;
    /* height: ${props => (props.isQA ? 'calc(100% - 30px)' : '100%')}; */
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
    padding: 10px 0;
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
    padding-left: 15px;
    padding-top: 15px;
    /* padding-bottom: ${props => (props.isQA ? '60px' : '25px')}; */
    padding-bottom: 25px;
    bottom: 0;
    /* bottom: ${props => (props.isQA ? '148px' : '123px')}; */
    border-radius: 23px;
    background: rgba(0, 0, 0, 0.47);
    left: 50%;
    width: 319px;
    transform: translateX(-50%);
    order: 2;
    &:empty {
      display: none;
    }
  }
  .question-wrapper {
    position: relative;
    width: 100%;
    flex: 1 1 auto;
    ${media.mobileScreen} {
      position: initial;
      max-height: 280px;
      min-height: 150px;
    }
    .more-action-root {
      position: absolute;
      top: -10px;
      right: -11px;
      ${media.mobileScreen} {
        top: inherit;
        /* bottom: ${props => (props.isQA ? '-41px' : '-33px')}; */
        bottom: 18px;
        right: 10px;
        z-index: 999;
        .more-action-icon {
          background: #fff;
        }
      }
      .more-action-icon {
        width: 30px;
        height: 30px;
      }
    }
    .qa-scroll {
      .scroll-render {
        position: relative !important;
        padding-bottom: 53px;
        overflow: auto !important;
      }
    }
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
    font-family: Gilroy-Medium;
    font-size: 16px;
    color: #fff;
    ${media.webView} {
      color: #2f2f2f;
    }
  }
  .question {
    font-size: 16px;
    line-height: 22px;
    color: #555;
    ${media.mobileScreen} {
      padding-left: 5px;
      font-size: 14px;
      line-height: 20px;
      color: #fff;
    }
    p {
      font-family: Gilroy;
      color: #555;
      ${media.mobileScreen} {
        color: #fff;
      }
    }
    .boldTxt,
    &.bold-text {
      font-family: Gilroy-Bold;
      color: #555;
      ${media.mobileScreen} {
        padding-left: 5px;
        font-size: 14px;
        line-height: 20px;
        color: #fff;
      }
    }
  }
  .agreement-note {
    font-family: Gilroy-Light;
    font-size: 12px;
    color: #fff;
    max-width: 215px;
    padding-left: 20px;
    ${media.webView} {
      color: #3b3b3b;
      padding-left: 29px;
    }
  }
`;

export const ShowHide = styled.span`
  display: block;
  /* position: absolute;
  bottom: ${props => (props.isQA ? '0' : '20px')}; */
  order: 2;
  /* margin: ${props =>
    props.scriptVisible ? '-47px auto 15px 10px' : '-47px auto 15px'} */
  margin: -47px auto 15px; 
  position: relative;
  width: 224px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  border-radius: 20px;
  background: #fff;
  /* background: ${props => (props.scriptVisible ? 'red' : '#fff')} */
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
  :after {
    position: relative;
    top: ${props => (props.isShow ? '-3px' : '3px')};
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    border-right: 1px solid #2f839d;
    border-top: 1px solid #2f839d;
    transform: ${props => (props.isShow ? 'rotate(135deg)' : 'rotate(315deg)')};
    margin-left: 28px;
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
  ${media.mobileScreen} {
    padding-top: 0;
  }
  display: none;
  ${media.webView} {
    display: block;
  }
`;
export const MobButtons = styled.section`
  position: absolute;
  //bottom: ${props => (props.isQA ? ' -220px' : '-180px')};
  bottom: -145px;
  order: 3;
  display: flex;
  flex-direction: column;
  padding-bottom: 15px;
  padding-top: 15px;
  ${media.webView} {
    display: none;
  }
`;
export const Header = styled.h4`
  font-family: Gilroy-Regular;
  color: ${props => props.theme.orangePink};
  font-size: 24px;
  margin: 0 auto;
  text-align: center;
  margin-bottom: 44.7px;
  ${media.mobileScreen} {
    margin-bottom: 15px;
    padding: 0 55px 0 41px;
  }
  .bold-head-name {
    font-family: Gilroy-SemiBold;
  }
`;
export const Speaker = styled(FontAwesomeIcon)`
  font-size: 18px;
  color: #2f839d;
  margin-left: 9px;
  margin-right: 9px;
  ${props => props.recording && `pointer-events:none; color: #c0bfbf;`}
`;
