import styled from 'styled-components';
import { media } from 'styles/mediaQueries';
import { Card } from 'styles/CommonStyled';

export const Layout = styled.section`
  width: 100%;
  height: 100%;
  .head1 {
    display: ${props => (props.showMenu ? 'block' : 'none')};
    ${media.webView} {
      text-align: left;
      display: block;
    }
    &:before {
      content: attr(data-mob);
      ${media.webView} {
        content: attr(data-web);
      }
    }
  }
  .sub-menu-wrap {
    display: ${props => (props.showMenu ? 'block' : 'none')};
    ${media.webView} {
      display: block;
    }
  }
`;

export const ContentWrapper = styled.section`
  display: flex;
  .sub-menu-wrap {
    width: 90%;
    padding-left: 30px;
    ${media.webView} {
      padding-left: 0;
      width: 268px;
    }
    .menu-ul {
      padding: 0;
    }
  }
`;

export const OtpWrap = styled(Card)`
  height: 100vh;
  width: 100%;
  border-radius: 0;
  background: #f6f6f6;
  position: relative;
  ${media.webView} {
    width: 700px;
    height: 717px;
    border-radius: 15px;
    background: #fff;
  }
`;
