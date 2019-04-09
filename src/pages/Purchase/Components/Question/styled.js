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
    button {
      width: 242px;
    }
    ${media.mobileScreen} {
      display: block;
    }
  }
`;

export const VideoContainer = styled.section`
  width: 269px;
  height: 415px;
  border-radius: 23px;
  background-color: #e3e3e3;
  margin-bottom: 60px;
`;

export const QuestionContainer = styled.section`
  padding-left: 40px;
  padding-top: 10px;
  display: block;
  ${media.mobileScreen} {
    position: absolute;
    display: ${props => (props.isShow ? 'block' : 'none')};
    padding-left: 24px;
    top: 170px;
    background: transparent;
    left: 50%;
    width: 269px;
    transform: translateX(-50%);
  }
  h1 {
    font-family: Gilroy-Bold;
    font-size: 18px;
    color: #46829a;
    ${media.mobileScreen} {
      display: none;
    }
  }
  button {
    margin-top: 40px;
    width: 224px;
    height: 60px;
    ${media.mobileScreen} {
      display: none;
    }
  }
`;

export const QuestionWrapper = styled.section`
  display: flex;
  max-width: 220px;
  padding-top: 20px;
  svg {
    margin-top: 2px;
    color: #ff6c58;
  }
`;

export const QuestionTag = styled.span`
  font-family: Gilroy-Bold;
  font-size: 14px;
  line-height: 1.57;
  color: #7c7c7c;
  padding-left: 15px;
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
  font-family: Gilroy-Extrabold;
  ${media.mobileScreen} {
    display: block;
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
