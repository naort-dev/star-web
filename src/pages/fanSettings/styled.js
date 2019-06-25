import styled from 'styled-components';
import { media } from 'styles/mediaQueries';

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
  .click-here {
    font-size: 16px;
    color: #2f839d;
    font-family: Gilroy-Light;
    cursor: pointer;
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
