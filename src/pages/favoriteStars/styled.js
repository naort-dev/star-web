import styled from 'styled-components';
import { media } from 'styles/mediaQueries';

const FavouriteStyled = styled.div`
  position: relative;
  padding: 20.7px 17.7px;
  .arrow-head {
    top: 30px;
    ${media.webView} {
      display: none;
    }
  }
  .head1 {
    padding-top: 4px;
    padding-bottom: 32px;
    color: #888888;
    font-weight: normal;
    ${media.webView} {
      text-align: left;
      padding-top: 9px;
      padding-bottom: 25px;
    }
    @media (max-width: 831px) {
      padding-bottom: 17px;
    }
  }
`;

export default FavouriteStyled;
