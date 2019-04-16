import styled from 'styled-components';
import { media } from '../../../../styles/mediaQueries';

export const Layout = styled.section`
  height: 100%;
  padding: 20px 80px;
  display: flex;
  ${media.mobileScreen} {
    justify-content: center;
    padding: 0 20px;
  }
  .mobileBtn {
    display: none;
    position: absolute;
    top: 450px;
    padding-bottom: 60px;
    ${media.mobileScreen} {
      display: block;
    }
    .button {
      padding: 20px 0;
    }
  }
  .button {
    width: 242px;
  }
  video {
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
`;

export const VideoContainer = styled.section`
  width: 269px;
  height: 415px;
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
    left: 20px;
    bottom: 20px;
  }
`;

export const QuestionContainer = styled.section`
  padding-left: ${(props) => (props.error ? '20px' : '40px')};
  padding-top: 10px;
  display: block;
  ${media.mobileScreen} {
    position: absolute;
    display: ${(props) => (props.isShow ? 'block' : 'none')};
    padding-left: 24px;
    height: 250px;
    top: 165px;
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
    margin-top: 40px;
    height: 60px;
    padding: 0;
    ${media.mobileScreen} {
      display: none;
    }
  }
`;

export const ShowHide = styled.span`
  display: none;
  position: absolute;
  top: 365px;
  width: 224px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  border-radius: 20px;
  background: #fff;
  color: #2f839d;
  font-family: Gilroy-Bold;
  cursor: pointer;
  ${media.mobileScreen} {
    display: block;
  }
  :after,
  :before {
    position: relative;
    top: ${(props) => (props.isShow ? '-3px' : '3px')};
    content: '';
    display: inline-block;
    width: 10px;
    height: 10px;
    border-right: 1px solid #2f839d;
    border-top: 1px solid #2f839d;
    transform: ${(props) =>
      props.isShow ? 'rotate(135deg)' : 'rotate(315deg)'};
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
