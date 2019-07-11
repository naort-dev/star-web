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
    padding-top: 10px;
    padding-bottom: 32px;
    color: #888888;
    font-weight: normal;
    ${media.webView} {
      text-align: left;
      padding-bottom: 20px;
    }
    @media (max-width: 831px) {
      padding-bottom: 17px;
      font-size: 24px;
    }
  }
  .favorite-listing {
    ul {
      @media (max-width: 500px) {
        margin-left: -20px;
        padding-top: 0;
      }
    }
    li {
      margin-bottom: 70px;
      padding-bottom: 0;
      @media (max-width: 831px) {
        margin-bottom: 30px;
      }
      @media (min-width: 1280px) {
        flex: 0 0 calc(24.8% - 55px);
      }
      @media (max-width: 500px) {
        flex: 0 0 calc(50% - 20px);
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
      .wrap-profession {
        @media (max-width: 831px) {
          flex-direction: column;
        }
      }
    }
  }
`;

export default FavouriteStyled;
