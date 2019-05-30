import styled from 'styled-components';
import { media } from 'styles/mediaQueries';
import { Card } from 'styles/CommonStyled';

export const Layout = styled.section`
  width: 100%;
  height: 100%;
  background: #f6f6f6;
  padding-left: 19px;
  padding-right: 19px;
  ${media.webView} {
    padding-left: 0;
    padding-right: 0;
  }
  .head1 {
    ${media.webView} {
      text-align: left;
    }
  }
  .arrow {
    ${media.webView} {
      display: none;
    }
  }
`;

export const Wrapper = styled.section`
  ${media.webView} {
    display: flex;
  }
`;

export const Social = styled(Card)`
  width: 369px;
  margin-left: 27px;
  padding: 29px 49px;
  display: none;
  ${media.webView} {
    display: block;
  }
`;
