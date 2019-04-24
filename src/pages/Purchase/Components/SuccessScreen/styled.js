import styled from 'styled-components';
import { media } from '../../../../styles/mediaQueries';
import { FlexCenter } from '../../../../styles/CommonStyled';

export const Layout = styled.section`
  height: 100%;
  width: 100%;
  position: relative;
  .closeBtn {
    position: absolute;
    right: 40px;
    top: 40px;
    font-size: 50px;
  }
  .successImg {
    background: url(assets/images/art_highfive.svg) no-repeat;
    display: inline-block;
    background-size: contain;
    width: 196px;
    height: 202px;
    margin-top: 92px;
    ${media.webView} {
      width: 260px;
      height: 267px;
      margin-top: 39px;
    }
  }
  .successScroll {
    height: calc(100% - 291px) !important;
  }
`;
export const Content = styled.section`
  max-width: 319px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  font-family: Gilroy;
  padding-bottom: 40px;
  ${media.webView} {
    max-width: 400px;
  }
  .highFive {
    color: #ff6c58;
    padding-bottom: 8px;
    padding-top: 15px;
    ${media.webView} {
      padding-top: 33px;
    }
  }
  .orderSuccess {
    color: #ff6c58;
    font-size: 40px;
    line-height: 39px;
    width: 220px;
    margin: 0 auto;
    padding-bottom: 29px;
    ${media.webView} {
      width: 100%;
      font-size: 34px;
    }
  }
  .note {
    color: #4b4b4b;
    font-size: 16px;
    line-height: 24px;
    padding-bottom: 24px;
  }
  .browseBtn {
    width: 300px;
    height: 60px;
  }
`;
