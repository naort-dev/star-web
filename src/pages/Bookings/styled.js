import styled from 'styled-components';
import { media } from 'styles/mediaQueries';

const BookingsStyled = styled.div`
  padding: 20.7px 17.7px;
  .arrow {
    width: 14px;
    height: 28px;
    top: 110px;
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
`;

BookingsStyled.Header = styled.span`
  font-family: Gilroy-Light;
  font-size: 30px;
  color: ${props => props.theme.brownGrey};
`;

BookingsStyled.SectionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
`;

export default BookingsStyled;
