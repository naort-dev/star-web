import styled from 'styled-components';
import { media } from 'styles/mediaQueries';

const BookingsStyled = styled.div`
  padding: 20.7px 17.7px;
  position: relative;
  &.booking-wrapper {
    @media (max-width: 1280px) and (min-width: 442px) {
      padding: 0;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  }
  .arrow {
    width: 14px;
    height: 28px;
    top: 24px;
    ${media.webView} {
      display: none;
    }
  }
  .top-heading {
    padding-top: 0;
    margin-bottom: 25px;
    @media (max-width: 1280px) and (min-width: 442px) {
      padding-top: 23px;
    }
    @media (max-width: 832px) {
      font-size: 24px;
    }
  }
  .latest-activity {
    padding-top: 17px;
    @media(max-width: 831px) {
      padding-top: 0;
    }
  }
  .drop-down {
    width: 100%;
    margin-bottom: 23.8px;
    @media(min-width: 1280px) {
      width: 275px;
    }
    @media(max-width: 831px) {
      margin-bottom: 15px;
    }
  }
  @media(min-width: 832px) {
    padding: 0;
  }
`;

BookingsStyled.Container = styled.div`
    @media(max-width: 831px) {
      width: 336px;
      margin: 0px auto;
      max-width: 100%;
    }
    @media (max-width: 1279px) and (min-width: 832px) {
      height: 100%;
    }
    .empty-text {
      justify-content: left;
      display: block;

      a {
        color: #2f839d;
      }
    }
  }
`;

BookingsStyled.Header = styled.span`
  font-family: Gilroy-Light;
  font-size: 30px;
  color: ${props => props.theme.brownGrey};
  text-align: center;
  display: block;
  margin-bottom: 15px;
  @media(min-width: 832px) {
    text-align: left;
  }
`;

BookingsStyled.SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0 17px;
  .info-text {
    color: ${props => props.theme.flatBlue};
    font-family: Gilroy-Medium;
    font-size: 18px;
    cursor: pointer;
    strong {
      font-family: Gilroy-Medium;
      font-weight: normal;
    }
    @media(max-width: 831px) {
      display: none;
    }
  }
`;

export default BookingsStyled;
