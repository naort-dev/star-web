import styled from 'styled-components';
import { media } from 'styles/mediaQueries';

const BookingsStyled = styled.div`
  padding: 20px;
  position: relative;

  .arrow {
    width: 14px;
    height: 28px;
    top: 21px;
    ${media.webView} {
      display: none;
    }
  }
  .drop-down {
    width: 100%;
    margin-bottom: 26.8px;
    @media(min-width: 832px) {
      width: 275px;
    }
  }
  @media(min-width: 832px) {
    padding: 0;
  }
  .comment-container {
    @media(max-width: 831px) {
      width: 100%;
      .comment-section {
        max-width: 100%;
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
  padding: 10px 0;
  .info-text {
    color: ${props => props.theme.flatBlue};
    font-family: Gilroy-Medium;
    font-size: 18px;
    cursor: pointer;
    strong {
      font-family: Gilroy-Bold;
      font-weight: normal;
    }
  }
`;

export default BookingsStyled;
