import styled from 'styled-components';
import { media } from 'styles/mediaQueries';

export const Layout = styled.section`
  height: 100%;
  width: 100%;
  position: relative;
  .closeBtn {
    position: absolute;
    right: 40px;
    top: 34px;
    font-size: 50px;
    z-index: 1;
    ${media.webView} {
      top: 49px;
    }
  }
  .successImg {
    background: url(assets/images/art_highfive.svg) no-repeat;
    background-position: center;
    display: inline-block;
    background-size: contain;
    width: 196px;
    height: 138px;
    ${media.webView} {
      width: 260px;
      height: 225px;
    }
  }
  .successScroll {
    margin-top: 44px;
    height: calc(100% - 44px) !important;
    display: inline-block;
    ${media.webView} {
      margin-top: 39px;
      height: calc(100% - 39px) !important;
    }
  }
  &.content-wrapper {
    display: flex;
    flex-direction: column;
  }

`;
export const Content = styled.section`
  max-width: 319px;
  width: 100%;
  margin: 0 auto;
  text-align: center;
  font-family: Gilroy;
  padding-bottom: 15px;
  ${media.webView} {
    max-width: 100%;
    padding: 0 75px;
  }
  ${media.mobileScreen} {
    padding-right: 15px;
    padding-left: 15px;
    max-width: 340px;
  }
  .highFive {
    color: #ff6c58;
    padding-bottom: 8px;
    padding-top: 15px;
    ${media.webView} {
      padding-top: 24px;
    }
  }
  .orderSuccess {
    color: #ff6c58;
    font-size: 40px;
    line-height: 39px;
    width: 100%;
    margin: 0 auto;
    padding-bottom: 10px;
    ${media.webView} {
      font-size: 34px;
      padding-bottom: 24px;
    }
  }
  .note {
    color: #4b4b4b;
    font-size: 16px;
    line-height: 24px;
    padding-bottom: 28px;
    ${media.mobileScreen} {
      padding-bottom: 10px;
    }
  }
  .browseBtn {
    width: 300px;
    height: 60px;
    margin: 0 auto 25px !important;
    ${media.mobileScreen} {
      margin: 0 auto !important;
    }
  }
`;
