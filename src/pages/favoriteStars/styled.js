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
      font-size: 24px;
    }
  }
  .favorite-listing li {
    margin-bottom: 70px;
    padding-bottom: 0;
    @media (min-width: 1280px) {
      flex: 0 0 calc(24.8% - 55px);
    }
    .profession {
      font-size: 13px;
      font-family: Gilroy-Medium;
    }
    .profession + div {
      display: flex;
    }
    .name {
      margin-right: 5px;
    }
    .name span {
      font-size: 17px;
      font-family: Gilroy-Medium;
    }
  }
`;

export default FavouriteStyled;
