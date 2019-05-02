import styled from 'styled-components';
import { media } from '../../../../styles/mediaQueries';

export const Layout = styled.section`
  width: 100%;
  max-width: 321px;
  margin: 0 auto;
  padding-bottom: 30px;
  ${media.webView} {
    max-width: 480px;
  }
  .head1 {
    font-family: Gilroy-Medium;
    font-size: 24px;
    text-align: center;
    color: #7c7c7c;
    padding-top: 23px;
  }
  .note {
    font-family: Gilroy;
    font-size: 14px;
    text-align: center;
    color: #7c7c7c;
    padding-top: 18px;
  }
  .questionWrapper {
    max-width: 239px;
    ${media.webView} {
      max-width: 410px;
    }
  }
  .skip {
    display: inline-block;
    width: 100%;
    text-align: center;
    padding-top: 12px;
    color: #2f839d;
    cursor: pointer;
    font-family: Gilroy;
  }
`;

export const QuesWrapper = styled.section`
  margin: 0 auto;
  border-radius: 20px;
  background: #f8f8f8;
  overflow: hidden;
  margin-top: 43px;
  padding: 21px 29px;
  margin-bottom: 20px;
  ${media.webView} {
    margin-top: 23px;
    margin-bottom: 27px;
  }
  .question {
    color: #7c7c7c;
  }
  .queHead {
    text-align: center;
    color: #46829a;
    font-size: 18px;
  }
`;
